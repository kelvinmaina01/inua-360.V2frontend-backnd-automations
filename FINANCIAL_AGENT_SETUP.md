# Financial Agent - Frontend Setup Guide
**For n8n Agent Development**

---

## Overview

The **Financial Agent** (`financials` agent) handles:
1. ✅ M-Pesa account connection & OAuth
2. ✅ Transaction syncing & categorization
3. ✅ Cash flow forecasting (21-day & 90-day)
4. ✅ Cash sale logging (non-M-Pesa transactions)
5. ✅ Balance tracking (Till + Wallet + Cash in hand)

---

## Frontend Components Ready

### 1. Pages
- **`src/pages/MoneyMPesa.tsx`** - Main M-Pesa dashboard
  - 90-day transaction history with forecast
  - Balance cards (Revenue, Expenses, Top category, Cash in pockets)
  - Cash flow river chart
  - Manual cash sale logging

- **`src/pages/Money.tsx`** - Forecast & Funding tabs
  - 21/90-day toggle
  - Cash flow forecast chart
  - Key metrics: Income, Expenses, Net Profit, Gap Ahead

### 2. API Hooks (Ready to Use)

```typescript
// src/hooks/useAgents.ts

// Get M-Pesa connection status
const { data: status, loading, error } = useMPesaStatus();
// Returns: { connected, account_type, till_number, last_sync, balance }

// Get transactions
const { data: transactions } = useMPesaTransactions({ limit: 100 });
// Returns: { transactions: [], summary: {}, pagination: {} }

// Get cash flow forecast
const { data: forecast } = useCashFlowForecast(21); // or 90
// Returns: { data_points: [], insights: [], summary: {} }

// Log cash sale
const { execute: logCash } = useLogCashSale();
await logCash({ amount: 5000, currency: 'KES', description: '...', timestamp: '...', category: 'revenue' });

// Composite hook (all in one)
const { status, transactions, forecast, syncNow } = useFinancialAgent();
```

### 3. Mock Data (To Be Replaced)

Current mock data in `src/lib/mock-data.ts`:
- No M-Pesa specific mocks yet
- `MoneyMPesa.tsx` uses hardcoded data (lines 42-69)
- `Money.tsx` uses `MOCK_CASHFLOW_DATA` (imported from mock-data.ts)

---

## Django Backend Endpoints Needed

### Priority 1: M-Pesa Connection

#### `GET /api/v1/mpesa/status`
**What it returns:**
```json
{
  "connected": true,
  "account_type": "till",
  "till_number": "5834001",
  "phone_number": "+254712345678",
  "last_sync": "2025-12-09T10:28:00Z",
  "sync_status": "success",
  "balance": {
    "till": 1847200,
    "wallet": 45000,
    "cash_in_hand": 87400
  }
}
```

**Used in:** `MoneyMPesa.tsx` header, balance display

#### `POST /api/v1/mpesa/connect`
**Request:**
```json
{
  "phone_number": "+254712345678",
  "account_type": "till",
  "till_number": "5834001",
  "oauth_code": "auth_code_from_safaricom"
}
```

**Response:**
```json
{
  "status": "connected",
  "message": "M-Pesa account connected successfully",
  "connection_id": "uuid",
  "account_details": { "type": "till", "number": "5834001", "name": "Mama Fua Laundry" }
}
```

**Used in:** `MPesaConnectOnboarding.tsx` component (already built)

---

### Priority 2: Transactions

#### `GET /api/v1/mpesa/transactions?limit=100&start_date=2025-09-01&end_date=2025-12-09`
**What it returns:**
```json
{
  "transactions": [
    {
      "id": "uuid",
      "transaction_id": "RFK8HMXY9Z",
      "type": "inflow",
      "amount": 2500,
      "currency": "KES",
      "timestamp": "2025-12-09T09:15:00Z",
      "customer_phone": "+254722111222",
      "customer_name": "JOHN KAMAU",
      "reference": "Payment for laundry",
      "balance_after": 1847200,
      "category": "revenue",
      "agent_categorized": true
    }
  ],
  "pagination": { "total": 1247, "limit": 100, "offset": 0, "has_more": true },
  "summary": {
    "total_inflow": 2800000,
    "total_outflow": 1900000,
    "net": 900000,
    "period": "30_days"
  }
}
```

**Used in:** `MoneyMPesa.tsx` river chart

**Categories:**
- `revenue` - Customer payments
- `inventory` - Stock purchases
- `salary` - Employee payments
- `utilities` - Rent, electricity, etc.
- `other` - Uncategorized

