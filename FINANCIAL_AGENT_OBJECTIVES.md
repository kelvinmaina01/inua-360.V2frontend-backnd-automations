# Financial Agent - Objectives & Implementation
**Purpose:** Keep finances healthy and prepare for lending

---

## Core Objectives

### **Purpose**
Keep finances healthy and prepare SMEs for lending opportunities by:
1. Monitoring cash flow health in real-time
2. Forecasting cash runway and identifying gaps
3. Assessing loan readiness based on financial patterns
4. Automating bookkeeping and financial record-keeping
5. Proactively managing invoices and receivables

---

## Inputs

The Financial Agent ingests data from multiple sources:

### 1. **M-Pesa Transactions** (Primary Source)
- **Till transactions** (business payments received)
- **Wallet transactions** (business payments sent)
- **PayBill transactions** (if applicable)
- **Frequency:** Real-time via Safaricom webhook
- **Format:** JSON from Daraja API

### 2. **Manual Cash Sales**
- **Cash transactions** not going through M-Pesa
- **Input method:** Manual logging via UI or voice (future)
- **Frequency:** As they occur

### 3. **Invoices** (Future Phase)
- **Outstanding invoices** (accounts receivable)
- **Invoice due dates**
- **Payment reminders sent**
- **Format:** User uploads or integrates accounting software

### 4. **Bank Transactions** (Future Phase)
- **Bank account sync** (via Plaid-like service for Kenya)
- **Frequency:** Daily sync

### 5. **Business Costs/Expenses**
- **Categorized from M-Pesa outflows**
- **Rent, utilities, salaries, inventory**
- **Manual entry for non-M-Pesa expenses**

---

## Outputs

The Financial Agent produces actionable insights and reports:

### 1. **Cash Flow Forecast** ⭐ (Priority 1)

**Purpose:** Predict future cash position to avoid shortfalls

**Data Structure:**
```json
{
  "forecast_id": "uuid",
  "generated_at": "2025-12-09T07:00:00Z",
  "user_id": "uuid",
  "business_name": "Mama Fua Laundry",
  "period_days": 21,
  "current_balance": 1847200,
  "data_points": [
    {
      "date": "2025-12-10",
      "predicted_inflow": 95000,
      "predicted_outflow": 48000,
      "net_cashflow": 47000,
      "cumulative_balance": 1894200,
      "cash_runway_days": 38,
      "confidence_lower": 42000,
      "confidence_upper": 52000
    }
  ],
  "summary": {
    "total_predicted_inflow": 920000,
    "total_predicted_outflow": 520000,
    "net_profit": 400000,
    "average_daily_inflow": 43810,
    "average_daily_outflow": 24762,
    "growth_rate": 0.23,
    "cash_runway_days": 38,
    "shortage_risk": "low"
  },
  "insights": [
    {
      "type": "surplus",
      "severity": "info",
      "date": "2025-12-30",
      "message": "KES 680k surplus expected in 21 days",
      "recommendation": "Consider moving KES 200k to savings or invest in inventory",
      "action": "optimize_savings"
    },
    {
      "type": "gap",
      "severity": "warning",
      "date": "2026-01-15",
      "amount": 800000,
      "message": "Potential KES 800k shortfall in January 2026",
      "recommendation": "Explore funding opportunities now (2 months lead time)",
      "action": "explore_funding"
    }
  ]
}
```

**UI Display:** `src/pages/Money.tsx` Forecast tab

---

### 2. **Loan Readiness Report** ⭐ (Priority 2)

**Purpose:** Assess likelihood of loan approval and provide improvement recommendations

