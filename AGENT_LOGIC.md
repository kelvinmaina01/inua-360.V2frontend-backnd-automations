# Inua 360 - Agent Automation Logic

> **Purpose:** Pseudocode and logic for each agent's scheduled + on-demand tasks

---

## Agent 1: Compliance Tracker

### Scheduled Task: `check_compliance_expiry`
**Schedule:** Daily @ 8 AM EAT

```python
@celery_app.task
def check_compliance_for_business(business_id: int):
    """Check all compliance items for one business"""
    business = Business.objects.get(id=business_id)
    today = date.today()
    
    items = ComplianceItem.objects.filter(business=business)
    alerts = []
    
    for item in items:
        if item.expiry_date is None:
            continue
            
        days_until_expiry = (item.expiry_date - today).days
        
        if days_until_expiry < 0:
            # EXPIRED
            item.status = 'expired'
            alerts.append({
                'type': 'expired',
                'item': item.type,
                'message': f'{item.type} expired {abs(days_until_expiry)} days ago'
            })
        elif days_until_expiry <= 30:
            # EXPIRING SOON
            item.status = 'expiring'
            alerts.append({
                'type': 'expiring',
                'item': item.type,
                'days_left': days_until_expiry,
                'message': f'{item.type} expires in {days_until_expiry} days'
            })
        else:
            item.status = 'valid'
        
        item.last_checked = timezone.now()
        item.save()
    
    # Log agent activity if there are alerts
    if alerts:
        AgentActivity.objects.create(
            business=business,
            agent_id='compliance',
            type='compliance_check',
            status='warning' if any(a['type'] == 'expired' for a in alerts) else 'info',
            title=f'{len(alerts)} compliance items need attention',
            description=alerts[0]['message'],
            metadata={'alerts': alerts}
        )
    
    return len(alerts)

@celery_app.task
def check_all_compliance():
    """Run for ALL businesses (scheduled task)"""
    businesses = Business.objects.all()
    for business in businesses:
        check_compliance_for_business.delay(business.id)
```

---

## Agent 2: Cash-Flow Forecaster

### Scheduled Task: `generate_cashflow_forecast`
**Schedule:** Daily @ 7 AM EAT

```python
@celery_app.task
def generate_forecast_for_business(business_id: int, days: int = 21):
    """Generate cash flow forecast for one business"""
    business = Business.objects.get(id=business_id)
    
    # Get last 90 days of transactions
    ninety_days_ago = timezone.now() - timedelta(days=90)
    transactions = Transaction.objects.filter(
        business=business,
        timestamp__gte=ninety_days_ago
    ).order_by('timestamp')
    
    # Prepare data for ML
    inflow_data = [
        {'ds': t.timestamp.strftime('%Y-%m-%d'), 'y': float(t.amount)}
        for t in transactions if t.type == 'inflow'
    ]
    outflow_data = [
        {'ds': t.timestamp.strftime('%Y-%m-%d'), 'y': float(t.amount)}
        for t in transactions if t.type == 'outflow'
    ]
    
    # Skip if not enough data
    if len(inflow_data) < 14 or len(outflow_data) < 14:
        return None
    
    # Call ML endpoint
    ml = MLService()
    result = ml.get_cashflow_forecast(inflow_data, outflow_data, days)
    
    # Save forecast
    forecast = CashFlowForecast.objects.create(
        business=business,
        period_days=days,
        confidence_score=result.get('confidence_score', 0.8),
        data_points=result.get('data_points', []),
        insights=result.get('insights', [])
    )
    
    # Log activity if insights found
    if result.get('insights'):
        insight = result['insights'][0]
        AgentActivity.objects.create(
            business=business,
            agent_id='cashflow',
            type='forecast_generated',
            status='success',
            title=f'{days}-Day Cash Flow Forecast Ready',
            description=insight.get('message', 'Forecast generated'),
            metadata={'forecast_id': forecast.id, 'insights': result['insights']}
        )
    
    return forecast.id

@celery_app.task
def generate_all_forecasts():
    """Run for ALL businesses (scheduled)"""
    businesses = Business.objects.all()
    for business in businesses:
        generate_forecast_for_business.delay(business.id, days=21)
```

