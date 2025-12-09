# Backend Integration Guide - Inua360 Frontend
**For Django Backend Team**

---

## Overview

This frontend is **ready for backend integration**. All API endpoints are defined, typed, and exposed. The backend team needs to implement the Django REST API following the specification in `DJANGO_API_SPEC.md`.

---

## What's Ready on Frontend

### ✅ Complete
1. **API Type Definitions** (`src/types/api.ts`)
   - All request/response types matching Django spec
   - TypeScript interfaces for every endpoint
   - Error types and status codes

2. **Enhanced API Client** (`src/lib/api-enhanced.ts`)
   - Full REST client with timeout handling
   - Bearer token authentication
   - Error handling with user-friendly messages (EN/SW)
   - File upload support (compliance documents)
   - Query parameter handling

3. **React Hooks** (`src/hooks/useAgents.ts`)
   - `useFinancialAgent()` - M-Pesa, transactions, forecasting
   - `useComplianceAgent()` - Compliance tracking, renewals
   - `useAgentActivities()` - Activity feed
   - `useFundingOpportunities()` - Funding matching
   - All hooks with loading/error states

4. **UI Pages** (All designed and functional with mock data)
   - Money/Finance (`src/pages/Money.tsx`, `MoneyMPesa.tsx`)
   - Compliance (`src/pages/Compliance.tsx`)
   - Agent Feed (`src/pages/AgentFeed.tsx`)
   - Home Dashboard (`src/pages/Home.tsx`)
   - All other pages

---

## Backend Team Tasks

### Priority 1: Core Infrastructure (Week 1)
- [ ] Set up Django + Django REST Framework
- [ ] Configure PostgreSQL database
- [ ] Implement JWT authentication (Supabase or Django-specific)
- [ ] Set up CORS for React frontend
- [ ] Deploy `/health` endpoint
- [ ] Deploy `/auth/signup` endpoint

### Priority 2: Financial Agent (Week 2-3)
- [ ] Integrate Safaricom Daraja API (M-Pesa OAuth)
- [ ] Implement `/mpesa/*` endpoints (see DJANGO_API_SPEC.md lines 70-161)
- [ ] Set up webhook for M-Pesa callbacks (`/webhooks/safaricom/callback`)
- [ ] Implement transaction categorization logic
- [ ] Deploy `/cashflow/forecast` with Prophet model
- [ ] Deploy `/cashflow/log-cash` endpoint

### Priority 3: Compliance Agent (Week 3-4)
- [ ] Implement `/compliance` CRUD endpoints (lines 272-393)
- [ ] Set up document storage (AWS S3 or similar)
- [ ] Implement `/compliance/upload-document` (multipart/form-data)
- [ ] Build auto-tracker logic (daily cron job checking expiry dates)
- [ ] Integrate with KRA iTax API (if available) or web scraping
- [ ] Deploy renewal workflow endpoints

### Priority 4: n8n Integration (Week 4-5)
- [ ] Set up `/webhooks/n8n/activity` endpoint (lines 622-661)
- [ ] Configure n8n to post agent activities
- [ ] Deploy agent activity CRUD endpoints
- [ ] Set up daily compliance check workflow in n8n
- [ ] Set up cash flow forecast generation workflow

### Priority 5: Funding & Analytics (Week 5-6)
- [ ] Implement `/funding/*` endpoints (lines 395-490)
- [ ] Build funding matching algorithm
- [ ] Deploy `/analytics` endpoints
- [ ] Implement `/activities` feed endpoints

---

## How Frontend Connects to Backend

### 1. Environment Configuration

Create `.env` file in project root:

```env
# Backend API Base URL
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1

# Production
# REACT_APP_API_BASE_URL=https://api.inua360.co.ke/v1
```

Frontend will automatically use this URL for all API calls.

### 2. API Client Initialization

The API client is already configured in `src/lib/api-enhanced.ts`:

```typescript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';
export const apiClient = new ApiClient(API_BASE_URL);
```

### 3. Authentication Flow

Current auth flow (needs backend implementation):

```
1. User signs up → POST /auth/signup
2. Backend returns JWT tokens
3. Frontend stores tokens in Supabase auth (or localStorage)
4. All subsequent requests include: Authorization: Bearer <token>
```

### 4. Using API in Pages

