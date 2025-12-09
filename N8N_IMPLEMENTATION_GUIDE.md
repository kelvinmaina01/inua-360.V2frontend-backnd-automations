# n8n Implementation Guide - Financial Agent
**M-Pesa-First Architecture - Optimized for n8n Workflow Consumption**

---

## 🚨 CRITICAL: M-Pesa-First Approach

**THE ONLY SOURCE OF TRUTH FOR FINANCIAL DATA IS M-PESA**

### Core Principle:
- ✅ **YES**: M-Pesa transactions (Till, Paybill, Pochi La Biashara)
- ❌ **NO**: Manual receipt entry
- ❌ **NO**: Bank accounts (coming later)
- ❌ **NO**: Cash tracking outside M-Pesa

### Why M-Pesa Only?
1. **Automatic**: Transactions sync via Safaricom Daraja API
2. **Accurate**: No human error from manual entry
3. **Real-time**: Data available instantly
4. **Kenyan SME Reality**: 95% of small business transactions happen via M-Pesa

### Frontend Changes Implemented:
1. **New Page**: `/connect-mpesa` - User connects Till/Paybill/Pochi
2. **Home Dashboard**: Shows M-Pesa connection status (Required badge)
3. **Money Page**: First tab changed from "Forecast" to "Transactions" - displays M-Pesa inflow/outflow
4. **Removed**: All receipt recording features

### n8n Workflow Triggers (NEW):
All Financial Agent workflows now triggered by M-Pesa connection events:

| Trigger | Event | Frequency | Purpose |
|---------|-------|-----------|---------|
| **User connects M-Pesa** | POST `/api/v1/mpesa/connect` | One-time | Initialize OAuth, fetch historical 90 days |
| **Daily M-Pesa sync** | Cron: Daily 7 AM | Daily | Fetch yesterday's transactions from Daraja API |
| **Transaction webhook** | Safaricom C2B webhook | Real-time | Instant notification when customer pays |

---

## 🎯 Quick Overview

**What I Built (Frontend):**
1. M-Pesa Connection page - Till/Paybill/Pochi selection with business account enforcement
2. Loan Readiness page - shows score 78/100 (calculated from M-Pesa data)
3. M-Pesa Transactions view - shows inflow/outflow with categorization
4. Debt Schedule - shows 2 loans
5. Financial KPIs - shows Cash Runway 38 days (calculated from M-Pesa balance)

**What You Build (n8n):**
- **Workflow 0**: M-Pesa OAuth & Initial Sync (NEW)
- **Workflow 1**: Daily M-Pesa Transaction Sync (NEW)
- **Workflow 2**: Weekly Loan Readiness Assessment (updated to use M-Pesa data)
- **Workflow 3**: Daily Financial KPIs Update (updated to use M-Pesa data)
- **Workflow 4**: Transaction Categorization with ML (NEW)
- **Workflow 5**: Debt Payment Reminders

---

