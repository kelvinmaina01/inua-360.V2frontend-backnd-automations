# Inua360 - Quick Start Guide
**For Frontend Developer & n8n Workflow Builder**

---

## 🎯 Your Role

You are the **Frontend Developer** responsible for:
1. ✅ Building the UI (DONE - All pages complete)
2. ✅ Exposing API endpoints (DONE - All TypeScript types & hooks ready)
3. 🔄 **NEXT:** Build n8n agent workflows for Financial & Compliance agents

**Backend Team** (separate) will implement Django REST API following `DJANGO_API_SPEC.md`

---

## 📋 What You Have (Frontend Complete)

### 1. **UI Pages - All Built**
| Page | File | Status |
|------|------|--------|
| M-Pesa Dashboard | `src/pages/MoneyMPesa.tsx` | ✅ Complete |
| Money (Forecast/Funding) | `src/pages/Money.tsx` | ✅ Complete |
| Compliance Shield | `src/pages/Compliance.tsx` | ✅ Complete |
| Agent Feed | `src/pages/AgentFeed.tsx` | ✅ Complete |
| Profile | `src/pages/Profile.tsx` | ✅ Complete |
| Home Dashboard | `src/pages/Home.tsx` | ✅ Complete |
| Onboarding | `src/pages/Onboarding.tsx` | ✅ Complete |

### 2. **API Layer - All Ready**
| File | Purpose | Lines |
|------|---------|-------|
| `src/types/api.ts` | TypeScript interfaces for all endpoints | 400+ |
| `src/lib/api-enhanced.ts` | API client with auth, errors, timeouts | 500+ |
| `src/hooks/useAgents.ts` | React hooks for Financial & Compliance agents | 400+ |
| `DJANGO_API_SPEC.md` | Complete API specification for backend | 800+ |

### 3. **Documentation - All Written**
| File | Purpose |
|------|---------|
| `FINANCIAL_AGENT_SETUP.md` | Step-by-step setup for Financial Agent |
| `BACKEND_INTEGRATION.md` | Integration guide for backend team |
| `FRONTEND_STATUS.md` | Complete status report |
| `.env.example` | Environment configuration template |

---

## 🚀 Next Steps (In Order)

### Step 1: Set Up Environment (5 minutes)

```bash
# 1. Copy environment template
cp .env.example .env

# 2. Edit .env file
# Set: REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
# (Backend will run on port 8000 when ready)

# 3. Install dependencies (if not already done)
npm install

# 4. Start development server
npm start
# Opens http://localhost:3000
```

### Step 2: Test Current UI (10 minutes)

```bash
# With npm start running, test these pages:
# 1. http://localhost:3000 - Home (should work with mock data)
# 2. http://localhost:3000/money - Money page
# 3. http://localhost:3000/compliance - Compliance page
# 4. http://localhost:3000/feed - Agent Feed

# All pages should display with mock data
# This confirms frontend is working
```

### Step 3: Build n8n Workflows (Your Focus - Start Now!)

You can start building n8n workflows **even before the backend is ready** using mock/test data.

#### **Financial Agent Workflows to Build:**

**Workflow 1: M-Pesa Transaction Sync** (Priority 1)
- **File to reference:** `FINANCIAL_AGENT_SETUP.md` (lines 200-260)
- **Trigger:** Webhook (when Safaricom sends transaction notification)
- **Actions:**
  1. Parse M-Pesa callback data
  2. Categorize transaction (revenue/inventory/salary/utilities)
  3. Save to Django backend (`POST /mpesa/transactions`)
  4. Post activity to feed (`POST /webhooks/n8n/activity`)

**Workflow 2: Daily Cash Flow Forecast** (Priority 2)
- **File to reference:** `FINANCIAL_AGENT_SETUP.md` (lines 265-350)
- **Trigger:** Cron (every day at 7:00 AM EAT)
- **Actions:**
  1. Fetch last 90 days transactions (`GET /mpesa/transactions`)
  2. Run Prophet ML model (Python script)
  3. Generate 21-day forecast
  4. Detect insights (surplus/gap)
  5. Save forecast (`POST /cashflow/forecast`)
  6. Post activity if insights found

**Workflow 3: Manual Sync** (Priority 3)
- **Trigger:** User clicks "Sync Now" button in UI
- **Actions:**
  1. Call Safaricom API to fetch latest transactions
  2. Process and save each transaction
  3. Return success response