Example: Replace mock data in Money page

**Current (Mock Data):**
```typescript
import { MOCK_FUNDING_OPPORTUNITIES } from '../lib/mock-data';

export function Money() {
  const opportunities = MOCK_FUNDING_OPPORTUNITIES;
  // ...
}
```

**After Backend Integration:**
```typescript
import { useFundingOpportunities } from '../hooks/useAgents';

export function Money() {
  const { data, loading, error } = useFundingOpportunities();
  const opportunities = data?.opportunities || [];

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  // ...
}
```

---

## Testing Backend Integration

### Step 1: Health Check

```bash
# Start Django backend on port 8000
python manage.py runserver

# Test health endpoint
curl http://localhost:8000/api/v1/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-12-09T10:30:00Z"
}
```

### Step 2: Test Frontend Connection

```bash
# In frontend directory
npm install
npm start

# Frontend will run on port 3000
# Check browser console for API calls
```

### Step 3: Verify CORS

Backend must allow requests from `http://localhost:3000`:

```python
# Django settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://inua360.co.ke",
]
```

### Step 4: Test Authentication

```bash
# Test signup
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "name": "Test User",
    "phone": "+254712345678"
  }'
```

Expected: Returns user object + JWT tokens

### Step 5: Test Protected Endpoint

```bash
# Get M-Pesa status
curl http://localhost:8000/api/v1/mpesa/status \
  -H "Authorization: Bearer <your_token_here>"
```

---

## Frontend Pages Ready for Backend

| Page | Mock Data File | Endpoints Needed | Priority |
|------|---------------|------------------|----------|
| Money (Forecast) | `MOCK_CASHFLOW_DATA` | `/cashflow/forecast` | HIGH |
| Money (Funding) | `MOCK_FUNDING_OPPORTUNITIES` | `/funding/opportunities` | HIGH |
| Compliance | `MOCK_COMPLIANCE_STATUS` | `/compliance` | HIGH |
| Agent Feed | `MOCK_AGENT_ACTIVITIES` | `/activities` | MEDIUM |
| Profile | `MOCK_PROFILE_DATA` | `/profile/:id` | MEDIUM |
| MoneyMPesa | Hardcoded data | `/mpesa/transactions`, `/mpesa/status` | HIGH |
| Home | Various mocks | `/activities`, `/analytics` | LOW |
| Chat | `MOCK_CHAT_MESSAGES` | `/chat` (future) | LOW |

---

## Kenyan-Specific Backend Requirements

### M-Pesa Integration

**Safaricom Daraja API:**
- Register at https://developer.safaricom.co.ke
- Get Consumer Key & Consumer Secret
- Implement OAuth 2.0 flow
- Set up C2B (Customer to Business) API
- Configure payment notifications webhook

**Required M-Pesa APIs:**
1. OAuth Token: `https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`
2. C2B Register URL: `https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl`
3. Transaction Status: `https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query`

### Compliance Integrations

**KRA iTax:**
- iTax portal: https://itax.kra.go.ke
- May require web scraping (no public API)
- Check TCC status via scraping

**County Portals:**
- Each county has different portal
- Nairobi: https://ecoboost.nairobi.go.ke (example)
- May require manual integration per county

### Phone Number Validation

```python
import re

def validate_kenyan_phone(phone: str) -> bool:
    """Validate Kenyan phone number (+254XXXXXXXXX)"""
    pattern = r'^\+254[17]\d{8}$'
    return bool(re.match(pattern, phone))
```

### Currency Formatting

```python
def format_kes(amount: int) -> str:
    """Format amount as KES 1,234,567"""
    return f"KES {amount:,}"
```

### Time Zone

All timestamps must be in **Africa/Nairobi** (EAT, UTC+3):

```python
from zoneinfo import ZoneInfo

NAIROBI_TZ = ZoneInfo("Africa/Nairobi")
```

---

## n8n Workflow Integration

### n8n Setup

1. Install n8n: `npm install -g n8n`
2. Start n8n: `n8n start`
3. Access UI: http://localhost:5678

### Workflow 1: Daily Compliance Check

**Trigger:** Cron (every day at 6:00 AM EAT)

**Steps:**
1. HTTP Request → GET `/compliance` (for all users)
2. Filter → Find items where `days_left < 45`
3. HTTP Request → POST `/webhooks/n8n/activity` (post alert)
4. Send notification → WhatsApp/Email

