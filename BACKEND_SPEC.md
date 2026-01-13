# Inua 360 - Backend Developer Specification

> **For:** Backend Developer  
> **From:** Frontend/Architecture Team  
> **Date:** January 2026

---

## Overview

Build a Django REST API that powers Inua 360, Kenya's SME financial assistant. The backend handles:
- User/business data management
- M-Pesa transaction storage
- Compliance tracking
- Scheduled agent tasks (via Celery)
- Integration with external ML endpoints

---

## Tech Stack

| Component | Technology | Notes |
|-----------|------------|-------|
| Framework | Django 5.x + DRF | REST API |
| Database | PostgreSQL 15+ | Primary storage |
| Task Queue | Celery + Redis | Scheduled jobs |
| Auth | JWT (djangorestframework-simplejwt) | Token-based |

---

## Database Models

### User & Business

```python
class User(AbstractUser):
    phone = models.CharField(max_length=15, unique=True)  # +254...
    language = models.CharField(max_length=2, default='en')  # 'en' or 'sw'

class Business(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)  # "Mama Fua Laundry"
    sector = models.CharField(max_length=50)  # retail, agriculture, juakali...
    county = models.CharField(max_length=50)  # nairobi, mombasa...
    annual_revenue = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
```

### M-Pesa Transactions

```python
class Transaction(models.Model):
    TYPES = [('inflow', 'Inflow'), ('outflow', 'Outflow')]
    CATEGORIES = [
        ('revenue', 'Revenue'),
        ('inventory', 'Inventory'),
        ('salary', 'Salary'),
        ('utilities', 'Utilities'),
        ('other', 'Other')
    ]
    
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    transaction_id = models.CharField(max_length=50, unique=True)  # M-Pesa ref
    type = models.CharField(max_length=10, choices=TYPES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORIES, null=True)
    customer_phone = models.CharField(max_length=15, null=True)
    customer_name = models.CharField(max_length=100, null=True)
    reference = models.TextField(null=True)  # Payment description
    balance_after = models.DecimalField(max_digits=12, decimal_places=2, null=True)
    timestamp = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
```

### Compliance

```python
class ComplianceItem(models.Model):
    STATUSES = [('valid', 'Valid'), ('expiring', 'Expiring'), ('expired', 'Expired'), ('pending', 'Pending')]
    TYPES = ['kra_pin', 'kra_tcc', 'county_license', 'nssf', 'nhif', 'fire', 'food']
    
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    type = models.CharField(max_length=30)
    status = models.CharField(max_length=20, choices=STATUSES)
    document_number = models.CharField(max_length=50, null=True)
    issue_date = models.DateField(null=True)
    expiry_date = models.DateField(null=True)
    document_url = models.URLField(null=True)  # S3/storage link
    auto_renew = models.BooleanField(default=False)
    last_checked = models.DateTimeField(auto_now=True)
```

### Agent Reports

```python
class LoanReadinessReport(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    score = models.IntegerField()  # 0-100
    approval_likelihood = models.CharField(max_length=20)  # low/medium/high/very_high
    data = models.JSONField()  # Full ML response
    matched_lenders = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

class CashFlowForecast(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    period_days = models.IntegerField()  # 21 or 90
    confidence_score = models.FloatField()
    data_points = models.JSONField()  # Array of daily forecasts
    insights = models.JSONField(default=list)  # Surplus/gap alerts
    created_at = models.DateTimeField(auto_now_add=True)

class AgentActivity(models.Model):
    """Tracks what agents do (for the Agent Feed)"""
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    agent_id = models.CharField(max_length=30)  # compliance, funding, cashflow...
    type = models.CharField(max_length=50)  # compliance_check, forecast_generated...
    status = models.CharField(max_length=20)  # success, warning, error
    title = models.CharField(max_length=200)
    description = models.TextField()
    metadata = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
```

---

## API Endpoints

### Authentication

| Endpoint | Method | Request | Response |
|----------|--------|---------|----------|
| `/api/auth/register` | POST | `{phone, name, password}` | `{user, tokens}` |
| `/api/auth/login` | POST | `{phone, password}` | `{access, refresh}` |
| `/api/auth/refresh` | POST | `{refresh}` | `{access}` |

### Business Profile

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/business` | GET | Get current user's business |
| `/api/business` | PUT | Update business info |
| `/api/business/onboarding` | POST | Complete onboarding (create business) |

### Transactions (M-Pesa)

| Endpoint | Method | Query Params | Description |
|----------|--------|--------------|-------------|
| `/api/transactions` | GET | `?start_date=&end_date=&limit=` | List transactions |
| `/api/transactions/summary` | GET | `?days=30` | Total inflow/outflow summary |
| `/api/mpesa/status` | GET | - | M-Pesa connection status + balance |
| `/webhook/mpesa` | POST | - | Safaricom callback (public) |

### Compliance

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/compliance` | GET | List all compliance items |
| `/api/compliance/{id}` | PUT | Update item (upload doc, set auto-renew) |
| `/api/compliance/score` | GET | Overall compliance score (0-100) |