#### **Compliance Agent Workflows to Build:**

**Workflow 4: Daily Compliance Check** (Priority 4)
- **Trigger:** Cron (every day at 6:00 AM EAT)
- **Actions:**
  1. Fetch all compliance items (`GET /compliance`)
  2. Check expiry dates (flag items with < 45 days left)
  3. Post alerts for expiring items
  4. Send WhatsApp/Email notifications

**Workflow 5: Document Expiry Tracker** (Priority 5)
- **Trigger:** Cron (every Monday at 8:00 AM EAT)
- **Actions:**
  1. Check KRA iTax portal for TCC status (web scraping)
  2. Check County portal for license status (web scraping)
  3. Update compliance status in Django
  4. Post activity if status changed

### Step 4: Backend Integration (Parallel - Backend Team)

**Backend team tasks** (from `DJANGO_API_SPEC.md`):

**Week 1: Authentication & Setup**
- [ ] Django + DRF setup
- [ ] PostgreSQL database
- [ ] JWT authentication
- [ ] CORS configuration
- [ ] `/health` endpoint
- [ ] `/auth/signup` endpoint

**Week 2: Financial Agent Endpoints**
- [ ] Safaricom Daraja API integration
- [ ] `/mpesa/status` endpoint
- [ ] `/mpesa/connect` endpoint
- [ ] `/mpesa/sync` endpoint
- [ ] `/mpesa/transactions` endpoint
- [ ] `/webhooks/safaricom/callback` endpoint

**Week 3: Cash Flow & Compliance**
- [ ] `/cashflow/forecast` endpoint (with Prophet ML)
- [ ] `/cashflow/log-cash` endpoint
- [ ] `/compliance` CRUD endpoints
- [ ] `/compliance/upload-document` endpoint
- [ ] Document storage (AWS S3)

**Week 4: Agent Activities & Funding**
- [ ] `/activities` CRUD endpoints
- [ ] `/webhooks/n8n/activity` endpoint
- [ ] `/funding/opportunities` endpoint
- [ ] `/funding/match` endpoint

### Step 5: Connect Frontend to Backend (After Backend Ready)

**Example: Update Money Page**

**Current code (mock data):**
```typescript
// src/pages/Money.tsx
import { MOCK_CASHFLOW_DATA } from '../lib/mock-data';

export function Money({ language }: MoneyProps) {
  const chartData = MOCK_CASHFLOW_DATA;
  // ... render chart
}
```

**Updated code (real API):**
```typescript
// src/pages/Money.tsx
import { useCashFlowForecast } from '../hooks/useAgents';

export function Money({ language }: MoneyProps) {
  const { data: forecast, loading, error } = useCashFlowForecast(21);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert error={error} language={language} />;

  const chartData = forecast?.data_points || [];
  // ... render chart with real data
}
```

**Files to update (after backend ready):**
- `src/pages/Money.tsx` - Replace `MOCK_CASHFLOW_DATA` with `useCashFlowForecast()`
- `src/pages/MoneyMPesa.tsx` - Replace hardcoded data with `useMPesaTransactions()`
- `src/pages/Compliance.tsx` - Replace `MOCK_COMPLIANCE_STATUS` with `useComplianceStatus()`
- `src/pages/AgentFeed.tsx` - Replace `MOCK_AGENT_ACTIVITIES` with `useAgentActivities()`

---

## 🛠️ Tools You Need

### For n8n Development:
```bash
# Install n8n
npm install -g n8n

# Start n8n
n8n start

# Access n8n UI
# Open http://localhost:5678
```

### For Prophet Forecasting (Python):
```bash
# Install Prophet
pip install prophet pandas

# Use script from FINANCIAL_AGENT_SETUP.md (lines 390-450)
```

