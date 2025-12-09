# Financial Agent - Complete Architecture & Implementation Guide
**From Frontend → n8n → ML → Backend**

---

## 📋 What I Built (Frontend - 100% Complete)

### **1. Loan Readiness Page** (`/loan-readiness`)

**What You See:**
- Big circular gauge showing **78/100** score
- 3 colored cards showing assessment:
  - 💚 **Financial Health: 85/100** (Revenue consistency, Cash flow, Expense control)
  - 🟡 **Documentation: 70/100** (Compliance, Financial records, Bank statements)
  - 💚 **Repayment Capacity: 80/100** (Debt coverage ratio 2.5x, Cash runway 38 days)
- Loan capacity box: "You can borrow **KES 500K** at **12.5%** interest, pay **KES 44,500/month**"
- 3 improvement action cards:
  - 🔴 HIGH: "Upload bank statements" → +8 points (10 min)
  - 🟡 MEDIUM: "Renew County License" → +5 points (2 days)
  - 🟢 LOW: "Increase cash runway to 60 days" → +10 points (2-3 months)
- 3 lender cards:
  - 🏭 **KIE**: 96% match, Up to KES 2M at 9.5%
  - 💰 **Hustler Fund**: 88% match, Up to KES 50K at 8%
  - 👩‍💼 **Women Fund**: 92% match, Up to KES 1M at 10%

**What's Mocked:**
```javascript
// Lines 19-113 in LoanReadiness.tsx
const MOCK_LOAN_READINESS = {
  loan_readiness_score: 78,  // This number (fake)
  approval_likelihood: 'high',
  assessment: {
    financial_health: { score: 85, ... },  // All these scores (fake)
    documentation_completeness: { score: 70, ... },
    repayment_capacity: { score: 80, ... }
  },
  loan_capacity: {
    recommended_loan_amount: 500000,  // Fake calculation
    monthly_payment: 44500,
    estimated_interest_rate: 12.5
  },
  matched_lenders: [ ... ]  // Fake lenders
}
```

---

### **2. Debt Schedule Tab** (`/money` → "Debt" tab)

**What You See:**
- Summary card:
  - Total Debt: **KES 250,000**
  - Monthly Obligations: **KES 25,000**
  - Debt-to-Income: **28%** (Manageable)
- 2 loan cards:
  - **Hustler Fund**: KES 50K total, KES 35K left, KES 8,700/month, 4 payments left, 33% paid
  - **Equipment Loan**: KES 200K total, KES 152K left, KES 16,300/month, 10 payments left, 24% paid
- Payment calendar:
  - **Dec 15**: Hustler Fund - KES 8,700 (6 days left)
  - **Dec 20**: Equipment Loan - KES 16,300 (11 days left) ⚠️ "Large payment - ensure sufficient balance"
- Agent recommendation:
  - "You have KES 680k surplus in next 3 weeks. Pay off Hustler Fund early to save KES 2,800 in interest."

**What's Mocked:**
```javascript
// Hardcoded in Money.tsx lines 343-590
// No variable - just JSX with fake data:
<p>KES 250,000</p>  // Total debt (fake)
<p>KES 25,000</p>   // Monthly obligations (fake)
// Both loans completely fake
```

---

### **3. Financial KPIs** (Home page "Financial Health" section)

**What You See:**
- Large card:
  - 📅 **Cash Runway: 38 days** (Adequate - Yellow status)
  - "Your business can operate for 38 days with current cash"
- 4 smaller cards:
  - 🎯 **Loan Approval Likelihood: 78%** (High)
  - ✅ **Debt Service Coverage: 2.5x** (Strong)
  - 📈 **Revenue Growth: +12.3%** (Last 6 months)
  - 💰 **Gross Profit Margin: 43.5%** (Industry avg: 40%)

**What's Mocked:**
```javascript
// Lines 16-23 in FinancialKPIs.tsx
const MOCK_KPIS = {
  cash_runway_days: 38,              // Fake
  loan_approval_likelihood: 78,       // Fake
  debt_service_coverage_ratio: 2.5,   // Fake
  revenue_growth_rate: 12.3,          // Fake
  gross_profit_margin: 43.5,          // Fake
  operating_expense_ratio: 56.5       // Fake
}
```

---

### **4. Existing Pages (Already Built)**

- ✅ **Money Page - Forecast Tab**: Cash flow forecast chart (21/90 days)
- ✅ **Money Page - Funding Tab**: 4 funding opportunities
- ✅ **MoneyMPesa Page**: M-Pesa dashboard with transactions
- ✅ **Compliance Page**: 6 compliance items (KRA PIN, TCC, County License, etc.)
- ✅ **Home Dashboard**: All agent activities, quick actions

---

## 🔄 Complete Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER'S PHONE                                │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  React Frontend (Inua360 Web App)                            │   │
│  │  http://localhost:3000                                        │   │
│  └──────────────────────────────────────────────────────────────┘   │
│        │                     │                      │                │
│        │ GET /loan-readiness │                      │                │
│        │ GET /debt-schedule  │                      │                │
│        │ GET /kpis           │                      │                │
└────────┼─────────────────────┼──────────────────────┼────────────────┘
         │                     │                      │
         │ HTTP REST API       │                      │
         ▼                     ▼                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Django Backend (REST API)                         │