## 📊 VISUAL FLOW: Frontend → n8n → ML → Django → Frontend

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (What I Built)                          │
│                                                                          │
│  Page: Loan Readiness (/loan-readiness)                                │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ Shows:                                                          │    │
│  │ • Score: 78/100                  ◄─── MOCKED (fake number)     │    │
│  │ • Assessment: Financial 85/100   ◄─── MOCKED                   │    │
│  │ • Lenders: KIE 96%, Hustler 88%  ◄─── MOCKED                   │    │
│  │ • Loan capacity: KES 500K        ◄─── MOCKED                   │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  Page: Money → Debt Tab                                                │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ Shows:                                                          │    │
│  │ • Total debt: KES 250K           ◄─── MOCKED                   │    │
│  │ • 2 loans (Hustler, Equipment)   ◄─── MOCKED                   │    │
│  │ • Payment calendar               ◄─── MOCKED                   │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  Component: Financial KPIs (Home page)                                 │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ Shows:                                                          │    │
│  │ • Cash Runway: 38 days           ◄─── MOCKED                   │    │
│  │ • Loan Likelihood: 78%           ◄─── MOCKED                   │    │
│  │ • Revenue Growth: +12.3%         ◄─── MOCKED                   │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  When backend ready, replace mocks with:                                │
│  • useLoanReadiness() hook → GET /api/v1/financial/loan-readiness      │
│  • useDebtSchedule() hook → GET /api/v1/financial/debt-schedule        │
│  • useFinancialKPIs() hook → GET /api/v1/financial/kpis                │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               │ HTTP GET requests
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      DJANGO BACKEND (Backend Team)                       │
│                                                                          │
│  Endpoints:                                                             │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ GET /api/v1/financial/loan-readiness                           │    │
│  │   Returns: {loan_readiness_score: 78, assessment: {...}, ...} │    │
│  │   Source: Reads from `loan_readiness_reports` table           │    │
│  │           Latest report calculated by n8n workflow             │    │
│  │                                                                 │    │
│  │ GET /api/v1/financial/debt-schedule                            │    │
│  │   Returns: {total_debt: 250000, loans: [...], ...}            │    │
│  │   Source: Reads from `loans` table                             │    │
│  │           User manually adds loans or imported                 │    │
│  │                                                                 │    │
│  │ GET /api/v1/financial/kpis                                     │    │
│  │   Returns: {cash_runway_days: 38, loan_likelihood: 78, ...}   │    │
│  │   Source: Reads from `financial_kpis` table                    │    │
│  │           Calculated daily by n8n workflow                     │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  Database (PostgreSQL):                                                 │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ Table: mpesa_transactions                                      │    │
│  │ Columns: id, user_id, transaction_id, type, amount, timestamp, │    │
│  │          category, reference, customer_name                     │    │
│  │ Updated by: n8n Workflow 3 (M-Pesa Sync)                       │    │
│  │                                                                 │    │
│  │ Table: loan_readiness_reports                                  │    │
│  │ Columns: id, user_id, score, assessment, matched_lenders,      │    │
│  │          generated_at                                           │    │
│  │ Updated by: n8n Workflow 1 (Weekly Assessment)                 │    │
│  │                                                                 │    │
│  │ Table: financial_kpis                                          │    │
│  │ Columns: id, user_id, cash_runway_days, loan_likelihood,       │    │
│  │          debt_coverage_ratio, revenue_growth, generated_at     │    │
│  │ Updated by: n8n Workflow 2 (Daily Update)                      │    │
│  │                                                                 │    │
│  │ Table: loans                                                    │    │
│  │ Columns: id, user_id, lender, principal, outstanding,          │    │
│  │          monthly_payment, next_payment_date                     │    │
│  │ Updated by: User input or backend import                       │    │
│  └────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               │ n8n reads/writes data
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         n8n (What You Build)                             │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ WORKFLOW 0: M-Pesa OAuth & Initial Sync (NEW - CRITICAL)       │   │
│  │ Trigger: User clicks "Connect M-Pesa" button                    │   │
│  │                                                                  │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 1: Receive Connection Request from Frontend        ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► Webhook: POST /webhooks/mpesa-connect                   │   │
│  │        Body: {                                                  │   │
│  │          user_id: "uuid-123",                                   │   │
│  │          account_type: "till",  // or "paybill" or "pochi"     │   │
│  │          business_name: "Jane's Salon",                        │   │
│  │          phone_number: "254712345678",                          │   │
│  │          till_number: "123456",                                 │   │
│  │          paybill_number: null,                                  │   │
│  │          store_number: null                                     │   │
│  │        }                                                        │   │
│  │                                                                 │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 2: Get Daraja OAuth Token (HTTP Request)           ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► HTTP Request: GET https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials│
│  │        Headers:                                                 │   │
│  │          Authorization: Basic {{base64(consumer_key:secret)}}   │   │
│  │        Response: {access_token: "eyJ0...", expires_in: 3599}   │   │
│  │        Save token to: {{$json.access_token}}                   │   │
│  │                                                                 │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 3: Register C2B Callback URLs (HTTP Request)       ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► HTTP Request: POST https://api.safaricom.co.ke/mpesa/c2b/v1/registerurl│
│  │        Headers:                                                 │   │
│  │          Authorization: Bearer {{$access_token}}                │   │
│  │        Body: {                                                  │   │
│  │          ShortCode: "{{$till_number}}",                         │   │
│  │          ResponseType: "Completed",                             │   │
│  │          ConfirmationURL: "https://your-domain.com/webhooks/mpesa-confirmation",│
│  │          ValidationURL: "https://your-domain.com/webhooks/mpesa-validation"│
│  │        }                                                        │   │
│  │                                                                 │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 4: Fetch Historical Transactions (90 days)         ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► Loop for last 90 days:                                  │   │
│  │        HTTP Request: POST https://api.safaricom.co.ke/mpesa/transactionstatus/v1/query│
│  │        Body: {                                                  │   │
│  │          ShortCode: "{{$till_number}}",                         │   │
│  │          TransactionID: "auto",                                 │   │
│  │          StartDate: "2025-09-10",                               │   │
│  │          EndDate: "2025-09-11"                                  │   │
│  │        }                                                        │   │
│  │        Response: {                                              │   │
│  │          ResultCode: 0,                                         │   │
│  │          Transactions: [                                        │   │
│  │            {                                                    │   │
│  │              TransactionID: "SJK2H4D3F5",                       │   │
│  │              TransAmount: 5500,                                 │   │
│  │              TransTime: "20251209143245",                       │   │
│  │              BusinessShortCode: "123456",                       │   │
│  │              BillRefNumber: "Payment for laundry",             │   │
│  │              ThirdPartyTransID: "uuid",                         │   │
│  │              MSISDN: "254712345678",                            │   │
│  │              FirstName: "JOHN",                                 │   │
│  │              MiddleName: "KAMAU",                               │   │
│  │              LastName: "",                                      │   │
│  │              OrgAccountBalance: 125500                          │   │
│  │            }                                                    │   │
│  │          ]                                                      │   │
│  │        }                                                        │   │
│  │                                                                 │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 5: Categorize Transactions with ML (HTTP Request)  ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► For each transaction:                                   │   │
│  │        HTTP Request: POST http://localhost:5000/ml/categorize  │   │
│  │        Body: {                                                  │   │
│  │          reference: "Payment for laundry",                      │   │
│  │          customer_name: "JOHN KAMAU",                          │   │
│  │          amount: 5500                                           │   │
│  │        }                                                        │   │
│  │        Response: {                                              │   │
│  │          category: "revenue",  // or "expense", "rent", etc    │   │
│  │          subcategory: "service_income",                         │   │
│  │          confidence: 0.92                                       │   │
│  │        }                                                        │   │
│  │                                                                 │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 6: Save All Transactions to Django Database        ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► HTTP Request: POST /api/v1/mpesa/transactions/bulk      │   │
│  │        Body: {                                                  │   │
│  │          user_id: "uuid-123",                                   │   │
│  │          transactions: [                                        │   │
│  │            {                                                    │   │
│  │              transaction_id: "SJK2H4D3F5",                      │   │
│  │              type: "inflow",  // determined by positive amount  │   │
│  │              amount: 5500,                                      │   │
│  │              timestamp: "2025-12-09T14:32:45Z",                 │   │
│  │              category: "revenue",                               │   │
│  │              subcategory: "service_income",                     │   │
│  │              reference: "Payment for laundry",                  │   │
│  │              customer_name: "JOHN KAMAU",                       │   │
│  │              phone: "254712345678",                             │   │
│  │              balance: 125500                                    │   │
│  │            },                                                   │   │
│  │            // ... more transactions                            │   │
│  │          ]                                                      │   │
│  │        }                                                        │   │
│  │        → Django saves to mpesa_transactions table              │   │
│  │                                                                 │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 7: Update M-Pesa Connection Status                 ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► HTTP Request: PUT /api/v1/mpesa/connection              │   │
│  │        Body: {                                                  │   │
│  │          user_id: "uuid-123",                                   │   │
│  │          status: "connected",                                   │   │
│  │          last_sync: "2025-12-09T16:00:00Z",                     │   │
│  │          transactions_imported: 267                             │   │
│  │        }                                                        │   │
│  │        → Frontend now shows "M-Pesa Connected" badge           │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ WORKFLOW 1: Daily M-Pesa Sync (NEW - Every day 7 AM)           │   │
│  │ Trigger: Cron - 0 7 * * *                                       │   │
│  │                                                                  │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 1: Get All Users with M-Pesa Connected             ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► HTTP Request: GET /api/v1/users?mpesa_connected=true    │   │
│  │        Response: [                                              │   │
│  │          {user_id: "uuid-1", till_number: "123456", ...},      │   │
│  │          {user_id: "uuid-2", paybill_number: "567890", ...}    │   │
│  │        ]                                                        │   │
│  │                                                                 │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 2: For Each User, Fetch Yesterday's Transactions   ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► Loop through users:                                     │   │
│  │        1. Get OAuth token (same as Workflow 0 Step 2)          │   │
│  │        2. Fetch transactions from Daraja API (yesterday only)  │   │
│  │        3. Categorize with ML API                                │   │
│  │        4. Save to Django database                               │   │
│  │        5. Trigger Workflow 3 (Calculate KPIs) for this user    │   │
│  │                                                                 │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 3: Post Activity to Feed                           ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► HTTP Request: POST /api/v1/webhooks/n8n/activity       │   │
│  │        Body: {                                                  │   │
│  │          agent_id: "financial",                                │   │
│  │          type: "mpesa_synced",                                 │   │
│  │          title: "M-Pesa Synced: 12 new transactions",          │   │
│  │          description: "KES 45,000 inflow, KES 12,000 outflow"  │   │
│  │        }                                                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ WORKFLOW 2: Loan Readiness Assessment (Monday 8 AM)            │   │
│  │                                                                  │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 1: Collect Data from Django                        ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    ├─► HTTP Request: GET /mpesa/transactions?days=90           │   │
│  │    │   Gets: [{type: "inflow", amount: 95000, date: "..."}, ...]│  │
│  │    │                                                            │   │
│  │    ├─► HTTP Request: GET /compliance                           │   │
│  │    │   Gets: {score: 87, items: [...]}                         │   │
│  │    │                                                            │   │
│  │    └─► HTTP Request: GET /financial/debt-schedule              │   │
│  │        Gets: {total_debt: 250000, monthly_obligations: 25000}  │   │
│  │                                                                 │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 2: Calculate Features (Code Node)                  ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► JavaScript Code:                                        │   │
│  │        ```javascript                                           │   │
│  │        const transactions = $input.item.json.transactions;     │   │
│  │        const inflow = transactions.filter(t => t.type === 'inflow'); │
│  │        const outflow = transactions.filter(t => t.type === 'outflow');│
│  │                                                                 │   │
│  │        const revenue_data = inflow.map(t => t.amount);         │   │
│  │        const expense_data = outflow.map(t => t.amount);        │   │
│  │        const compliance_score = $('Get Compliance').item.json.score;│
│  │        const existing_debt = $('Get Debt').item.json.total_debt;│   │
│  │        const monthly_income = revenue_data.reduce((a,b)=>a+b)/3;│   │
│  │                                                                 │   │
│  │        return {json: {                                          │   │
│  │          revenue_data,                                          │   │
│  │          expense_data,                                          │   │
│  │          compliance_score,                                      │   │
│  │          existing_debt,                                         │   │
│  │          monthly_income                                         │   │
│  │        }};                                                      │   │
│  │        ```                                                      │   │
│  │                                                                 │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 3: Send to ML API                                  ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► HTTP Request: POST http://localhost:5000/ml/loan-score │   │
│  │        Body: {{$json}} (from previous step)                    │   │
│  │        Timeout: 60 seconds                                     │   │
│  │                                                                 │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 4: ML Processes (This happens in ML API)           ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► ML API calculates:                                      │   │
│  │        - Revenue consistency: std_dev, growth_rate             │   │
│  │        - Cash flow positivity: % of positive days              │   │
│  │        - Debt-to-income ratio: debt / annual_income            │   │
│  │        - XGBoost prediction: approval probability              │   │
│  │        - Final score: weighted average                         │   │
│  │                                                                 │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 5: Receive ML Response                             ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► ML Returns:                                             │   │
│  │        {                                                        │   │
│  │          "loan_readiness_score": 78,     ← This number!       │   │
│  │          "financial_health_score": 85,                         │   │
│  │          "documentation_score": 70,                            │   │
│  │          "repayment_capacity_score": 80,                       │   │
│  │          "recommended_loan_amount": 500000                     │   │
│  │        }                                                        │   │
│  │                                                                 │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 6: Match Lenders (Code Node)                       ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► JavaScript Code:                                        │   │
│  │        ```javascript                                           │   │
│  │        const lenders = [                                       │   │
│  │          {id: 'kie', name: 'KIE', sector: 'retail',           │   │
│  │           min_revenue: 500000, max_amount: 2000000},           │   │
│  │          {id: 'hustler', name: 'Hustler Fund',                │   │
│  │           min_revenue: 0, max_amount: 50000},                  │   │
│  │          {id: 'women', name: 'Women Fund',                    │   │
│  │           gender: 'female', max_amount: 1000000}               │   │
│  │        ];                                                       │   │
│  │                                                                 │   │
│  │        const userProfile = $('Get User Profile').item.json;    │   │
│  │        const loanScore = $input.item.json.loan_readiness_score;│   │
│  │                                                                 │   │
│  │        const matched = lenders.map(lender => {                 │   │
│  │          let score = 0;                                         │   │
│  │          // Sector match (30%)                                 │   │
│  │          if (lender.sector === userProfile.sector) score += 30;│   │
│  │          // Revenue in range (25%)                             │   │
│  │          if (userProfile.annual_revenue >= lender.min_revenue) │   │
│  │            score += 25;                                         │   │
│  │          // Loan readiness (20%)                               │   │
│  │          score += (loanScore / 100) * 20;                      │   │
│  │          // Special criteria (10%)                             │   │
│  │          if (lender.gender && userProfile.gender === lender.gender)│
│  │            score += 10;                                         │   │
│  │          // Compliance (15%)                                   │   │
│  │          score += (userProfile.compliance_score / 100) * 15;   │   │
│  │                                                                 │   │
│  │          return {...lender, match_score: Math.round(score)};   │   │
│  │        }).sort((a,b) => b.match_score - a.match_score)         │   │
│  │          .slice(0, 3); // Top 3                                │   │
│  │                                                                 │   │
│  │        return {json: {matched_lenders: matched}};              │   │
│  │        ```                                                      │   │
│  │                                                                 │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 7: Save to Django Database                         ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► HTTP Request: POST /api/v1/financial/loan-readiness     │   │
│  │        Body: {                                                  │   │
│  │          "user_id": "{{$user_id}}",                            │   │
│  │          "loan_readiness_score": 78,                           │   │
│  │          "assessment": {...},                                  │   │
│  │          "matched_lenders": [...]                              │   │
│  │        }                                                        │   │
│  │        → Django saves to database                              │   │
│  │                                                                 │   │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │   │
│  │  ┃ Step 8: Post Activity to Feed                           ┃  │   │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │   │
│  │    │                                                            │   │
│  │    └─► HTTP Request: POST /api/v1/webhooks/n8n/activity       │   │
│  │        Body: {                                                  │   │
│  │          "agent_id": "cashflow",                               │   │
│  │          "type": "loan_readiness_updated",                     │   │
│  │          "status": "success",                                  │   │
│  │          "title": "Loan Readiness Score: 78/100",              │   │
│  │          "description": "High likelihood of approval. 3 lenders matched."│
│  │        }                                                        │   │
│  │        → Shows in Agent Feed page                              │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ WORKFLOW 2: Daily Financial KPIs (Every day 7 AM)              │   │
│  │                                                                  │   │
│  │  Step 1: GET /mpesa/status → {balance: {till: 1847200, ...}}  │   │
│  │  Step 2: GET /mpesa/transactions?days=30 → 30 days data       │   │
│  │  Step 3: Code Node → Calculate cash runway:                   │   │
│  │          cash_runway = total_balance / (total_expenses / 30)   │   │
│  │  Step 4: POST /ml/forecast → Get 21-day forecast              │   │
│  │  Step 5: Code Node → Calculate all KPIs                       │   │
│  │  Step 6: POST /api/v1/financial/kpis → Save                   │   │
│  │  Step 7: IF cash_runway < 30 THEN POST alert to feed          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ WORKFLOW 3: M-Pesa Sync (Real-time webhook)                    │   │
│  │                                                                  │   │
│  │  Step 1: Webhook receives Safaricom data                       │   │
│  │  Step 2: Code Node → Parse transaction                         │   │
│  │  Step 3: POST /ml/categorize → Get category (revenue/inventory)│   │
│  │  Step 4: POST /api/v1/mpesa/transactions → Save               │   │
│  │  Step 5: POST /webhooks/n8n/activity → Post to feed           │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               │ Sends data to ML API
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    MACHINE LEARNING API (Flask/FastAPI)                  │
│                    Port 5000                                             │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ POST /ml/loan-score                                             │   │
│  │                                                                  │   │
│  │  Receives:                                                      │   │
│  │  {                                                               │   │
│  │    "revenue_data": [95K, 98K, 92K, ...],  ← 90 numbers         │   │
│  │    "expense_data": [48K, 49K, 47K, ...],  ← 90 numbers         │   │
│  │    "compliance_score": 87,                 ← 1 number           │   │
│  │    "existing_debt": 250000,                ← 1 number           │   │
│  │    "monthly_income": 920000                ← 1 number           │   │
│  │  }                                                               │   │
│  │                                                                  │   │
│  │  Calculates:                                                    │   │
│  │  1. revenue_mean = np.mean(revenue_data)                       │   │
│  │  2. revenue_std = np.std(revenue_data)                         │   │
│  │  3. growth_rate = (revenue_data[-1] - revenue_data[0]) / [0]  │   │
│  │  4. debt_ratio = existing_debt / (monthly_income * 12)         │   │
│  │  5. cash_flow_positive_pct = count(revenue > expense) / 90     │   │
│  │                                                                  │   │
│  │  Runs XGBoost:                                                  │   │
│  │  features = [revenue_mean, revenue_std, growth_rate,           │   │
│  │              compliance_score, debt_ratio, cash_flow_pct]      │   │
│  │  probability = model.predict_proba(features)[0][1]             │   │
│  │  loan_score = int(probability * 100)                           │   │
│  │                                                                  │   │
│  │  Returns:                                                       │   │
│  │  {                                                               │   │
│  │    "loan_readiness_score": 78,        ← n8n uses this!         │   │
│  │    "financial_health_score": 85,                               │   │
│  │    "recommended_loan_amount": 500000                           │   │
│  │  }                                                               │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ POST /ml/forecast                                               │   │
│  │                                                                  │   │
│  │  Receives:                                                      │   │
│  │  {                                                               │   │
│  │    "inflow": [                                                  │   │
│  │      {"ds": "2025-09-01", "y": 95000},  ← 90 data points       │   │
│  │      {"ds": "2025-09-02", "y": 98000},                         │   │
│  │      ...                                                        │   │
│  │    ],                                                            │   │
│  │    "outflow": [                                                 │   │
│  │      {"ds": "2025-09-01", "y": 48000},  ← 90 data points       │   │
│  │      ...                                                        │   │
│  │    ],                                                            │   │
│  │    "days": 21                                                   │   │
│  │  }                                                               │   │
│  │                                                                  │   │
│  │  Runs Prophet:                                                  │   │
│  │  1. Train on 90 days inflow data                               │   │
│  │  2. Predict next 21 days inflow                                │   │
│  │  3. Train on 90 days outflow data                              │   │
│  │  4. Predict next 21 days outflow                               │   │
│  │  5. Calculate net = inflow - outflow                           │   │
│  │  6. Calculate cumulative balance                               │   │
│  │                                                                  │   │
│  │  Returns:                                                       │   │
│  │  {                                                               │   │
│  │    "data_points": [                                            │   │
│  │      {                                                          │   │
│  │        "date": "2025-12-10",                                   │   │
│  │        "predicted_inflow": 95000,   ← n8n uses these!          │   │
│  │        "predicted_outflow": 48000,                             │   │
│  │        "cumulative": 1894200                                   │   │
│  │      },                                                         │   │
│  │      ... (21 points)                                           │   │
│  │    ]                                                            │   │
│  │  }                                                               │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ POST /ml/categorize                                             │   │
│  │                                                                  │   │
│  │  Receives: {"reference": "Payment for laundry", ...}           │   │
│  │  Runs NLP: Keyword matching + ML classifier                    │   │
│  │  Returns: {"category": "revenue", "confidence": 0.95}          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔢 Exact Data ML Needs to Consume