**Agent Categorization:**
The n8n agent should analyze transaction references and names to auto-categorize:
- "laundry", "payment" → `revenue`
- "stock", "supplier" → `inventory`
- "salary", "wages" → `salary`
- "rent", "power", "water" → `utilities`

---

### Priority 3: Cash Flow Forecasting

#### `GET /api/v1/cashflow/forecast?days=21`
**What it returns:**
```json
{
  "forecast_id": "uuid",
  "generated_at": "2025-12-09T10:30:00Z",
  "period_days": 21,
  "model_version": "prophet-v2.1",
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
  ],
  "insights": [
    {
      "type": "surplus",
      "severity": "info",
      "message": "KES 680k surplus expected in 21 days",
      "recommendation": "Consider moving KES 200k to savings account",
      "agent": "cashflow"
    }
  ],
  "summary": {
    "total_predicted_inflow": 920000,
    "total_predicted_outflow": 520000,
    "net_profit": 400000,
    "growth_rate": 0.23
  }
}
```

**Used in:** `Money.tsx` forecast tab

**Forecasting Logic (for n8n/Backend):**
1. Get last 90 days of M-Pesa transactions
2. Use Prophet (Facebook's time-series forecasting) or similar ML model
3. Predict inflow/outflow for next 21 or 90 days
4. Calculate cumulative balance
5. Identify surpluses (opportunities) and gaps (risks)

---

### Priority 4: Manual Sync & Cash Logging

#### `POST /api/v1/mpesa/sync`
**Triggers:** n8n workflow to fetch latest transactions from Safaricom

**Response:**
```json
{
  "sync_id": "uuid",
  "status": "processing",
  "message": "Sync initiated. Transactions will be updated in 2-5 minutes.",
  "estimated_completion": "2025-12-09T10:33:00Z"
}
```

**Used in:** `MoneyMPesa.tsx` (when user clicks refresh)

#### `POST /api/v1/cashflow/log-cash`
**Request:**
```json
{
  "amount": 5000,
  "currency": "KES",
  "description": "Cash sale - laundry services",
  "timestamp": "2025-12-09T10:15:00Z",
  "category": "revenue"
}
```

**Used in:** `MoneyMPesa.tsx` floating button + modal

---

## n8n Workflow Design

### Workflow 1: M-Pesa Transaction Sync (Real-time)

**Trigger:** Webhook from Safaricom (when new transaction occurs)

**Steps:**
1. **HTTP Request** - Receive Safaricom callback
2. **Code Node** - Parse M-Pesa transaction data
   ```javascript
   // Extract data from Safaricom format
   const transaction = {
     transaction_id: $input.item.json.TransID,
     amount: parseFloat($input.item.json.TransAmount),
     customer_phone: $input.item.json.MSISDN,
     customer_name: `${$input.item.json.FirstName} ${$input.item.json.LastName}`,
     reference: $input.item.json.BillRefNumber,
     timestamp: parseTransTime($input.item.json.TransTime),
     type: 'inflow'
   };
   return { json: transaction };
   ```

3. **Code Node** - Categorize transaction
   ```javascript
   const categorizeTransaction = (reference, name) => {
     const refLower = reference.toLowerCase();
     if (refLower.includes('laundry') || refLower.includes('payment')) {
       return 'revenue';
     }
     if (refLower.includes('stock') || refLower.includes('supplier')) {
       return 'inventory';
     }
     if (refLower.includes('salary') || refLower.includes('wages')) {
       return 'salary';
     }
     if (refLower.includes('rent') || refLower.includes('power') || refLower.includes('water')) {
       return 'utilities';
     }
     return 'other';
   };

   $input.item.json.category = categorizeTransaction(
     $input.item.json.reference,
     $input.item.json.customer_name
   );
   $input.item.json.agent_categorized = true;
   return $input.item;
   ```

4. **HTTP Request** - Save to Django backend
   ```
   POST https://api.inua360.co.ke/v1/mpesa/transactions
   Body: {{ $json }}
   ```

5. **HTTP Request** - Post activity to feed
   ```
   POST https://api.inua360.co.ke/v1/webhooks/n8n/activity
   Body: {
     "agent_id": "financials",
     "type": "mpesa_sync",
     "status": "success",
     "title": "M-Pesa Synced - 1 New Transaction",
     "description": "Synced KES {{ $json.amount }} from {{ $json.customer_name }}",
     "metadata": { "transaction_id": "{{ $json.transaction_id }}" }
   }
   ```

---

### Workflow 2: Daily Cash Flow Forecast

**Trigger:** Cron (every day at 7:00 AM EAT)

**Steps:**
1. **Code Node** - Get list of all users
2. **Loop** - For each user:

   a. **HTTP Request** - Get last 90 days transactions
      ```
      GET https://api.inua360.co.ke/v1/mpesa/transactions?user_id={{ $json.user_id }}&start_date={{ 90_days_ago }}&limit=1000
      ```

   b. **Code Node** - Prepare data for Prophet
      ```javascript
      // Format for Prophet: { ds: date, y: amount }
      const inflowData = transactions
        .filter(t => t.type === 'inflow')
        .map(t => ({ ds: t.timestamp.split('T')[0], y: t.amount }));

      const outflowData = transactions
        .filter(t => t.type === 'outflow')
        .map(t => ({ ds: t.timestamp.split('T')[0], y: Math.abs(t.amount) }));

      return { json: { inflow: inflowData, outflow: outflowData } };
      ```

   c. **Execute Command** - Run Prophet forecast (Python)
      ```bash
      python3 /path/to/forecast_script.py --data='{{ $json }}' --days=21
      ```

   d. **Code Node** - Parse forecast results & detect insights
      ```javascript
      const forecast = JSON.parse($input.item.json.stdout);

      // Detect surplus (total predicted > 500k)
      const totalPredicted = forecast.reduce((sum, p) => sum + p.net_cashflow, 0);
      const insights = [];

      if (totalPredicted > 500000) {
        insights.push({
          type: 'surplus',
          severity: 'info',
          message: `KES ${(totalPredicted / 1000).toFixed(0)}k surplus expected`,
          recommendation: 'Consider moving funds to savings',
          agent: 'cashflow'
        });
      }

      // Detect gap (any day with negative cumulative)
      const hasGap = forecast.some(p => p.cumulative < 0);
      if (hasGap) {
        insights.push({
          type: 'gap',
          severity: 'warning',
          message: 'Cash flow gap detected',
          recommendation: 'Explore funding opportunities',
          agent: 'cashflow'
        });
      }

      return {
        json: {
          forecast_id: generateUUID(),
          generated_at: new Date().toISOString(),
          period_days: 21,
          data_points: forecast,
          insights: insights
        }
      };
      ```

   e. **HTTP Request** - Save forecast to Django
      ```
      POST https://api.inua360.co.ke/v1/cashflow/forecast
      Body: {{ $json }}
      ```

   f. **HTTP Request** - Post activity if insights found
      ```
      POST https://api.inua360.co.ke/v1/webhooks/n8n/activity
      Body: {
        "agent_id": "cashflow",
        "type": "forecast_generated",
        "status": "success",
        "title": "21-Day Cash Flow Forecast Ready",
        "description": "{{ $json.insights[0].message }}",
        "metadata": { "forecast_id": "{{ $json.forecast_id }}" }
      }
      ```

---

### Workflow 3: Transaction Categorization Review

**Trigger:** Cron (every Sunday at 8:00 PM EAT)

**Purpose:** Review auto-categorized transactions and improve accuracy

**Steps:**
1. Get transactions with `agent_categorized: true` from last week
2. Calculate category distribution
3. Flag suspicious categorizations (e.g., very large "utilities" payment)
4. Post activity asking user to review flagged transactions
5. Use user feedback to improve categorization logic

---

## Prophet Forecasting Script (Python)

**File:** `forecast_script.py`

```python
import sys
import json
import pandas as pd
from prophet import Prophet
from datetime import datetime, timedelta

def forecast_cashflow(inflow_data, outflow_data, days=21):
    """
    Generate cash flow forecast using Prophet
    """
    # Prepare inflow forecast
    df_inflow = pd.DataFrame(inflow_data)
    df_inflow.columns = ['ds', 'y']
    df_inflow['ds'] = pd.to_datetime(df_inflow['ds'])

    model_inflow = Prophet()
    model_inflow.fit(df_inflow)
    future_inflow = model_inflow.make_future_dataframe(periods=days)
    forecast_inflow = model_inflow.predict(future_inflow)

    # Prepare outflow forecast
    df_outflow = pd.DataFrame(outflow_data)
    df_outflow.columns = ['ds', 'y']
    df_outflow['ds'] = pd.to_datetime(df_outflow['ds'])

    model_outflow = Prophet()
    model_outflow.fit(df_outflow)
    future_outflow = model_outflow.make_future_dataframe(periods=days)
    forecast_outflow = model_outflow.predict(future_outflow)

    # Combine forecasts
    forecast_combined = []
    cumulative = 0

    for i in range(len(forecast_inflow)):
        date = forecast_inflow.iloc[i]['ds'].strftime('%Y-%m-%d')
        inflow = max(0, forecast_inflow.iloc[i]['yhat'])
        outflow = max(0, forecast_outflow.iloc[i]['yhat'])
        net = inflow - outflow
        cumulative += net

        forecast_combined.append({
            'date': date,
            'predicted_inflow': round(inflow, 2),
            'predicted_outflow': round(outflow, 2),
            'net_cashflow': round(net, 2),
            'cumulative': round(cumulative, 2),
            'confidence_lower': round(forecast_inflow.iloc[i]['yhat_lower'], 2),
            'confidence_upper': round(forecast_inflow.iloc[i]['yhat_upper'], 2)
        })

    return forecast_combined[-days:]  # Return only future predictions

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--data', type=str, required=True)
    parser.add_argument('--days', type=int, default=21)
    args = parser.parse_args()

    data = json.loads(args.data)
    result = forecast_cashflow(data['inflow'], data['outflow'], args.days)
    print(json.dumps(result))
```

---

## Testing the Financial Agent

### Step 1: Test M-Pesa Status (Without Backend)

**Using Mock Data:**
```typescript
// In MoneyMPesa.tsx, temporarily add:
const mockStatus = {
  connected: true,
  account_type: 'till',
  till_number: '5834001',
  phone_number: '+254712345678',
  last_sync: new Date().toISOString(),
  sync_status: 'success',
  balance: { till: 1847200, wallet: 45000, cash_in_hand: 87400 }
};
```

### Step 2: Test with Django Backend

```bash
# 1. Start Django backend
cd backend
python manage.py runserver

# 2. In new terminal, test endpoint
curl http://localhost:8000/api/v1/mpesa/status \
  -H "Authorization: Bearer YOUR_TOKEN"

# 3. Start React frontend
cd frontend
npm start

# 4. Open http://localhost:3000/money-mpesa
# Should see real data from backend
```

### Step 3: Test n8n Workflow

```bash
# 1. Start n8n
n8n start

# 2. Open http://localhost:5678

# 3. Import workflow JSON (you'll create this)

# 4. Test with mock M-Pesa callback:
curl -X POST http://localhost:5678/webhook/mpesa-callback \
  -H "Content-Type: application/json" \
  -d '{
    "TransID": "TEST123",
    "TransAmount": "2500.00",
    "MSISDN": "254722111222",
    "FirstName": "JOHN",
    "LastName": "KAMAU",
    "BillRefNumber": "Laundry payment",
    "TransTime": "20251209091500"
  }'

# 5. Check Django backend for new transaction
# 6. Check frontend agent feed for activity
```

---

## Summary Checklist

### Frontend (✅ Already Done)
- [x] M-Pesa pages (`MoneyMPesa.tsx`, `Money.tsx`)
- [x] API hooks (`useMPesaStatus`, `useMPesaTransactions`, `useCashFlowForecast`)
- [x] TypeScript types (`src/types/api.ts`)
- [x] Error handling with bilingual messages
- [x] Loading states

### Backend (Django Team - In Progress)
- [ ] `/mpesa/status` endpoint
- [ ] `/mpesa/connect` endpoint
- [ ] `/mpesa/sync` endpoint
- [ ] `/mpesa/transactions` endpoint
- [ ] `/cashflow/forecast` endpoint
- [ ] `/cashflow/log-cash` endpoint
- [ ] Safaricom Daraja API integration
- [ ] Database models (User, MPesaConnection, Transaction, Forecast)

### n8n (Your Task - Next)
- [ ] M-Pesa transaction sync workflow
- [ ] Daily cash flow forecast workflow
- [ ] Transaction categorization logic
- [ ] Prophet forecasting script
- [ ] Webhook endpoints configured

---

**Next Steps:**
1. Backend team finishes M-Pesa endpoints (ETA: 1-2 weeks)
2. You build n8n workflows following this guide
3. Test integration end-to-end
4. Deploy to staging

**Questions?** Refer to:
- `DJANGO_API_SPEC.md` - Full API spec
- `BACKEND_INTEGRATION.md` - Integration guide
- `src/types/api.ts` - TypeScript types