│                    http://localhost:8000/api/v1                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Endpoints:                                                   │   │
│  │  • GET  /financial/loan-readiness                            │   │
│  │  • GET  /financial/debt-schedule                             │   │
│  │  • GET  /financial/kpis                                      │   │
│  │  • GET  /mpesa/transactions                                  │   │
│  │  • GET  /compliance                                          │   │
│  └──────────────────────────────────────────────────────────────┘   │
│        │                     │                      │                │
│        │                     │                      │                │
│        ▼                     ▼                      ▼                │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │               PostgreSQL Database                             │   │
│  │  Tables:                                                      │   │
│  │  • users, profiles                                            │   │
│  │  • mpesa_transactions (M-Pesa data stored here)              │   │
│  │  • loans (user's active loans)                               │   │
│  │  • compliance_items                                           │   │
│  │  • loan_readiness_reports (calculated scores stored here)    │   │
│  │  • financial_kpis (calculated KPIs stored here)              │   │
│  └──────────────────────────────────────────────────────────────┘   │
└────────┬──────────────────────┬───────────────────────┬──────────────┘
         │                      │                       │
         │                      │                       │
         │ Trigger workflows    │ Send data for ML      │ Post results
         ▼                      ▼                       ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       n8n Workflows                                  │
│                    http://localhost:5678                             │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  WORKFLOW 1: Weekly Loan Readiness Assessment                │   │
│  │  Trigger: Cron (Monday 8 AM)                                 │   │
│  │  ┌────────────────────────────────────────────────────────┐  │   │
│  │  │ 1. HTTP Request → GET /mpesa/transactions (90 days)    │  │   │
│  │  │ 2. HTTP Request → GET /compliance                      │  │   │
│  │  │ 3. HTTP Request → GET /loans                           │  │   │
│  │  │ 4. Code Node → Calculate revenue consistency           │  │   │
│  │  │ 5. Code Node → Calculate cash flow positivity          │  │   │
│  │  │ 6. Code Node → Calculate expense control               │  │   │
│  │  │ 7. Code Node → Check compliance completeness           │  │   │
│  │  │ 8. Code Node → Calculate debt-to-income ratio          │  │   │
│  │  │ 9. HTTP Request → POST to ML API (send data)           │──┼─┐ │
│  │  │10. Wait for ML response (loan score)                   │  │ │ │
│  │  │11. HTTP Request → Match with lenders (scoring)         │  │ │ │
│  │  │12. HTTP Request → POST /financial/loan-readiness       │  │ │ │
│  │  │13. HTTP Request → POST /webhooks/n8n/activity (feed)   │  │ │ │
│  │  └────────────────────────────────────────────────────────┘  │ │ │
│  │                                                               │ │ │
│  │  WORKFLOW 2: Daily Financial KPIs Update                     │ │ │
│  │  Trigger: Cron (Every day 7 AM)                              │ │ │
│  │  ┌────────────────────────────────────────────────────────┐  │ │ │
│  │  │ 1. HTTP Request → GET /mpesa/status (balance)          │  │ │ │
│  │  │ 2. HTTP Request → GET /mpesa/transactions (30 days)    │  │ │ │
│  │  │ 3. Code Node → Calculate daily burn rate              │  │ │ │
│  │  │ 4. Code Node → Calculate cash runway                  │  │ │ │
│  │  │ 5. Code Node → Calculate debt coverage ratio          │  │ │ │
│  │  │ 6. Code Node → Calculate revenue growth               │  │ │ │
│  │  │ 7. HTTP Request → POST to ML API (Prophet forecast)   │──┼─┤ │
│  │  │ 8. Wait for ML forecast response                      │  │ │ │
│  │  │ 9. HTTP Request → POST /financial/kpis                │  │ │ │
│  │  │10. IF cash_runway < 30 THEN                           │  │ │ │
│  │  │11.   HTTP Request → POST /webhooks/n8n/activity       │  │ │ │
│  │  │12. END IF                                              │  │ │ │
│  │  └────────────────────────────────────────────────────────┘  │ │ │
│  │                                                               │ │ │
│  │  WORKFLOW 3: Cash Flow Forecast Generator                    │ │ │
│  │  Trigger: Cron (Every day 7 AM + Manual on-demand)           │ │ │
│  │  ┌────────────────────────────────────────────────────────┐  │ │ │
│  │  │ 1. HTTP Request → GET /mpesa/transactions (90 days)    │  │ │ │
│  │  │ 2. Code Node → Format data for Prophet                │  │ │ │
│  │  │    {inflow: [{ds: date, y: amount}], outflow: [...]} │  │ │ │
│  │  │ 3. HTTP Request → POST to ML API /forecast             │──┼─┤ │
│  │  │    Body: {data, days: 21}                              │  │ │ │
│  │  │ 4. Wait for Prophet forecast (21 data points)          │  │ │ │
│  │  │ 5. Code Node → Detect insights (surplus/gap)           │  │ │ │
│  │  │ 6. HTTP Request → POST /cashflow/forecast              │  │ │ │
│  │  │ 7. IF insights found THEN                              │  │ │ │
│  │  │ 8.   HTTP Request → POST /webhooks/n8n/activity        │  │ │ │
│  │  │ 9. END IF                                               │  │ │ │
│  │  └────────────────────────────────────────────────────────┘  │ │ │
│  │                                                               │ │ │
│  │  WORKFLOW 4: Debt Payment Reminder                           │ │ │
│  │  Trigger: Cron (Every day 9 AM)                              │ │ │
│  │  ┌────────────────────────────────────────────────────────┐  │ │ │
│  │  │ 1. HTTP Request → GET /financial/debt-schedule         │  │ │ │
│  │  │ 2. Code Node → Filter loans with payment due ≤ 7 days │  │ │ │
│  │  │ 3. FOR EACH loan DO                                    │  │ │ │
│  │  │ 4.   HTTP Request → Send WhatsApp reminder             │  │ │ │
│  │  │ 5.   IF payment > 15000 AND balance < payment THEN     │  │ │ │
│  │  │ 6.     HTTP Request → POST warning to activity feed    │  │ │ │
│  │  │ 7.   END IF                                             │  │ │ │
│  │  │ 8. END FOR                                              │  │ │ │
│  │  └────────────────────────────────────────────────────────┘  │ │ │
│  │                                                               │ │ │
│  │  WORKFLOW 5: M-Pesa Transaction Sync (Real-time)             │ │ │
│  │  Trigger: Webhook from Safaricom                             │ │ │
│  │  ┌────────────────────────────────────────────────────────┐  │ │ │
│  │  │ 1. Webhook receives M-Pesa callback                    │  │ │ │
│  │  │ 2. Code Node → Parse Safaricom data                    │  │ │ │
│  │  │ 3. HTTP Request → POST to ML API /categorize           │──┼─┤ │
│  │  │    Body: {reference, customer_name}                    │  │ │ │
│  │  │ 4. Wait for category (revenue/inventory/salary/etc)    │  │ │ │
│  │  │ 5. HTTP Request → POST /mpesa/transactions             │  │ │ │
│  │  │ 6. HTTP Request → POST /webhooks/n8n/activity          │  │ │ │
│  │  └────────────────────────────────────────────────────────┘  │ │ │
│  └──────────────────────────────────────────────────────────────┘ │ │
└───────────────────────────────────────────────────────────────────┼─┼─┘
                                                                    │ │
                                Send ML requests                    │ │
                                                                    ▼ ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Machine Learning API Server                       │
│                    http://localhost:5000                             │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  ML ENDPOINT 1: Loan Scoring Model                           │   │
│  │  POST /ml/loan-score                                         │   │
│  │  ┌────────────────────────────────────────────────────────┐  │   │
│  │  │ Input:                                                  │  │   │
│  │  │ {                                                       │  │   │
│  │  │   "revenue_data": [100K, 105K, 98K, ...],  (90 days)  │  │   │
│  │  │   "expense_data": [60K, 62K, 58K, ...],    (90 days)  │  │   │
│  │  │   "compliance_score": 87,                              │  │   │
│  │  │   "existing_debt": 250000,                             │  │   │
│  │  │   "monthly_income": 920000                             │  │   │
│  │  │ }                                                       │  │   │
│  │  │                                                         │  │   │
│  │  │ ML Model: XGBoost Classifier                           │  │   │
│  │  │ - Trained on 10,000+ Kenyan SME loan applications      │  │   │
│  │  │ - Features: revenue_std, growth_rate, debt_ratio,      │  │   │
│  │  │             compliance, cash_flow_positive_pct          │  │   │
│  │  │ - Target: loan_approved (0/1)                          │  │   │
│  │  │                                                         │  │   │
│  │  │ Processing:                                            │  │   │
│  │  │ 1. Calculate revenue consistency (std dev)             │  │   │
│  │  │ 2. Calculate growth rate (trend)                       │  │   │
│  │  │ 3. Calculate debt-to-income ratio                      │  │   │
│  │  │ 4. Calculate cash flow positivity %                    │  │   │
│  │  │ 5. Run XGBoost predict_proba()                         │  │   │
│  │  │ 6. Calculate weighted score                            │  │   │
│  │  │                                                         │  │   │
│  │  │ Output:                                                │  │   │
│  │  │ {                                                       │  │   │
│  │  │   "loan_readiness_score": 78,                          │  │   │
│  │  │   "approval_probability": 0.78,                        │  │   │
│  │  │   "approval_likelihood": "high",                       │  │   │
│  │  │   "financial_health_score": 85,                        │  │   │
│  │  │   "documentation_score": 70,                           │  │   │
│  │  │   "repayment_capacity_score": 80,                      │  │   │
│  │  │   "recommended_loan_amount": 500000,                   │  │   │
│  │  │   "max_loan_amount": 1000000,                          │  │   │
│  │  │   "estimated_interest_rate": 12.5,                     │  │   │
│  │  │   "debt_service_coverage_ratio": 2.5                   │  │   │
│  │  │ }                                                       │  │   │
│  │  └────────────────────────────────────────────────────────┘  │   │
│  │                                                               │   │
│  │  ML ENDPOINT 2: Cash Flow Forecasting (Prophet)              │   │
│  │  POST /ml/forecast                                            │   │
│  │  ┌────────────────────────────────────────────────────────┐  │   │
│  │  │ Input:                                                  │  │   │
│  │  │ {                                                       │  │   │
│  │  │   "inflow": [                                           │  │   │
│  │  │     {"ds": "2025-09-01", "y": 95000},                  │  │   │
│  │  │     {"ds": "2025-09-02", "y": 98000},                  │  │   │
│  │  │     ... (90 days of M-Pesa inflow)                     │  │   │
│  │  │   ],                                                    │  │   │
│  │  │   "outflow": [                                          │  │   │
│  │  │     {"ds": "2025-09-01", "y": 48000},                  │  │   │
│  │  │     {"ds": "2025-09-02", "y": 49000},                  │  │   │
│  │  │     ... (90 days of M-Pesa outflow)                    │  │   │
│  │  │   ],                                                    │  │   │
│  │  │   "days": 21                                            │  │   │
│  │  │ }                                                       │  │   │
│  │  │                                                         │  │   │
│  │  │ ML Model: Facebook Prophet                             │  │   │
│  │  │ - Time series forecasting                              │  │   │
│  │  │ - Handles seasonality (monthly patterns)               │  │   │
│  │  │ - Handles weekly patterns (weekday vs weekend)         │  │   │
│  │  │ - Confidence intervals                                 │  │   │
│  │  │                                                         │  │   │
│  │  │ Processing:                                            │  │   │
│  │  │ 1. Train Prophet on inflow data                        │  │   │
│  │  │ 2. Generate 21-day inflow forecast                     │  │   │
│  │  │ 3. Train Prophet on outflow data                       │  │   │
│  │  │ 4. Generate 21-day outflow forecast                    │  │   │
│  │  │ 5. Calculate net cash flow per day                     │  │   │
│  │  │ 6. Calculate cumulative balance                        │  │   │
│  │  │ 7. Detect surpluses (>500K cumulative)                 │  │   │
│  │  │ 8. Detect gaps (negative cumulative)                   │  │   │
│  │  │                                                         │  │   │
│  │  │ Output:                                                │  │   │
│  │  │ {                                                       │  │   │
│  │  │   "forecast_id": "uuid",                               │  │   │
│  │  │   "period_days": 21,                                   │  │   │
│  │  │   "confidence_score": 0.87,                            │  │   │
│  │  │   "data_points": [                                     │  │   │
│  │  │     {                                                   │  │   │
│  │  │       "date": "2025-12-10",                            │  │   │
│  │  │       "predicted_inflow": 95000,                       │  │   │
│  │  │       "predicted_outflow": 48000,                      │  │   │
│  │  │       "net_cashflow": 47000,                           │  │   │
│  │  │       "cumulative": 1894200,                           │  │   │
│  │  │       "confidence_lower": 42000,                       │  │   │
│  │  │       "confidence_upper": 52000                        │  │   │
│  │  │     },                                                  │  │   │
│  │  │     ... (21 data points)                               │  │   │
│  │  │   ],                                                    │  │   │
│  │  │   "insights": [                                        │  │   │
│  │  │     {                                                   │  │   │
│  │  │       "type": "surplus",                               │  │   │
│  │  │       "message": "KES 680k surplus in 21 days",        │  │   │
│  │  │       "recommendation": "Move KES 200k to savings"     │  │   │
│  │  │     }                                                   │  │   │
│  │  │   ]                                                     │  │   │
│  │  │ }                                                       │  │   │
│  │  └────────────────────────────────────────────────────────┘  │   │
│  │                                                               │   │
│  │  ML ENDPOINT 3: Transaction Categorization (NLP)             │   │
│  │  POST /ml/categorize                                          │   │
│  │  ┌────────────────────────────────────────────────────────┐  │   │
│  │  │ Input:                                                  │  │   │
│  │  │ {                                                       │  │   │
│  │  │   "reference": "Payment for laundry services",         │  │   │
│  │  │   "customer_name": "JOHN KAMAU",                       │  │   │
│  │  │   "amount": 2500                                       │  │   │
│  │  │ }                                                       │  │   │
│  │  │                                                         │  │   │
│  │  │ ML Model: Simple NLP + Rules                           │  │   │
│  │  │ - Keyword matching                                     │  │   │
│  │  │ - TF-IDF vectorization                                 │  │   │
│  │  │ - Logistic Regression classifier                       │  │   │
│  │  │ - Trained on 5,000+ Kenyan M-Pesa transactions        │  │   │
│  │  │                                                         │  │   │
│  │  │ Processing:                                            │  │   │
│  │  │ 1. Clean text (lowercase, remove special chars)       │  │   │
│  │  │ 2. Check keywords:                                     │  │   │
│  │  │    - "laundry", "payment", "service" → revenue        │  │   │
│  │  │    - "stock", "supplier", "purchase" → inventory      │  │   │
│  │  │    - "salary", "wages", "pay" → salary                │  │   │
│  │  │    - "rent", "power", "water", "kplc" → utilities     │  │   │
│  │  │ 3. If no match, use ML classifier                     │  │   │
│  │  │ 4. Return category with confidence                    │  │   │
│  │  │                                                         │  │   │
│  │  │ Output:                                                │  │   │
│  │  │ {                                                       │  │   │
│  │  │   "category": "revenue",                               │  │   │
│  │  │   "confidence": 0.95,                                  │  │   │
│  │  │   "agent_categorized": true                            │  │   │
│  │  │ }                                                       │  │   │
│  │  └────────────────────────────────────────────────────────┘  │   │
│  │                                                               │   │
│  │  ML ENDPOINT 4: Lender Matching                              │   │
│  │  POST /ml/match-lenders                                       │   │
│  │  ┌────────────────────────────────────────────────────────┐  │   │
│  │  │ Input:                                                  │  │   │
│  │  │ {                                                       │  │   │
│  │  │   "business_sector": "retail",                         │  │   │
│  │  │   "annual_revenue": 1240000,                           │  │   │
│  │  │   "county": "nairobi",                                 │  │   │
│  │  │   "loan_readiness_score": 78,                          │  │   │
│  │  │   "compliance_score": 87,                              │  │   │
│  │  │   "owner_gender": "female"                             │  │   │
│  │  │ }                                                       │  │   │
│  │  │                                                         │  │   │
│  │  │ ML Model: Similarity Scoring                           │  │   │
│  │  │ - Cosine similarity                                    │  │   │
│  │  │ - Weighted features                                    │  │   │
│  │  │                                                         │  │   │
│  │  │ Processing:                                            │  │   │
│  │  │ 1. Load lender database (KIE, Hustler, Women Fund...) │  │   │
│  │  │ 2. For each lender, calculate match score:            │  │   │
│  │  │    - Sector match: 30% weight                          │  │   │
│  │  │    - Revenue range: 25% weight                         │  │   │
│  │  │    - Location: 15% weight                              │  │   │
│  │  │    - Loan readiness: 20% weight                        │  │   │
│  │  │    - Special criteria (gender, age): 10% weight        │  │   │
│  │  │ 3. Sort by match score                                 │  │   │
│  │  │ 4. Return top 3 lenders                                │  │   │
│  │  │                                                         │  │   │
│  │  │ Output:                                                │  │   │
│  │  │ {                                                       │  │   │
│  │  │   "matched_lenders": [                                 │  │   │
│  │  │     {                                                   │  │   │
│  │  │       "lender_id": "kie",                              │  │   │
│  │  │       "match_score": 96,                               │  │   │
│  │  │       "approval_likelihood": "very_high",              │  │   │
│  │  │       "reasons": [                                     │  │   │
│  │  │         "Sector match (retail)",                       │  │   │
│  │  │         "Revenue meets minimum",                       │  │   │
│  │  │         "Strong repayment capacity"                    │  │   │
│  │  │       ]                                                 │  │   │
│  │  │     },                                                  │  │   │
│  │  │     ... (top 3)                                        │  │   │
│  │  │   ]                                                     │  │   │
│  │  │ }                                                       │  │   │
│  │  └────────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🤖 What You Need to Implement in n8n

### **WORKFLOW 1: Weekly Loan Readiness Assessment** (HIGHEST PRIORITY)

**Trigger:** Cron expression `0 8 * * 1` (Every Monday at 8:00 AM EAT)

**Nodes:**

1. **HTTP Request** - Get M-Pesa Transactions
   ```
   Method: GET
   URL: http://localhost:8000/api/v1/mpesa/transactions?start_date={{90_days_ago}}&end_date={{today}}
   Headers: Authorization: Bearer {{$('Get Auth Token').json.token}}
   ```

2. **HTTP Request** - Get Compliance Status
   ```
   Method: GET
   URL: http://localhost:8000/api/v1/compliance
   ```

3. **HTTP Request** - Get User Loans
   ```
   Method: GET
   URL: http://localhost:8000/api/v1/financial/debt-schedule
   ```

4. **Code Node** - Prepare ML Data
   ```javascript
   // Extract revenue data (inflow transactions)
   const transactions = $input.item.json.transactions;
   const inflow = transactions.filter(t => t.type === 'inflow');
   const outflow = transactions.filter(t => t.type === 'outflow');

   // Calculate revenue over 90 days
   const revenue_data = inflow.map(t => t.amount);
   const expense_data = outflow.map(t => t.amount);

   // Get compliance score
   const compliance_score = $('HTTP Request 2').item.json.score;

   // Get debt info
   const debt = $('HTTP Request 3').item.json;
   const existing_debt = debt.total_debt;
   const monthly_income = inflow.reduce((sum, t) => sum + t.amount, 0) / 3; // Last 3 months avg

   return {
     json: {
       revenue_data,
       expense_data,
       compliance_score,
       existing_debt,
       monthly_income
     }
   };
   ```

5. **HTTP Request** - Call ML Loan Scoring API
   ```
   Method: POST
   URL: http://localhost:5000/ml/loan-score
   Body: {{$json}}
   ```

6. **HTTP Request** - Call ML Lender Matching
   ```
   Method: POST
   URL: http://localhost:5000/ml/match-lenders
   Body: {
     "business_sector": "{{$('Get User Profile').json.sector}}",
     "annual_revenue": {{$('Code Node').json.monthly_income * 12}},
     "loan_readiness_score": {{$('HTTP Request 5').json.loan_readiness_score}}
   }
   ```

7. **Code Node** - Combine Results
   ```javascript
   const loanScore = $('HTTP Request 5').item.json;
   const lenders = $('HTTP Request 6').item.json.matched_lenders;

   return {
     json: {
       ...loanScore,
       matched_lenders: lenders,
       generated_at: new Date().toISOString(),
       user_id: "{{$('Get User Profile').json.user_id}}"
     }
   };
   ```

8. **HTTP Request** - Save to Django Backend
   ```
   Method: POST
   URL: http://localhost:8000/api/v1/financial/loan-readiness
   Body: {{$json}}
   ```

9. **IF Node** - Check if score > 70
   ```
   Condition: {{$('Code Node 2').json.loan_readiness_score}} > 70
   ```

10. **HTTP Request** (True branch) - Post to Activity Feed
    ```
    Method: POST
    URL: http://localhost:8000/api/v1/webhooks/n8n/activity
    Body: {
      "agent_id": "cashflow",
      "type": "loan_readiness_updated",
      "status": "success",
      "title": "Loan Readiness Score Updated",
      "description": "Your loan readiness score is {{$('Code Node 2').json.loan_readiness_score}}/100",
      "metadata": {
        "score": {{$('Code Node 2').json.loan_readiness_score}}
      }
    }
    ```

---

### **WORKFLOW 2: Daily Financial KPIs Update**

**Trigger:** Cron expression `0 7 * * *` (Every day at 7:00 AM EAT)

**Nodes:**

1. **HTTP Request** - Get M-Pesa Balance
2. **HTTP Request** - Get Last 30 Days Transactions
3. **Code Node** - Calculate Cash Runway
   ```javascript
   const balance = $('HTTP Request 1').item.json.balance;
   const total_balance = balance.till + balance.wallet + balance.cash_in_hand;

   const transactions = $('HTTP Request 2').item.json.transactions;
   const outflow = transactions.filter(t => t.type === 'outflow');
   const total_expenses = outflow.reduce((sum, t) => sum + t.amount, 0);
   const daily_burn_rate = total_expenses / 30;

   const cash_runway_days = Math.floor(total_balance / daily_burn_rate);

   return {json: {cash_runway_days, daily_burn_rate, total_balance}};
   ```

4. **Code Node** - Calculate Other KPIs
5. **HTTP Request** - Call ML Prophet for Forecast
6. **HTTP Request** - Save KPIs to Django
7. **IF Node** - Check if cash_runway < 30
8. **HTTP Request** (True branch) - Post Alert to Activity Feed

---

### **WORKFLOW 3: M-Pesa Transaction Sync (Real-time)**

**Trigger:** Webhook URL: `http://localhost:5678/webhook/mpesa-callback`

**Nodes:**

1. **Webhook** - Receive Safaricom Callback
2. **Code Node** - Parse M-Pesa Data
3. **HTTP Request** - Call ML Categorization API
4. **Code Node** - Format Transaction
5. **HTTP Request** - Save to Django Database
6. **HTTP Request** - Post Activity to Feed

---

## 📊 ML Models You Need to Build

### **MODEL 1: Loan Scoring (XGBoost)**

**Training Data Needed:**
```python
# Dataset: 10,000+ Kenyan SME loan applications
# File: loan_training_data.csv

Columns:
- revenue_last_90_days: [array of daily revenue]
- expense_last_90_days: [array of daily expenses]
- compliance_score: 0-100
- existing_debt: KES amount
- monthly_income: KES amount
- sector: retail/agriculture/juakali/...
- county: nairobi/mombasa/...
- business_age_months: integer
- employee_count: integer
- TARGET: loan_approved (0=rejected, 1=approved)

Example rows:
revenue_last_90_days,expense_last_90_days,compliance_score,existing_debt,monthly_income,sector,loan_approved
"[95000,98000,92000,...]","[48000,49000,47000,...]",87,250000,920000,retail,1
"[60000,58000,62000,...]","[55000,56000,54000,...]",45,500000,600000,juakali,0
```

**Python Training Script:**
```python
import pandas as pd
import numpy as np
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
import pickle

# Load data
df = pd.read_csv('loan_training_data.csv')

# Feature engineering
df['revenue_mean'] = df['revenue_last_90_days'].apply(lambda x: np.mean(eval(x)))
df['revenue_std'] = df['revenue_last_90_days'].apply(lambda x: np.std(eval(x)))
df['expense_mean'] = df['expense_last_90_days'].apply(lambda x: np.mean(eval(x)))
df['growth_rate'] = df['revenue_last_90_days'].apply(lambda x:
    (eval(x)[-1] - eval(x)[0]) / eval(x)[0] if eval(x)[0] > 0 else 0
)
df['debt_to_income_ratio'] = df['existing_debt'] / (df['monthly_income'] * 12)
df['cash_flow_positive_pct'] = df.apply(lambda row:
    sum([1 for r, e in zip(eval(row['revenue_last_90_days']),
                            eval(row['expense_last_90_days'])) if r > e]) / 90,
    axis=1
)

# Features
features = ['revenue_mean', 'revenue_std', 'growth_rate',
            'compliance_score', 'debt_to_income_ratio', 'cash_flow_positive_pct']
X = df[features]
y = df['loan_approved']

# Train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = XGBClassifier(n_estimators=100, max_depth=5, learning_rate=0.1)
model.fit(X_train, y_train)

# Save
pickle.dump(model, open('loan_scoring_model.pkl', 'rb'))
print(f"Accuracy: {model.score(X_test, y_test)}")
```

**Flask API Server:**
```python
from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)
model = pickle.load(open('loan_scoring_model.pkl', 'rb'))

@app.route('/ml/loan-score', methods=['POST'])
def loan_score():
    data = request.json

    # Calculate features
    revenue_mean = np.mean(data['revenue_data'])
    revenue_std = np.std(data['revenue_data'])
    expense_mean = np.mean(data['expense_data'])
    growth_rate = (data['revenue_data'][-1] - data['revenue_data'][0]) / data['revenue_data'][0]
    debt_to_income = data['existing_debt'] / (data['monthly_income'] * 12)

    # Cash flow positive percentage
    cash_flow_positive = sum([1 for r, e in zip(data['revenue_data'], data['expense_data']) if r > e])
    cash_flow_pct = cash_flow_positive / len(data['revenue_data'])

    # Prepare features
    features = np.array([[
        revenue_mean,
        revenue_std,
        growth_rate,
        data['compliance_score'],
        debt_to_income,
        cash_flow_pct
    ]])

    # Predict
    prob = model.predict_proba(features)[0][1]  # Probability of approval
    score = int(prob * 100)

    # Calculate sub-scores (weighted)
    financial_health = int((
        (1 - revenue_std / revenue_mean) * 30 +  # Low volatility is good
        (growth_rate * 100 if growth_rate > 0 else 0) * 30 +  # Growth
        (cash_flow_pct * 100) * 40  # Positive cash flow
    ))

    documentation = int((
        data['compliance_score'] * 0.5 +  # Compliance
        50  # Assume financial records present (adjust based on real data)
    ))

    repayment_capacity = int((
        (1 / debt_to_income * 50) if debt_to_income > 0 else 100 +  # Lower debt better
        50  # DSCR component
    ))

    # Calculate recommended loan amount (30% of annual income, or 40% if score > 80)
    annual_income = data['monthly_income'] * 12
    multiplier = 0.4 if score > 80 else 0.3
    recommended_loan = int(annual_income * multiplier)
    max_loan = int(recommended_loan * 2)

    # Interest rate (inverse to score: high score = low rate)
    interest_rate = 18 - (score / 100 * 8)  # 10-18% range

    # Monthly payment (simple calculation)
    months = 12
    monthly_payment = int(recommended_loan * (1 + interest_rate/100) / months)

    return jsonify({
        "loan_readiness_score": score,
        "approval_probability": prob,
        "approval_likelihood": "very_high" if score >= 80 else "high" if score >= 60 else "medium" if score >= 40 else "low",
        "financial_health_score": financial_health,
        "documentation_score": documentation,
        "repayment_capacity_score": repayment_capacity,
        "recommended_loan_amount": recommended_loan,
        "max_loan_amount": max_loan,
        "estimated_interest_rate": round(interest_rate, 1),
        "monthly_payment": monthly_payment,
        "debt_service_coverage_ratio": round(1 / debt_to_income if debt_to_income > 0 else 5, 1)
    })

if __name__ == '__main__':
    app.run(port=5000)
```

---

### **MODEL 2: Cash Flow Forecasting (Prophet)**

**Flask API Endpoint:**
```python
from prophet import Prophet
import pandas as pd

@app.route('/ml/forecast', methods=['POST'])
def forecast():
    data = request.json
    days = data.get('days', 21)

    # Prepare inflow forecast
    df_inflow = pd.DataFrame(data['inflow'])
    df_inflow['ds'] = pd.to_datetime(df_inflow['ds'])

    model_inflow = Prophet(daily_seasonality=True, weekly_seasonality=True)
    model_inflow.fit(df_inflow)
    future_inflow = model_inflow.make_future_dataframe(periods=days)
    forecast_inflow = model_inflow.predict(future_inflow)

    # Prepare outflow forecast
    df_outflow = pd.DataFrame(data['outflow'])
    df_outflow['ds'] = pd.to_datetime(df_outflow['ds'])

    model_outflow = Prophet(daily_seasonality=True, weekly_seasonality=True)
    model_outflow.fit(df_outflow)
    future_outflow = model_outflow.make_future_dataframe(periods=days)
    forecast_outflow = model_outflow.predict(future_outflow)

    # Combine and calculate net
    result = []
    cumulative = data.get('current_balance', 1847200)

    for i in range(-days, 0):
        inflow = max(0, forecast_inflow.iloc[i]['yhat'])
        outflow = max(0, forecast_outflow.iloc[i]['yhat'])
        net = inflow - outflow
        cumulative += net

        result.append({
            "date": forecast_inflow.iloc[i]['ds'].strftime('%Y-%m-%d'),
            "predicted_inflow": round(inflow, 2),
            "predicted_outflow": round(outflow, 2),
            "net_cashflow": round(net, 2),
            "cumulative": round(cumulative, 2),
            "confidence_lower": round(forecast_inflow.iloc[i]['yhat_lower'], 2),
            "confidence_upper": round(forecast_inflow.iloc[i]['yhat_upper'], 2)
        })

    # Detect insights
    insights = []
    final_cumulative = result[-1]['cumulative']
    if final_cumulative > 500000:
        insights.append({
            "type": "surplus",
            "severity": "info",
            "message": f"KES {int(final_cumulative/1000)}k surplus expected in {days} days",
            "recommendation": f"Consider moving KES {int(final_cumulative*0.3/1000)}k to savings"
        })

    if any(r['cumulative'] < 0 for r in result):
        gap_amount = min([r['cumulative'] for r in result])
        insights.append({
            "type": "gap",
            "severity": "warning",
            "message": f"Potential KES {abs(int(gap_amount/1000))}k shortfall detected",
            "recommendation": "Explore funding opportunities now"
        })

    return jsonify({
        "forecast_id": str(uuid.uuid4()),
        "generated_at": datetime.now().isoformat(),
        "period_days": days,
        "confidence_score": 0.87,
        "data_points": result,
        "insights": insights
    })
```

---

### **MODEL 3: Transaction Categorization (Simple NLP)**

**Training Data:**
```csv
reference,customer_name,amount,category
"Payment for laundry services",JOHN KAMAU,2500,revenue
"Stock purchase",MARY SUPPLIER,15000,inventory
"Salary payment",PETER EMPLOYEE,25000,salary
"KPLC electricity bill",KENYA POWER,5000,utilities
"Rent payment",LANDLORD NAME,20000,utilities
"Water bill",NAIROBI WATER,1500,utilities
"Fuel purchase",TOTAL KENYA,3000,utilities
"Office supplies",STATIONARY SHOP,2000,inventory
```

**Flask API Endpoint:**
```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pickle

# Load pre-trained model
vectorizer = pickle.load(open('tfidf_vectorizer.pkl', 'rb'))
categorizer = pickle.load(open('transaction_categorizer.pkl', 'rb'))

@app.route('/ml/categorize', methods=['POST'])
def categorize():
    data = request.json
    reference = data['reference'].lower()

    # Rule-based first (faster)
    if any(word in reference for word in ['laundry', 'payment', 'service', 'sale', 'customer']):
        return jsonify({"category": "revenue", "confidence": 0.95, "agent_categorized": True})

    if any(word in reference for word in ['stock', 'supplier', 'purchase', 'inventory']):
        return jsonify({"category": "inventory", "confidence": 0.90, "agent_categorized": True})

    if any(word in reference for word in ['salary', 'wage', 'pay', 'staff']):
        return jsonify({"category": "salary", "confidence": 0.92, "agent_categorized": True})

    if any(word in reference for word in ['rent', 'power', 'kplc', 'water', 'electricity', 'fuel']):
        return jsonify({"category": "utilities", "confidence": 0.88, "agent_categorized": True})

    # ML-based fallback
    features = vectorizer.transform([reference])
    category = categorizer.predict(features)[0]
    confidence = max(categorizer.predict_proba(features)[0])

    return jsonify({
        "category": category,
        "confidence": round(confidence, 2),
        "agent_categorized": True
    })
```

---

## 📊 Visual Flowchart Summary

```
USER OPENS APP
    │
    ├── Sees Home Page with Financial Health KPIs
    │       ↓
    │   Cash Runway: 38 days (MOCKED)
    │   Clicks "Full Report"
    │       ↓
    ├── Goes to Loan Readiness Page
    │       ↓
    │   Sees Score: 78/100 (MOCKED)
    │   Sees 3 Lenders (MOCKED)
    │       ↓
    ├── Goes to Money Page → Debt Tab
    │       ↓
    │   Sees 2 Active Loans (MOCKED)
    │   Sees Payment Calendar (MOCKED)
    │
    └── ALL THIS DATA SHOULD COME FROM:
            │
            ├─► Django Backend
            │       │
            │       ├─► Reads from PostgreSQL
            │       │       - User profile
            │       │       - M-Pesa transactions
            │       │       - Active loans
            │       │
            │       └─► Gets calculated data from n8n
            │               - Loan readiness score
            │               - Financial KPIs
            │               - Cash flow forecast
            │
            └─► n8n Workflows
                    │
                    ├─► WORKFLOW 1 (Monday 8 AM)
                    │       - Fetches 90 days M-Pesa data
                    │       - Sends to ML API
                    │       - Gets loan score back
                    │       - Saves to Django
                    │
                    ├─► WORKFLOW 2 (Daily 7 AM)
                    │       - Fetches M-Pesa balance
                    │       - Calculates cash runway
                    │       - Sends to ML for forecast
                    │       - Saves KPIs to Django
                    │
                    ├─► WORKFLOW 3 (Real-time)
                    │       - Receives M-Pesa callback
                    │       - Sends to ML for categorization
                    │       - Saves transaction to Django
                    │
                    └─► All workflows send data to:
                            │
                            └─► ML API Server (Flask)
                                    │
                                    ├─► MODEL 1: Loan Scoring
                                    │       Input: Revenue, expenses, debt
                                    │       Output: Score 78/100
                                    │
                                    ├─► MODEL 2: Cash Flow Forecast
                                    │       Input: 90 days transactions
                                    │       Output: 21-day forecast
                                    │
                                    ├─► MODEL 3: Categorization
                                    │       Input: Transaction reference
                                    │       Output: Category (revenue/etc)
                                    │
                                    └─► MODEL 4: Lender Matching
                                            Input: Business profile
                                            Output: Top 3 lenders
```

---

## 📦 Data ML Needs

### **For Loan Scoring Model:**
```json
{
  "revenue_data": [95000, 98000, 92000, 105000, ...],  // 90 days of daily revenue
  "expense_data": [48000, 49000, 47000, 51000, ...],   // 90 days of daily expenses
  "compliance_score": 87,                               // From compliance agent
  "existing_debt": 250000,                              // Total active loans
  "monthly_income": 920000,                             // Average monthly income
  "business_sector": "retail",                          // For lender matching
  "county": "nairobi",
  "owner_gender": "female",
  "business_age_months": 24,
  "employee_count": 5
}
```

### **For Cash Flow Forecasting:**
```json
{
  "inflow": [
    {"ds": "2025-09-01", "y": 95000},
    {"ds": "2025-09-02", "y": 98000},
    // ... 90 days of inflow
  ],
  "outflow": [
    {"ds": "2025-09-01", "y": 48000},
    {"ds": "2025-09-02", "y": 49000},
    // ... 90 days of outflow
  ],
  "current_balance": 1847200,
  "days": 21
}
```

### **For Transaction Categorization:**
```json
{
  "reference": "Payment for laundry services",
  "customer_name": "JOHN KAMAU",
  "amount": 2500
}
```

---

## 🎯 Summary

**What I Built:**
- ✅ Complete frontend UI (3 new features)
- ✅ All mock data displays correctly
- ✅ Full navigation and routing
- ✅ Bilingual support
- ✅ Mobile responsive

**What You Need to Build (n8n):**
- ⏳ 5 workflows (Loan Assessment, KPIs, Forecast, Debt Reminders, M-Pesa Sync)
- ⏳ ML API integration points
- ⏳ Data collection from Django
- ⏳ Results posting to Django

**What You Need to Build (ML):**
- ⏳ Loan scoring model (XGBoost)
- ⏳ Cash flow forecasting (Prophet)
- ⏳ Transaction categorization (NLP)
- ⏳ Lender matching (Similarity scoring)

**Timeline:**
- n8n workflows: 3-5 days
- ML models: 5-7 days
- Integration: 2-3 days
- **Total: 2 weeks**