### On-Demand: `/api/cashflow/forecast/refresh`

```python
# views.py
class CashFlowForecastRefreshView(APIView):
    def post(self, request):
        days = request.query_params.get('days', 21)
        business = request.user.business
        
        # Trigger async task
        task = generate_forecast_for_business.delay(business.id, int(days))
        
        return Response({
            'status': 'processing',
            'task_id': task.id,
            'message': f'Generating {days}-day forecast. Check back in ~30 seconds.'
        })
```

---

## Agent 3: Loan Readiness Calculator

### Scheduled Task: `calculate_loan_readiness`
**Schedule:** Weekly, Monday @ 8 AM EAT

```python
@celery_app.task
def calculate_loan_readiness_for_business(business_id: int):
    """Calculate loan readiness score for one business"""
    business = Business.objects.get(id=business_id)
    
    # Get 90-day transaction summary
    ninety_days_ago = timezone.now() - timedelta(days=90)
    transactions = Transaction.objects.filter(
        business=business,
        timestamp__gte=ninety_days_ago
    )
    
    revenue_data = [float(t.amount) for t in transactions if t.type == 'inflow']
    expense_data = [float(t.amount) for t in transactions if t.type == 'outflow']
    
    # Get compliance score
    compliance_items = ComplianceItem.objects.filter(business=business)
    valid_count = compliance_items.filter(status='valid').count()
    total_count = compliance_items.count()
    compliance_score = (valid_count / total_count * 100) if total_count > 0 else 0
    
    # Get existing debt (if tracked)
    existing_debt = 0  # TODO: Sum from Loans model if exists
    monthly_income = sum(revenue_data) / 3 if revenue_data else 0
    
    # Call ML endpoint
    ml = MLService()
    result = ml.get_loan_score({
        'revenue_data': revenue_data,
        'expense_data': expense_data,
        'compliance_score': compliance_score,
        'existing_debt': existing_debt,
        'monthly_income': monthly_income
    })
    
    # Get matched lenders
    lenders_result = ml.match_lenders({
        'business_sector': business.sector,
        'annual_revenue': float(business.annual_revenue),
        'county': business.county,
        'loan_readiness_score': result.get('loan_readiness_score', 0)
    })
    
    # Save report
    report = LoanReadinessReport.objects.create(
        business=business,
        score=result.get('loan_readiness_score', 0),
        approval_likelihood=result.get('approval_likelihood', 'medium'),
        data=result,
        matched_lenders=lenders_result.get('matched_lenders', [])
    )
    
    # Log activity
    AgentActivity.objects.create(
        business=business,
        agent_id='funding',
        type='loan_readiness_updated',
        status='success',
        title='Loan Readiness Score Updated',
        description=f'Your score is {report.score}/100 - {report.approval_likelihood} approval likelihood',
        metadata={'report_id': report.id, 'score': report.score}
    )
    
    return report.id
```

---

## Agent 4: Financials Agent (M-Pesa Sync)

### Webhook Handler: `/webhook/mpesa`
**Trigger:** Real-time from Safaricom

```python
# views.py (NO authentication - Safaricom calls this)
class MPesaWebhookView(APIView):
    permission_classes = []  # Public endpoint
    
    def post(self, request):
        data = request.data
        
        # Parse Safaricom format
        trans_id = data.get('TransID')
        amount = float(data.get('TransAmount', 0))
        phone = data.get('MSISDN')
        name = f"{data.get('FirstName', '')} {data.get('LastName', '')}".strip()
        reference = data.get('BillRefNumber', '')
        trans_time = parse_mpesa_time(data.get('TransTime'))
        till_number = data.get('BusinessShortCode')
        
        # Find business by till number
        try:
            business = Business.objects.get(mpesa_till=till_number)
        except Business.DoesNotExist:
            return Response({'error': 'Unknown till'}, status=400)
        
        # Check if already processed
        if Transaction.objects.filter(transaction_id=trans_id).exists():
            return Response({'status': 'duplicate'})
        
        # Categorize via ML
        ml = MLService()
        category_result = ml.categorize_transaction(reference, name, amount)
        
        # Save transaction
        transaction = Transaction.objects.create(
            business=business,
            transaction_id=trans_id,
            type='inflow',  # Assume inflow for till payments
            amount=amount,
            category=category_result.get('category', 'revenue'),
            customer_phone=phone,
            customer_name=name,
            reference=reference,
            timestamp=trans_time
        )
        
        # Log activity
        AgentActivity.objects.create(
            business=business,
            agent_id='financials',
            type='mpesa_received',
            status='success',
            title=f'Received KES {amount:,.0f}',
            description=f'From {name}: {reference}',
            metadata={'transaction_id': transaction.id, 'category': transaction.category}
        )
        
        return Response({'status': 'success'})
```