### Financial Reports

| Endpoint | Method | Query Params | Description |
|----------|--------|--------------|-------------|
| `/api/loan-readiness` | GET | - | Latest loan readiness report |
| `/api/loan-readiness/refresh` | POST | - | **Trigger on-demand recalculation** |
| `/api/cashflow/forecast` | GET | `?days=21` | Get 21 or 90-day forecast |
| `/api/cashflow/forecast/refresh` | POST | `?days=21` | **Trigger on-demand forecast** |
| `/api/kpis` | GET | - | Financial KPIs (runway, DSCR, etc.) |

### Agent Feed

| Endpoint | Method | Query Params | Description |
|----------|--------|--------------|-------------|
| `/api/agent-feed` | GET | `?agent=&limit=20` | List agent activities |

---

## ML Endpoint Integration

> **ML team will provide endpoints. You just need to call them.**

### Environment Variables

```bash
ML_API_BASE_URL=https://ml-api.inua360.co.ke
ML_API_KEY=sk-xxxxxx  # if required
```

### ML Service Wrapper

Create a service class to call ML endpoints:

```python
# services/ml_service.py
import httpx
from django.conf import settings

class MLService:
    def __init__(self):
        self.base_url = settings.ML_API_BASE_URL
        self.headers = {"Authorization": f"Bearer {settings.ML_API_KEY}"} if settings.ML_API_KEY else {}
    
    def get_loan_score(self, business_data: dict) -> dict:
        """Call ML loan scoring endpoint"""
        response = httpx.post(
            f"{self.base_url}/loan-score",
            json=business_data,
            headers=self.headers,
            timeout=30.0
        )
        response.raise_for_status()
        return response.json()
    
    def get_cashflow_forecast(self, inflow_data: list, outflow_data: list, days: int = 21) -> dict:
        """Call ML forecasting endpoint"""
        response = httpx.post(
            f"{self.base_url}/forecast",
            json={"inflow": inflow_data, "outflow": outflow_data, "days": days},
            headers=self.headers,
            timeout=60.0
        )
        response.raise_for_status()
        return response.json()
    
    def categorize_transaction(self, reference: str, customer_name: str, amount: float) -> dict:
        """Call ML transaction categorization"""
        response = httpx.post(
            f"{self.base_url}/categorize",
            json={"reference": reference, "customer_name": customer_name, "amount": amount},
            headers=self.headers,
            timeout=10.0
        )
        response.raise_for_status()
        return response.json()

# Usage
ml = MLService()
result = ml.get_loan_score({"revenue_data": [...], "compliance_score": 87})
```

---

## Celery Setup

### Configuration

```python
# inua360/celery.py
from celery import Celery
from celery.schedules import crontab

app = Celery('inua360')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

app.conf.beat_schedule = {
    # Daily at 7 AM EAT (4 AM UTC)
    'generate-cashflow-forecasts': {
        'task': 'agents.tasks.generate_all_forecasts',
        'schedule': crontab(hour=4, minute=0),
    },
    # Daily at 8 AM EAT (5 AM UTC)
    'check-compliance-expiry': {
        'task': 'agents.tasks.check_all_compliance',
        'schedule': crontab(hour=5, minute=0),
    },
    # Weekly Monday at 8 AM EAT (5 AM UTC)
    'calculate-loan-readiness': {
        'task': 'agents.tasks.calculate_all_loan_readiness',
        'schedule': crontab(hour=5, minute=0, day_of_week=1),
    },
    # Weekly Monday at 9 AM EAT (6 AM UTC)
    'match-funding-opportunities': {
        'task': 'agents.tasks.match_all_funding',
        'schedule': crontab(hour=6, minute=0, day_of_week=1),
    },
}
```

### Settings

```python
# settings.py
CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_TIMEZONE = 'Africa/Nairobi'
```

---

## Deployment Requirements

```
# requirements.txt
django>=5.0
djangorestframework>=3.14
djangorestframework-simplejwt>=5.3
celery[redis]>=5.3
redis>=5.0
httpx>=0.25
psycopg2-binary>=2.9
gunicorn>=21.0
python-dotenv>=1.0
```

---

## Questions for ML Team

Before integration, get these from ML team:

1. **Base URL** of hosted ML service
2. **Authentication** method (API key, JWT, none)
3. **Request/Response schemas** for each endpoint:
   - `/loan-score`
   - `/forecast`
   - `/categorize`
   - `/match-lenders`
4. **Rate limits** (if any)
5. **Expected latency** (for timeout configuration)