### **INPUT 1: For Loan Scoring**

**What n8n sends to ML:**
```json
{
  "revenue_data": [95000, 98000, 92000, 105000, 108000, ...],  // 90 numbers (daily revenue)
  "expense_data": [48000, 49000, 47000, 51000, 52000, ...],    // 90 numbers (daily expenses)
  "compliance_score": 87,                                       // 1 number (0-100)
  "existing_debt": 250000,                                      // 1 number (KES)
  "monthly_income": 920000,                                     // 1 number (KES)
  "business_sector": "retail",                                  // 1 string
  "county": "nairobi",                                          // 1 string
  "owner_gender": "female",                                     // 1 string (optional)
  "business_age_months": 24,                                    // 1 number
  "employee_count": 5                                           // 1 number
}
```

**What ML returns to n8n:**
```json
{
  "loan_readiness_score": 78,
  "approval_probability": 0.78,
  "approval_likelihood": "high",
  "financial_health_score": 85,
  "documentation_score": 70,
  "repayment_capacity_score": 80,
  "recommended_loan_amount": 500000,
  "max_loan_amount": 1000000,
  "estimated_interest_rate": 12.5,
  "monthly_payment": 44500,
  "debt_service_coverage_ratio": 2.5
}
```

---

### **INPUT 2: For Cash Flow Forecasting**