**Data Structure:**
```json
{
  "report_id": "uuid",
  "generated_at": "2025-12-09T07:00:00Z",
  "user_id": "uuid",
  "business_name": "Mama Fua Laundry",
  "loan_readiness_score": 78,
  "approval_likelihood": "high",
  "assessment": {
    "financial_health": {
      "score": 85,
      "status": "strong",
      "factors": {
        "revenue_consistency": {
          "score": 90,
          "status": "excellent",
          "details": "Revenue stable for 6 months with 12% growth trend"
        },
        "cash_flow_positive": {
          "score": 80,
          "status": "good",
          "details": "Positive cash flow in 5 of last 6 months"
        },
        "expense_control": {
          "score": 85,
          "status": "good",
          "details": "Expenses consistently below 60% of revenue"
        }
      }
    },
    "documentation_completeness": {
      "score": 70,
      "status": "adequate",
      "factors": {
        "compliance_current": {
          "score": 87,
          "status": "good",
          "details": "5 of 6 compliance items valid"
        },
        "financial_records": {
          "score": 75,
          "status": "good",
          "details": "6 months of M-Pesa transaction history"
        },
        "bank_statements": {
          "score": 50,
          "status": "needs_improvement",
          "details": "No bank statements uploaded"
        }
      }
    },
    "repayment_capacity": {
      "score": 80,
      "status": "good",
      "factors": {
        "debt_service_coverage_ratio": {
          "value": 2.5,
          "score": 90,
          "status": "excellent",
          "details": "DSCR of 2.5x indicates strong repayment capacity"
        },
        "cash_runway": {
          "value": 38,
          "score": 70,
          "status": "adequate",
          "details": "38 days of cash runway"
        }
      }
    }
  },
  "loan_capacity": {
    "recommended_loan_amount": 500000,
    "max_loan_amount": 1000000,
    "recommended_term_months": 12,
    "estimated_interest_rate": 12.5,
    "monthly_payment": 44500,
    "notes": "Based on 30% debt-to-income ratio and current cash flow"
  },
  "improvement_actions": [
    {
      "priority": "high",
      "category": "documentation",
      "action": "Upload 6 months of bank statements",
      "impact": "+8 points to loan readiness score",
      "estimated_time": "10 minutes"
    },
    {
      "priority": "medium",
      "category": "compliance",
      "action": "Renew County Business License (expires in 37 days)",
      "impact": "+5 points to loan readiness score",
      "estimated_time": "2 days"
    },
    {
      "priority": "low",
      "category": "financial_health",
      "action": "Increase cash runway to 60 days",
      "impact": "+10 points to loan readiness score",
      "estimated_time": "2-3 months"
    }
  ],
  "matched_lenders": [
    {
      "lender_id": "kie",
      "lender_name": "KIE - Kenya Industrial Estates",
      "match_score": 96,
      "max_amount": 2000000,
      "interest_rate": 9.5,
      "approval_likelihood": "very_high",
      "reasons": ["Sector match (retail)", "Revenue meets minimum", "Strong repayment capacity"]
    },
    {
      "lender_id": "hustler",
      "lender_name": "Hustler Fund",
      "match_score": 88,
      "max_amount": 50000,
      "interest_rate": 8.0,
      "approval_likelihood": "high",
      "reasons": ["Guaranteed approval for compliant businesses", "Fast disbursement"]
    }
  ]
}
```

**UI Display:** New page `src/pages/LoanReadiness.tsx` (to be created) or section in Profile page

---

### 3. **Debt Schedule** ⭐ (Priority 3)

**Purpose:** Track and manage existing loans and payment obligations

