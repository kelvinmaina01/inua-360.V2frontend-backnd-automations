# Inua 360 - ML Team Integration Guide

> **For:** ML Team  
> **From:** Backend/Architecture Team

---

## Overview

The backend will call your hosted ML endpoints. This document defines the **request/response contracts** we need.

---

## Endpoint 1: Loan Scoring

**URL:** `POST /loan-score`

### Request
```json
{
  "revenue_data": [95000, 98000, 92000, ...],  // 90 days of daily revenue (KES)
  "expense_data": [48000, 49000, 47000, ...],  // 90 days of daily expenses (KES)
  "compliance_score": 87,                       // 0-100
  "existing_debt": 250000,                      // Total outstanding debt (KES)
  "monthly_income": 920000                      // Average monthly revenue (KES)
}
```

### Expected Response
```json
{
  "loan_readiness_score": 78,                   // 0-100
  "approval_probability": 0.78,                 // 0.0-1.0
  "approval_likelihood": "high",                // "low" | "medium" | "high" | "very_high"
  "financial_health_score": 85,                 // 0-100
  "documentation_score": 70,                    // 0-100
  "repayment_capacity_score": 80,               // 0-100
  "recommended_loan_amount": 500000,            // KES
  "max_loan_amount": 1000000,                   // KES
  "estimated_interest_rate": 12.5,              // Percentage
  "monthly_payment": 44500,                     // KES (estimated)
  "debt_service_coverage_ratio": 2.5
}
```

---

## Endpoint 2: Cash Flow Forecasting

**URL:** `POST /forecast`

### Request
```json
{
  "inflow": [
    {"ds": "2025-09-01", "y": 95000},
    {"ds": "2025-09-02", "y": 98000},
    // ... 90 days of historical inflow
  ],
  "outflow": [
    {"ds": "2025-09-01", "y": 48000},
    {"ds": "2025-09-02", "y": 49000},
    // ... 90 days of historical outflow
  ],
  "days": 21,  // Forecast period: 21 or 90
  "current_balance": 1847200  // Optional: current balance (KES)
}
```

### Expected Response
```json
{
  "forecast_id": "uuid",
  "confidence_score": 0.87,
  "data_points": [
    {
      "date": "2025-12-10",
      "predicted_inflow": 95000,
      "predicted_outflow": 48000,
      "net_cashflow": 47000,
      "cumulative": 1894200,
      "confidence_lower": 42000,
      "confidence_upper": 52000
    }
    // ... (one per day for 21 or 90 days)
  ],
  "insights": [
    {
      "type": "surplus",           // "surplus" | "gap"
      "severity": "info",          // "info" | "warning" | "critical"
      "message": "KES 680k surplus expected in 21 days",
      "recommendation": "Consider moving KES 200k to savings"
    }
  ]
}
```

---

## Endpoint 3: Transaction Categorization

**URL:** `POST /categorize`

### Request
```json
{
  "reference": "Payment for laundry services",
  "customer_name": "JOHN KAMAU",
  "amount": 2500
}
```

### Expected Response
```json
{
  "category": "revenue",        // "revenue" | "inventory" | "salary" | "utilities" | "other"
  "confidence": 0.95,           // 0.0-1.0
  "agent_categorized": true
}
```

### Category Definitions
| Category | Examples |
|----------|----------|
| `revenue` | Customer payments, sales, service fees |
| `inventory` | Stock purchases, supplier payments |
| `salary` | Employee wages, contractor payments |
| `utilities` | Rent, electricity (KPLC), water, internet |
| `other` | Everything else |

---

## Endpoint 4: Lender Matching

**URL:** `POST /match-lenders`

### Request
```json
{
  "business_sector": "retail",              // retail, agriculture, juakali, transport, food, tech, beauty, construction
  "annual_revenue": 1240000,                // KES
  "county": "nairobi",
  "loan_readiness_score": 78,               // 0-100
  "compliance_score": 87,                   // 0-100
  "owner_gender": "female"                  // Optional: "male" | "female"
}
```

### Expected Response
```json
{
  "matched_lenders": [
    {
      "lender_id": "kie",
      "lender_name": "Kenya Industrial Estates",
      "match_score": 96,                    // 0-100
      "max_amount": 2000000,                // KES
      "interest_rate": 9.5,                 // Percentage
      "approval_likelihood": "very_high",
      "reasons": [
        "Sector match (retail)",
        "Revenue meets minimum",
        "Strong repayment capacity"
      ]
    },
    {
      "lender_id": "hustler",
      "lender_name": "Hustler Fund",
      "match_score": 88,
      "max_amount": 50000,
      "interest_rate": 8.0,
      "approval_likelihood": "high",
      "reasons": ["Low barrier to entry", "Quick disbursement"]
    }
    // ... top 3-5 matches
  ]
}
```

---

## Requirements for ML Team

1. **Hosting:** Provide a stable base URL (e.g., `https://ml-api.inua360.co.ke`)
2. **Authentication:** If using API keys, provide the key securely
3. **Availability:** 99%+ uptime for scheduled tasks
4. **Latency:** 
   - `/categorize`: < 2 seconds
   - `/loan-score`: < 10 seconds
   - `/forecast`: < 30 seconds
   - `/match-lenders`: < 5 seconds
5. **Error format:**
   ```json
   {
     "error": "Insufficient data",
     "code": "INSUFFICIENT_DATA",
     "message": "Need at least 14 days of transaction data"
   }
   ```

---

## Questions for ML Team

1. What is the production base URL?
2. What authentication method will you use?
3. Are there rate limits?
4. What's the fallback if model fails (return defaults or error)?