**What n8n sends to ML:**
```json
{
  "inflow": [
    {"ds": "2025-09-01", "y": 95000},
    {"ds": "2025-09-02", "y": 98000},
    {"ds": "2025-09-03", "y": 92000},
    // ... 90 data points (3 months of daily inflow)
  ],
  "outflow": [
    {"ds": "2025-09-01", "y": 48000},
    {"ds": "2025-09-02", "y": 49000},
    {"ds": "2025-09-03", "y": 47000},
    // ... 90 data points (3 months of daily outflow)
  ],
  "current_balance": 1847200,
  "days": 21
}
```

**What ML returns to n8n:**
```json
{
  "forecast_id": "uuid-123",
  "generated_at": "2025-12-09T07:00:00Z",
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
    },
    // ... 21 data points
  ],
  "insights": [
    {
      "type": "surplus",
      "severity": "info",
      "message": "KES 680k surplus expected in 21 days",
      "recommendation": "Consider moving KES 200k to savings account"
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

---

### **INPUT 3: For Transaction Categorization**

**What n8n sends to ML:**
```json
{
  "reference": "Payment for laundry services",
  "customer_name": "JOHN KAMAU",
  "amount": 2500
}
```

**What ML returns to n8n:**
```json
{
  "category": "revenue",
  "confidence": 0.95,
  "agent_categorized": true
}
```

**Categories:**
- `revenue` - Customer payments, sales
- `inventory` - Stock purchases, suppliers
- `salary` - Employee wages
- `utilities` - Rent, electricity, water, fuel
- `other` - Uncategorized

---

## 🚀 Step-by-Step: Build Your First n8n Workflow

### **Workflow: Daily Financial KPIs (Simplest One)**

**1. Create New Workflow in n8n**
- Open http://localhost:5678
- Click "+ New Workflow"
- Name: "Daily Financial KPIs Update"

**2. Add Cron Trigger**
- Drag "Schedule Trigger" node
- Cron Expression: `0 7 * * *` (7 AM daily)
- Timezone: Africa/Nairobi

**3. Add HTTP Request - Get M-Pesa Balance**
- Drag "HTTP Request" node
- Method: GET
- URL: `http://localhost:8000/api/v1/mpesa/status`
- Authentication: Header Auth
  - Name: `Authorization`
  - Value: `Bearer {{$('Get Auth Token').json.access_token}}`