**Data Structure:**
```json
{
  "schedule_id": "uuid",
  "user_id": "uuid",
  "generated_at": "2025-12-09T07:00:00Z",
  "total_debt": 250000,
  "monthly_obligations": 25000,
  "debt_to_income_ratio": 0.28,
  "status": "manageable",
  "loans": [
    {
      "loan_id": "uuid",
      "lender": "Hustler Fund",
      "loan_type": "working_capital",
      "principal_amount": 50000,
      "outstanding_balance": 35000,
      "interest_rate": 8.0,
      "term_months": 6,
      "monthly_payment": 8700,
      "next_payment_date": "2025-12-15",
      "next_payment_amount": 8700,
      "payments_made": 2,
      "payments_remaining": 4,
      "payment_history": [
        {
          "date": "2025-11-15",
          "amount": 8700,
          "status": "paid",
          "days_late": 0
        },
        {
          "date": "2025-10-15",
          "amount": 8700,
          "status": "paid",
          "days_late": 2
        }
      ],
      "auto_pay_enabled": true,
      "delinquency_status": "current"
    }
  ],
  "payment_calendar": [
    {
      "date": "2025-12-15",
      "loans": ["Hustler Fund"],
      "total_amount": 8700,
      "status": "upcoming"
    },
    {
      "date": "2025-12-20",
      "loans": ["Equipment Loan"],
      "total_amount": 16300,
      "status": "upcoming",
      "warning": "High payment day - ensure sufficient balance"
    }
  ],
  "recommendations": [
    {
      "type": "early_payment",
      "message": "You have KES 680k surplus. Consider paying off Hustler Fund loan early to save KES 2,800 in interest.",
      "savings": 2800
    }
  ]
}
```

**UI Display:** New tab in `src/pages/Money.tsx` (Forecast | Funding | **Debt**)

---

### 4. **Budget Suggestions** (Priority 4)

**Purpose:** Help SMEs optimize spending and allocate funds efficiently

**Data Structure:**
```json
{
  "budget_id": "uuid",
  "user_id": "uuid",
  "generated_at": "2025-12-09T07:00:00Z",
  "period": "monthly",
  "recommended_budget": {
    "total_income": 920000,
    "total_expenses": 520000,
    "savings_target": 100000,
    "categories": {
      "inventory": {
        "current_spend": 250000,
        "recommended_spend": 230000,
        "variance": -20000,
        "percentage_of_income": 25,
        "benchmark": "Below industry average of 30%",
        "status": "good",
        "suggestions": [
          "Consider bulk purchasing to reduce unit cost by 8%"
        ]
      },
      "salaries": {
        "current_spend": 150000,
        "recommended_spend": 150000,
        "variance": 0,
        "percentage_of_income": 16,
        "benchmark": "Within industry range of 15-20%",
        "status": "optimal"
      },
      "utilities": {
        "current_spend": 45000,
        "recommended_spend": 40000,
        "variance": -5000,
        "percentage_of_income": 5,
        "benchmark": "Above industry average of 3-4%",
        "status": "needs_attention",
        "suggestions": [
          "Electricity bill higher than similar businesses. Consider energy-efficient equipment.",
          "Negotiate better rates with KPLC or switch to solar for 30% savings"
        ]
      },
      "rent": {
        "current_spend": 50000,
        "recommended_spend": 50000,
        "variance": 0,
        "percentage_of_income": 5,
        "benchmark": "Within recommended 5-10%",
        "status": "optimal"
      },
      "marketing": {
        "current_spend": 10000,
        "recommended_spend": 25000,
        "variance": 15000,
        "percentage_of_income": 1,
        "benchmark": "Below industry average of 3-5%",
        "status": "underspending",
        "suggestions": [
          "Increase marketing spend to 3% of revenue to boost growth",
          "Focus on digital marketing (WhatsApp Business, social media)"
        ]
      }
    }
  },
  "savings_plan": {
    "emergency_fund_target": 200000,
    "emergency_fund_current": 87400,
    "emergency_fund_gap": 112600,
    "recommended_monthly_savings": 50000,
    "months_to_goal": 3
  }
}
```

**UI Display:** New section in `src/pages/Analytics.tsx` or new page

---

### 5. **Invoice Reminders** (Priority 5 - Future Phase)

**Purpose:** Track receivables and automate payment reminders