### For Testing APIs:
```bash
# Use curl or Postman

# Example: Test health endpoint (once backend is ready)
curl http://localhost:8000/api/v1/health

# Example: Test M-Pesa status
curl http://localhost:8000/api/v1/mpesa/status \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📊 Timeline & Priorities

### **Week 1-2: Current Phase**
- ✅ Frontend UI (DONE)
- ✅ API types & hooks (DONE)
- 🔄 **YOU:** Start n8n workflows (can use mock data)
- 🔄 **Backend:** Django setup + authentication

### **Week 3-4: Financial Agent**
- 🔄 **Backend:** M-Pesa endpoints + Safaricom integration
- 🔄 **YOU:** Finish n8n Financial Agent workflows
- 🔄 **YOU:** Connect frontend Money pages to real API

### **Week 5-6: Compliance Agent**
- 🔄 **Backend:** Compliance endpoints
- 🔄 **YOU:** Build n8n Compliance Agent workflows
- 🔄 **YOU:** Connect frontend Compliance page to real API

### **Week 7-8: Testing & Launch**
- 🔄 **Everyone:** Integration testing
- 🔄 **Everyone:** Bug fixes
- 🔄 **Everyone:** Deploy to staging
- 🔄 **Everyone:** Deploy to production

---

## 📞 Who to Contact

### Frontend Questions (TypeScript, React, Hooks):
- **You** (Frontend Developer)
- Reference: `src/hooks/useAgents.ts`, `src/types/api.ts`

### Backend Questions (Django endpoints, database):
- **Backend Team**
- Reference: `DJANGO_API_SPEC.md`, `BACKEND_INTEGRATION.md`

### n8n Workflow Questions:
- **You** (n8n Developer)
- Reference: `FINANCIAL_AGENT_SETUP.md`, `DJANGO_API_SPEC.md`

### M-Pesa/Safaricom Integration:
- **Backend Team** (handles Daraja API)
- **You** (handles webhook processing in n8n)

---

## 🎯 Success Criteria

### Financial Agent Complete When:
- [x] Frontend pages built (DONE)
- [x] API hooks ready (DONE)
- [ ] n8n workflows deployed
- [ ] Django endpoints deployed
- [ ] Frontend connected to real API
- [ ] End-to-end test: User sees real M-Pesa transactions in UI
- [ ] End-to-end test: Cash flow forecast updates daily

### Compliance Agent Complete When:
- [x] Frontend page built (DONE)
- [x] API hooks ready (DONE)
- [ ] n8n workflows deployed
- [ ] Django endpoints deployed
- [ ] Frontend connected to real API
- [ ] End-to-end test: User sees compliance status in UI
- [ ] End-to-end test: Expiring licenses trigger alerts

---

## 🚨 Common Issues & Solutions

### Issue 1: "npm start" fails
```bash
# Solution: Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Issue 2: "API endpoint not found (404)"
- **Cause:** Backend not running or endpoint not implemented yet
- **Solution:** Check if backend is running on port 8000, or use mock data temporarily

### Issue 3: "CORS error in browser console"
- **Cause:** Backend CORS not configured for `http://localhost:3000`
- **Solution:** Backend team needs to add CORS settings (see `BACKEND_INTEGRATION.md` line 180)

### Issue 4: "n8n workflow not triggering"
- **Cause:** Webhook URL incorrect or n8n not running
- **Solution:** Verify webhook URL in n8n UI, ensure n8n is running on port 5678

---

## 📚 Key Files Quick Reference

| When You Need... | Open This File... |
|------------------|-------------------|
| API endpoint details | `DJANGO_API_SPEC.md` |
| How to use API hooks | `src/hooks/useAgents.ts` (lines 1-50 for examples) |
| TypeScript types for requests/responses | `src/types/api.ts` |
| n8n workflow design | `FINANCIAL_AGENT_SETUP.md` (lines 200-450) |
| Backend integration steps | `BACKEND_INTEGRATION.md` |
| Environment variables | `.env.example` |
| Current project status | `FRONTEND_STATUS.md` |

---

## ✅ Your Immediate Action Items

1. **Today:** Read `FINANCIAL_AGENT_SETUP.md` fully
2. **Today:** Install n8n (`npm install -g n8n`)
3. **Tomorrow:** Start building "M-Pesa Transaction Sync" workflow in n8n
4. **This Week:** Complete all 3 Financial Agent workflows
5. **Next Week:** Wait for backend M-Pesa endpoints, then integrate
6. **Week After:** Start Compliance Agent workflows

---

## 🎉 You're Ready!

Everything is set up for you to start building the n8n agent workflows. The frontend is 100% complete and waiting for your n8n agents to bring it to life!

**Start with:** `FINANCIAL_AGENT_SETUP.md` → Section "n8n Workflow Design" (line 200)

Good luck! 🚀💰🛡️