**4. Add HTTP Request - Get Transactions**
- Method: GET
- URL: `http://localhost:8000/api/v1/mpesa/transactions?days=30&limit=1000`

**5. Add Code Node - Calculate Cash Runway**
```javascript
// Get balance
const balance = $('HTTP Request').item.json.balance;
const total_balance = balance.till + balance.wallet + balance.cash_in_hand;

// Get transactions
const transactions = $('HTTP Request1').item.json.transactions;
const outflow = transactions.filter(t => t.type === 'outflow');

// Calculate burn rate
const total_expenses = outflow.reduce((sum, t) => sum + t.amount, 0);
const daily_burn_rate = total_expenses / 30;

// Calculate runway
const cash_runway_days = Math.floor(total_balance / daily_burn_rate);

// Calculate revenue growth
const inflow = transactions.filter(t => t.type === 'inflow');
const first_week = inflow.slice(0, 7).reduce((sum, t) => sum + t.amount, 0);
const last_week = inflow.slice(-7).reduce((sum, t) => sum + t.amount, 0);
const revenue_growth_rate = ((last_week - first_week) / first_week * 100).toFixed(1);

return {
  json: {
    user_id: "{{$('Get User').json.id}}",
    cash_runway_days: cash_runway_days,
    loan_approval_likelihood: 78,  // Will come from ML later
    debt_service_coverage_ratio: 2.5,  // Calculate from loans
    revenue_growth_rate: parseFloat(revenue_growth_rate),
    gross_profit_margin: 43.5,  // Calculate: (revenue - COGS) / revenue
    operating_expense_ratio: 56.5,
    generated_at: new Date().toISOString()
  }
};
```