**Data Structure:**
```json
{
  "receivables_id": "uuid",
  "user_id": "uuid",
  "generated_at": "2025-12-09T07:00:00Z",
  "total_outstanding": 125000,
  "total_overdue": 35000,
  "invoices": [
    {
      "invoice_id": "INV-001",
      "customer_name": "Macharia Enterprises",
      "customer_phone": "+254722111222",
      "amount": 50000,
      "issue_date": "2025-11-15",
      "due_date": "2025-12-15",
      "days_until_due": 6,
      "status": "pending",
      "reminders_sent": 1,
      "last_reminder_date": "2025-12-01",
      "next_reminder_date": "2025-12-10",
      "auto_reminder_enabled": true
    },
    {
      "invoice_id": "INV-002",
      "customer_name": "Njoki Salon",
      "customer_phone": "+254733444555",
      "amount": 35000,
      "issue_date": "2025-10-20",
      "due_date": "2025-11-20",
      "days_overdue": 19,
      "status": "overdue",
      "reminders_sent": 3,
      "last_reminder_date": "2025-12-05",
      "collection_status": "escalated",
      "auto_reminder_enabled": true
    }
  ],
  "collection_rate": {
    "last_30_days": 0.85,
    "last_90_days": 0.92,
    "average_days_to_payment": 12
  },
  "recommendations": [
    {
      "type": "reminder",
      "invoice_id": "INV-001",
      "action": "Send friendly reminder via WhatsApp (due in 6 days)",
      "scheduled_for": "2025-12-10T09:00:00Z"
    },
    {
      "type": "escalation",
      "invoice_id": "INV-002",
      "action": "Follow up on overdue payment (19 days late)",
      "severity": "urgent"
    }
  ]
}
```

---

### 6. **Automated Bookkeeping Suggestions** (Priority 6)

**Purpose:** Help maintain accurate financial records with minimal effort

**Data Structure:**
```json
{
  "bookkeeping_id": "uuid",
  "user_id": "uuid",
  "generated_at": "2025-12-09T07:00:00Z",
  "suggestions": [
    {
      "category": "categorization",
      "priority": "high",
      "title": "15 transactions need categorization",
      "description": "Agent categorized these automatically. Please review and confirm.",
      "transactions": [
        {
          "transaction_id": "uuid",
          "amount": 25000,
          "description": "Payment to KENYA POWER",
          "suggested_category": "utilities",
          "confidence": 0.95
        }
      ],
      "action": "review_categorizations",
      "estimated_time": "5 minutes"
    },
    {
      "category": "reconciliation",
      "priority": "medium",
      "title": "Bank statement reconciliation due",
      "description": "Last reconciliation was 45 days ago",
      "action": "upload_bank_statement",
      "estimated_time": "15 minutes"
    },
    {
      "category": "receipts",
      "priority": "low",
      "title": "5 large expenses missing receipts",
      "description": "Upload receipts for expenses over KES 10,000 for audit trail",
      "transactions": [
        {
          "transaction_id": "uuid",
          "amount": 15000,
          "description": "Stock purchase",
          "date": "2025-12-05"
        }
      ],
      "action": "upload_receipts",
      "estimated_time": "10 minutes"
    }
  ],
  "automation_opportunities": [
    {
      "type": "auto_categorize",
      "description": "Enable auto-categorization for recurring vendors",
      "savings": "30 minutes per month",
      "confidence": "high"
    }
  ]
}
```

---

## KPIs (Key Performance Indicators)

The Financial Agent tracks these KPIs to measure financial health:

### 1. **Cash Runway** ⭐
**Definition:** Number of days the business can operate with current cash reserves

**Calculation:**
```
Cash Runway = Current Cash Balance / Average Daily Burn Rate
```

**Thresholds:**
- **Healthy:** > 60 days (green)
- **Adequate:** 30-60 days (yellow)
- **Critical:** < 30 days (red)

**Display:** Large metric card on `Money.tsx` and `Home.tsx`

---

### 2. **Invoice Collection Rate** ⭐
**Definition:** Percentage of invoices collected within payment terms

**Calculation:**
```
Collection Rate = (Invoices Paid On Time / Total Invoices) × 100
```