**Example n8n Node (HTTP Request):**
```json
{
  "method": "POST",
  "url": "http://localhost:8000/api/v1/webhooks/n8n/activity",
  "body": {
    "agent_id": "compliance",
    "type": "expiry_alert",
    "status": "warning",
    "title": "License expiring soon",
    "description": "County license expires in 37 days"
  }
}
```

### Workflow 2: M-Pesa Sync

**Trigger:** Webhook from Safaricom (on new transaction)

**Steps:**
1. Receive M-Pesa callback
2. HTTP Request → POST `/mpesa/transactions` (save transaction)
3. HTTP Request → POST `/webhooks/n8n/activity` (post activity)
4. Update user balance

### Workflow 3: Cash Flow Forecast

**Trigger:** Cron (every Monday at 7:00 AM EAT)

**Steps:**
1. HTTP Request → GET `/mpesa/transactions` (last 90 days)
2. Function → Run Prophet forecast (Python script)
3. HTTP Request → POST `/cashflow/forecast` (save forecast)
4. HTTP Request → POST `/webhooks/n8n/activity` (post update)

---

## Error Handling

Frontend handles these error codes (ensure backend returns them):

| Code | HTTP Status | Frontend Behavior |
|------|------------|-------------------|
| `VALIDATION_ERROR` | 400 | Shows field-specific errors |
| `UNAUTHORIZED` | 401 | Redirects to login |
| `FORBIDDEN` | 403 | Shows "Access denied" |
| `NOT_FOUND` | 404 | Shows "Not found" message |
| `MPESA_CONNECTION_ERROR` | 503 | Shows "M-Pesa unavailable" |
| `AGENT_PROCESSING_ERROR` | 500 | Shows "Agent error, try again" |
| `RATE_LIMIT_EXCEEDED` | 429 | Shows "Too many requests" |

**Example Django Error Response:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid phone number format",
    "details": {
      "field": "phone_number",
      "expected": "+254XXXXXXXXX"
    },
    "timestamp": "2025-12-09T10:30:00Z",
    "request_id": "abc-123"
  }
}
```

---

## API Documentation

Backend team should generate OpenAPI (Swagger) docs:

```python
# Install drf-spectacular
pip install drf-spectacular

# settings.py
INSTALLED_APPS = [
    ...
    'drf_spectacular',
]

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# urls.py
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
```

Access docs at: `http://localhost:8000/api/docs/`

---

## Deployment Checklist

### Frontend Deployment

- [ ] Build production bundle: `npm run build`
- [ ] Set `REACT_APP_API_BASE_URL` to production URL
- [ ] Deploy to Vercel/Netlify/AWS S3+CloudFront
- [ ] Configure custom domain

### Backend Deployment

- [ ] Deploy Django to AWS/Digital Ocean/Heroku
- [ ] Set up PostgreSQL (AWS RDS or similar)
- [ ] Configure environment variables (API keys, secrets)
- [ ] Set up HTTPS (Let's Encrypt)
- [ ] Configure CORS for production frontend domain
- [ ] Set up Sentry for error tracking
- [ ] Configure rate limiting (Django REST Framework throttling)
- [ ] Set up monitoring (Prometheus/Grafana or AWS CloudWatch)

---

## Questions for Backend Team?

**Contact Frontend Developer:**
- Name: [Your Name]
- Email: [Your Email]
- Slack: [Your Slack Handle]

**Key Documents:**
1. `DJANGO_API_SPEC.md` - Full API specification (endpoints, types, examples)
2. `src/types/api.ts` - TypeScript types matching API
3. `src/lib/api-enhanced.ts` - Frontend API client
4. `src/hooks/useAgents.ts` - React hooks for agents

---

## Next Steps

1. **Backend Team:** Implement endpoints following `DJANGO_API_SPEC.md`
2. **Frontend Team:** Replace mock data with API hooks page by page
3. **Both Teams:** Test integration locally first
4. **Both Teams:** Deploy to staging environment
5. **Both Teams:** Load testing and optimization
6. **Launch:** Deploy to production

---

**Last Updated:** December 9, 2025
**Frontend Status:** ✅ Ready for Integration
**Backend Status:** ⏳ Pending Implementation