**6. Add HTTP Request - Save KPIs**
- Method: POST
- URL: `http://localhost:8000/api/v1/financial/kpis`
- Body: `{{$json}}`

**7. Add IF Node - Check Low Cash Runway**
- Condition: `{{$('Code').json.cash_runway_days}}` < 30

**8a. Add HTTP Request (True Branch) - Post Alert**
- Method: POST
- URL: `http://localhost:8000/api/v1/webhooks/n8n/activity`
- Body:
```json
{
  "agent_id": "cashflow",
  "type": "low_cash_runway_alert",
  "status": "warning",
  "priority": "high",
  "title": "Low Cash Runway Warning",
  "title_swahili": "Tahadhari: Muda wa Fedha Mdogo",
  "description": "Your business has only {{$('Code').json.cash_runway_days}} days of cash runway. Consider securing funding.",
  "description_swahili": "Biashara yako ina siku {{$('Code').json.cash_runway_days}} tu za fedha. Fikiria kupata ufadhili.",
  "action_required": true,
  "action_link": "/money?tab=funding",
  "action_label": "Explore Funding",
  "action_label_swahili": "Tafuta Ufadhili"
}
```

**9. Test Workflow**
- Click "Execute Workflow"
- Check output at each node
- Verify Django receives data
- Check activity feed in frontend