**Thresholds:**
- **Excellent:** > 90%
- **Good:** 75-90%
- **Needs Improvement:** < 75%

**Display:** `Analytics.tsx` and new Invoices page

---

### 3. **Loan Approval Likelihood** ⭐
**Definition:** Probability of securing a loan based on financial health

**Calculation:** Multi-factor model considering:
- Revenue consistency (30%)
- Cash flow positivity (25%)
- Debt-to-income ratio (20%)
- Compliance status (15%)
- Credit history (10%)

**Thresholds:**
- **Very High:** > 80% (green)
- **High:** 60-80% (light green)
- **Medium:** 40-60% (yellow)
- **Low:** < 40% (red)

**Display:** Loan Readiness Report page

---

### 4. **Additional KPIs**

| KPI | Formula | Display Location |
|-----|---------|------------------|
| **Debt Service Coverage Ratio (DSCR)** | Net Operating Income / Total Debt Service | Loan Readiness Report |
| **Gross Profit Margin** | (Revenue - COGS) / Revenue × 100 | Analytics page |
| **Operating Expense Ratio** | Operating Expenses / Revenue × 100 | Analytics page |
| **Current Ratio** | Current Assets / Current Liabilities | Profile page |
| **Quick Ratio** | (Current Assets - Inventory) / Current Liabilities | Profile page |
| **Revenue Growth Rate** | (Current Revenue - Previous Revenue) / Previous Revenue × 100 | Home dashboard |

---

## Agent Actions & Workflows

### **Action 1: Daily Financial Health Check** (7:00 AM EAT)
```
1. Fetch latest M-Pesa transactions
2. Calculate current cash balance
3. Generate cash flow forecast (21-day)
4. Calculate cash runway
5. Identify surpluses or gaps
6. Post insights to activity feed
7. Send WhatsApp alert if cash runway < 30 days
```

### **Action 2: Weekly Loan Readiness Assessment** (Monday 8:00 AM EAT)
```
1. Analyze last 90 days of financial data
2. Calculate loan readiness score
3. Compare against lender requirements
4. Generate improvement recommendations
5. Match with suitable lenders
6. Post report to activity feed
```

### **Action 3: Invoice Reminder Automation** (Every 2 days at 9:00 AM EAT)
```
1. Check all outstanding invoices
2. Identify invoices approaching due date (7 days)
3. Send WhatsApp reminder to customers
4. Identify overdue invoices (> 7 days late)
5. Escalate to user for follow-up
6. Track collection rate
```

### **Action 4: Budget Analysis** (Monthly on 1st at 6:00 AM EAT)
```
1. Analyze previous month's spending by category
2. Compare against benchmarks
3. Identify overspending/underspending
4. Generate optimization suggestions
5. Forecast next month's budget
6. Post report to activity feed
```

---

## Updated API Endpoints

### New Endpoint: Loan Readiness Report
```
GET /api/v1/financial/loan-readiness
```

### New Endpoint: Debt Schedule
```
GET /api/v1/financial/debt-schedule
POST /api/v1/financial/debt-schedule (add new loan)
PUT /api/v1/financial/debt-schedule/{loan_id} (update payment)
```

### New Endpoint: Budget Suggestions
```
GET /api/v1/financial/budget-suggestions
```

### New Endpoint: Invoice Management
```
GET /api/v1/financial/invoices
POST /api/v1/financial/invoices (create new invoice)
PUT /api/v1/financial/invoices/{id} (update invoice)
POST /api/v1/financial/invoices/{id}/remind (send reminder)
```

---

## Next Steps

1. **Backend Team:** Implement new endpoints for loan readiness, debt schedule, budget suggestions
2. **Frontend Team:** Create new pages/components for loan readiness report and debt schedule
3. **n8n Team:** Build workflows for daily financial health check and weekly loan readiness assessment
4. **ML Team:** Train Prophet model for cash flow forecasting, build loan approval model

---

**Last Updated:** December 9, 2025
**Version:** 2.0 (Updated with lending focus)