---

## Agent 5: Funding Navigator

### Scheduled Task: `match_funding_opportunities`
**Schedule:** Weekly, Monday @ 9 AM EAT

```python
@celery_app.task
def match_funding_for_business(business_id: int):
    """Find matching funding opportunities for business"""
    business = Business.objects.get(id=business_id)
    
    # Get latest loan readiness score
    latest_report = LoanReadinessReport.objects.filter(
        business=business
    ).order_by('-created_at').first()
    
    score = latest_report.score if latest_report else 50
    
    # Static list of funding sources (or fetch from DB)
    FUNDING_SOURCES = [
        {'id': 'hustler', 'name': 'Hustler Fund', 'max': 50000, 'min_score': 30},
        {'id': 'kie', 'name': 'KIE', 'max': 5000000, 'min_score': 60},
        {'id': 'women', 'name': 'Women Enterprise Fund', 'max': 1000000, 'min_score': 50},
        {'id': 'youth', 'name': 'Youth Enterprise Fund', 'max': 1000000, 'min_score': 50},
    ]
    
    # Match based on score and business profile
    matches = []
    for fund in FUNDING_SOURCES:
        if score >= fund['min_score']:
            match_score = min(100, score + 10)  # Simplified matching
            matches.append({
                'fund_id': fund['id'],
                'fund_name': fund['name'],
                'max_amount': fund['max'],
                'match_score': match_score,
                'eligible': True
            })
    
    # Sort by match score
    matches.sort(key=lambda x: x['match_score'], reverse=True)
    
    # Log if new opportunities found
    if matches:
        AgentActivity.objects.create(
            business=business,
            agent_id='funding',
            type='funding_matched',
            status='success',
            title=f'{len(matches)} funding opportunities found',
            description=f'Best match: {matches[0]["fund_name"]} ({matches[0]["match_score"]}%)',
            metadata={'matches': matches[:5]}  # Top 5
        )
    
    return matches
```

---

## On-Demand Trigger Pattern

For any endpoint that needs on-demand refresh:

```python
# views.py
class OnDemandRefreshView(APIView):
    def post(self, request):
        business = request.user.business
        
        # Start async task
        task = some_agent_task.delay(business.id)
        
        return Response({
            'status': 'processing',
            'task_id': task.id,
            'message': 'Processing. Results will be ready shortly.',
            'poll_endpoint': f'/api/tasks/{task.id}/status'
        })

# Optional: Task status endpoint
class TaskStatusView(APIView):
    def get(self, request, task_id):
        result = AsyncResult(task_id)
        return Response({
            'status': result.status,  # PENDING, STARTED, SUCCESS, FAILURE
            'ready': result.ready(),
            'result': result.result if result.ready() else None
        })
```

---

## Summary: What Runs When

| Agent | Trigger | Schedule | On-Demand |
|-------|---------|----------|-----------|
| Compliance | Scheduled + Manual | Daily 8 AM | `/api/compliance/refresh` |
| Cash-Flow | Scheduled + Manual | Daily 7 AM | `/api/cashflow/forecast/refresh` |
| Loan Readiness | Scheduled + Manual | Weekly Mon 8 AM | `/api/loan-readiness/refresh` |
| Financials | Webhook | Real-time | N/A (webhook-driven) |
| Funding | Scheduled + Manual | Weekly Mon 9 AM | `/api/funding/match/refresh` |