**10. Activate Workflow**
- Toggle "Active" switch
- Workflow now runs daily at 7 AM

---

## 📋 Complete n8n Workflow Checklist

### **Priority 1: Financial KPIs (Start Here)**
- [ ] Create workflow "Daily Financial KPIs"
- [ ] Add cron trigger (7 AM daily)
- [ ] Add HTTP node: GET M-Pesa balance
- [ ] Add HTTP node: GET transactions (30 days)
- [ ] Add Code node: Calculate cash runway
- [ ] Add HTTP node: POST to Django `/financial/kpis`
- [ ] Add IF node: Check if runway < 30
- [ ] Add HTTP node: POST alert to activity feed
- [ ] Test workflow manually
- [ ] Activate workflow

### **Priority 2: Loan Readiness Assessment**
- [ ] Create workflow "Weekly Loan Assessment"
- [ ] Add cron trigger (Monday 8 AM)
- [ ] Add HTTP node: GET transactions (90 days)
- [ ] Add HTTP node: GET compliance status
- [ ] Add HTTP node: GET debt schedule
- [ ] Add Code node: Prepare ML data
- [ ] Add HTTP node: POST to ML `/ml/loan-score`
- [ ] Add Code node: Match lenders
- [ ] Add HTTP node: POST to Django `/financial/loan-readiness`
- [ ] Add HTTP node: POST activity to feed
- [ ] Test with sample data
- [ ] Activate workflow

### **Priority 3: Cash Flow Forecast**
- [ ] Create workflow "Daily Cash Flow Forecast"
- [ ] Add cron trigger (7 AM daily)
- [ ] Add HTTP node: GET transactions (90 days)
- [ ] Add Code node: Format for Prophet
- [ ] Add HTTP node: POST to ML `/ml/forecast`
- [ ] Add Code node: Detect insights (surplus/gap)
- [ ] Add HTTP node: POST to Django `/cashflow/forecast`
- [ ] Add IF node: Check if insights found
- [ ] Add HTTP node: POST insights to activity feed
- [ ] Activate workflow

### **Priority 4: M-Pesa Transaction Sync**
- [ ] Create workflow "M-Pesa Real-time Sync"
- [ ] Add Webhook trigger (receive Safaricom callback)
- [ ] Add Code node: Parse M-Pesa transaction
- [ ] Add HTTP node: POST to ML `/ml/categorize`
- [ ] Add Code node: Add category to transaction
- [ ] Add HTTP node: POST to Django `/mpesa/transactions`
- [ ] Add HTTP node: POST to activity feed
- [ ] Configure webhook URL in Safaricom portal
- [ ] Test with mock callback
- [ ] Activate workflow

---

## ✅ Summary

**What I Built:**
- Complete frontend UI for Financial Agent
- 3 new pages/components
- All navigation and routing
- Full bilingual support
- Mock data displaying correctly

**What's Mocked (Fake Data):**
- Loan readiness score: 78
- Cash runway: 38 days
- 2 active loans
- 3 matched lenders
- All KPIs

**What You Build (n8n):**
- 4-5 workflows that calculate real values
- Integration with ML API for scoring
- Integration with Django for data storage
- Activity feed posting

**What ML Needs:**
- 90 days of M-Pesa transaction data
- Format: Arrays of numbers or {ds, y} objects
- Output: Scores, forecasts, categories

**Result:**
Frontend shows real calculated data instead of fake numbers!

---

**Start with WORKFLOW 2 (Daily KPIs) - it's the simplest!**

Use `COMPLETE_ARCHITECTURE.md` for visual diagrams and this file for step-by-step n8n instructions.
