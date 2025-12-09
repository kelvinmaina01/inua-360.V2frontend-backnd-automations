# Inua360 Django API Specification
**Version:** 1.0
**Date:** December 2025
**Backend Framework:** Django REST Framework
**Frontend Integration:** React TypeScript + n8n Agents

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Authentication](#authentication)
3. [Financial Agent Endpoints](#financial-agent-endpoints)
4. [Compliance Agent Endpoints](#compliance-agent-endpoints)
5. [Agent Activity Feed](#agent-activity-feed)
6. [Funding Navigator Endpoints](#funding-navigator-endpoints)
7. [Data Models](#data-models)
8. [Webhook Endpoints (n8n Integration)](#webhook-endpoints-n8n-integration)
9. [Error Handling](#error-handling)

---

## Architecture Overview

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   React     │◄────►│   Django     │◄────►│   n8n       │
│   Frontend  │ REST │   Backend    │ JSON │   Agents    │
│             │      │   (DRF)      │      │             │
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  PostgreSQL  │
                     │   Database   │
                     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  Safaricom   │
                     │  M-Pesa API  │
                     └──────────────┘
```

### Base URL
```
Production: https://api.inua360.co.ke/v1
Development: http://localhost:8000/api/v1
```

### Authentication
All endpoints (except `/auth/*`) require Bearer token authentication:
```
Authorization: Bearer <access_token>
```

---

## Authentication

### POST `/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "email": "jane@example.com",
  "password": "SecurePass123!",
  "name": "Jane Wanjiku",
  "phone": "+254712345678"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": "uuid-here",
    "email": "jane@example.com",
    "name": "Jane Wanjiku",
    "phone": "+254712345678",
    "created_at": "2025-12-09T10:30:00Z"
  },
  "token": {
    "access_token": "eyJhbGciOiJIUzI1...",
    "refresh_token": "eyJhbGciOiJIUzI1...",
    "expires_in": 3600
  }
}
```

---

## Financial Agent Endpoints

### GET `/mpesa/status`
Get current M-Pesa connection status.

**Response (200 OK):**
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

### POST `/mpesa/connect`
Connect M-Pesa account via OAuth.

**Request Body:**
```json
{
  "phone_number": "+254712345678",
  "account_type": "till",
  "till_number": "5834001",
  "oauth_code": "auth_code_from_safaricom"
}
```

**Response (200 OK):**
```json
{
  "status": "connected",
  "message": "M-Pesa account connected successfully",
  "connection_id": "uuid-here",
  "account_details": {
    "type": "till",
    "number": "5834001",
    "name": "Mama Fua Laundry"
  }
}
```

### POST `/mpesa/sync`
Trigger manual sync of M-Pesa transactions.

**Response (200 OK):**
```json
{
  "sync_id": "uuid-here",
  "status": "processing",
  "message": "Sync initiated. Transactions will be updated in 2-5 minutes.",
  "estimated_completion": "2025-12-09T10:33:00Z"
}
```

### GET `/mpesa/transactions`
Get M-Pesa transaction history.

**Query Parameters:**
- `start_date` (optional): ISO date string (default: 90 days ago)
- `end_date` (optional): ISO date string (default: today)
- `type` (optional): `inflow` | `outflow` | `all` (default: all)
- `limit` (optional): number (default: 100)
- `offset` (optional): number (default: 0)

**Response (200 OK):**
```json
{
  "transactions": [
    {
      "id": "uuid-here",
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
    },
    {
      "id": "uuid-here",
      "transaction_id": "RFK8HMXY8Y",
      "type": "outflow",
      "amount": 15000,
      "currency": "KES",
      "timestamp": "2025-12-09T08:30:00Z",
      "recipient_phone": "+254733444555",
      "recipient_name": "MARY SUPPLIER",
      "reference": "Stock purchase",
      "balance_after": 1844700,
      "category": "inventory",
      "agent_categorized": true
    }
  ],
  "pagination": {
    "total": 1247,
    "limit": 100,
    "offset": 0,
    "has_more": true
  },
  "summary": {
    "total_inflow": 2800000,
    "total_outflow": 1900000,
    "net": 900000,
    "period": "30_days"
  }
}
```

### GET `/cashflow/forecast`
Get AI-generated cash flow forecast.

**Query Parameters:**
- `days` (optional): 21 | 90 (default: 21)

**Response (200 OK):**
```json
{
  "forecast_id": "uuid-here",
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
    },
    {
      "date": "2025-12-11",
      "predicted_inflow": 98000,
      "predicted_outflow": 49500,
      "net_cashflow": 48500,
      "cumulative": 1942700,
      "confidence_lower": 43000,
      "confidence_upper": 54000
    }
  ],
  "insights": [
    {
      "type": "surplus",
      "severity": "info",
      "message": "KES 680k surplus expected in 21 days",
      "recommendation": "Consider moving KES 200k to savings account",
      "agent": "cashflow"
    },
    {
      "type": "gap",
      "severity": "warning",
      "message": "Potential KES 800k shortfall in January 2026",
      "recommendation": "Explore funding opportunities now",
      "agent": "cashflow",
      "action_link": "/funding/opportunities"
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

### POST `/cashflow/log-cash`
Log cash sale (non-M-Pesa transaction).

**Request Body:**
```json
{
  "amount": 5000,
  "currency": "KES",
  "description": "Cash sale - laundry services",
  "timestamp": "2025-12-09T10:15:00Z",
  "category": "revenue"
}
```

**Response (201 Created):**
```json
{
  "transaction_id": "uuid-here",
  "amount": 5000,
  "recorded_at": "2025-12-09T10:30:00Z",
  "message": "Cash sale logged successfully"
}
```

---

## Compliance Agent Endpoints

### GET `/compliance`
Get all compliance items with status.

**Response (200 OK):**
```json
{
  "score": 87,
  "last_checked": "2025-12-09T10:25:00Z",
  "summary": {
    "valid": 4,
    "expiring": 1,
    "expired": 0,
    "pending": 1,
    "total": 6
  },
  "items": [
    {
      "id": "uuid-here",
      "type": "kra_pin",
      "name": "KRA PIN Certificate",
      "name_swahili": "Cheti cha KRA PIN",
      "status": "valid",
      "required": true,
      "renewable": false,
      "pin_number": "A012345678K",
      "issued_date": "2022-03-15",
      "document_url": "https://storage.inua360.co.ke/docs/kra_pin_abc.pdf",
      "auto_tracker_enabled": true,
      "last_checked": "2025-12-09T06:00:00Z",
      "agent_notes": null
    },
    {
      "id": "uuid-here",
      "type": "county_license",
      "name": "County Business License",
      "name_swahili": "Leseni ya Biashara ya Kaunti",
      "status": "expiring",
      "required": true,
      "renewable": true,
      "renewal_period": "annual",
      "license_number": "NBR/2024/12345",
      "issued_date": "2024-01-15",
      "valid_until": "2025-01-15",
      "days_left": 37,
      "document_url": "https://storage.inua360.co.ke/docs/county_license_abc.pdf",
      "auto_tracker_enabled": true,
      "action_required": true,
      "last_checked": "2025-12-09T06:00:00Z",
      "agent_notes": "Renewal can be initiated now. Agent ready to proceed."
    },
    {
      "id": "uuid-here",
      "type": "kra_tcc",
      "name": "KRA Tax Compliance Certificate",
      "name_swahili": "Cheti cha Kodi KRA",
      "status": "pending",
      "required": true,
      "renewable": true,
      "renewal_period": "annual",
      "application_status": "submitted",
      "submitted_date": "2025-12-01",
      "expected_completion": "2025-12-15",
      "auto_tracker_enabled": true,
      "action_required": false,
      "last_checked": "2025-12-09T06:00:00Z",
      "agent_notes": "Application submitted. Tracking status on iTax portal."
    }
  ]
}
```

### POST `/compliance/{item_id}/renew`
Initiate renewal for a compliance item.

**Request Body:**
```json
{
  "auto_submit": false,
  "notification_method": ["email", "whatsapp"]
}
```

**Response (200 OK):**
```json
{
  "renewal_id": "uuid-here",
  "item_type": "county_license",
  "status": "initiated",
  "message": "Renewal process started. Agent will guide you through next steps.",
  "next_steps": [
    {
      "step": 1,
      "action": "document_collection",
      "description": "Upload required documents",
      "required_documents": ["business_permit", "id_copy", "proof_of_payment"],
      "status": "pending"
    },
    {
      "step": 2,
      "action": "payment",
      "description": "Pay renewal fee via M-Pesa",
      "amount": 10000,
      "paybill": "222222",
      "account_number": "RENEWAL123",
      "status": "pending"
    },
    {
      "step": 3,
      "action": "submission",
      "description": "Agent submits application to County portal",
      "estimated_duration": "2 hours",
      "status": "pending"
    }
  ],
  "estimated_completion": "2025-12-16T00:00:00Z"
}
```

### POST `/compliance/{item_id}/approve-agent`
Approve agent to proceed with compliance action.

**Request Body:**
```json
{
  "action": "renew" | "submit" | "pay",
  "approved": true,
  "notes": "Proceed with renewal"
}
```

**Response (200 OK):**
```json
{
  "approval_id": "uuid-here",
  "status": "approved",
  "message": "Agent approved to proceed with renewal",
  "agent_will_execute_at": "2025-12-09T11:00:00Z"
}
```

### POST `/compliance/{item_id}/toggle-tracker`
Enable/disable auto-tracker for a compliance item.

**Request Body:**
```json
{
  "enabled": true
}
```

**Response (200 OK):**
```json
{
  "item_id": "uuid-here",
  "auto_tracker_enabled": true,
  "message": "Auto-tracker enabled. Agent will monitor this item daily."
}
```

### POST `/compliance/upload-document`
Upload compliance document.

**Request (multipart/form-data):**
```
file: [binary]
item_id: "uuid-here"
document_type: "license_copy"
```

**Response (201 Created):**
```json
{
  "document_id": "uuid-here",
  "url": "https://storage.inua360.co.ke/docs/county_license_2025.pdf",
  "uploaded_at": "2025-12-09T10:30:00Z",
  "file_size": 245678,
  "mime_type": "application/pdf"
}
```

---

## Agent Activity Feed

### GET `/activities`
Get all agent activities across all agents.

**Query Parameters:**
- `agent_id` (optional): Filter by specific agent (e.g., `compliance`, `cashflow`, `funding`)
- `limit` (optional): number (default: 50)
- `offset` (optional): number (default: 0)
- `status` (optional): `success` | `warning` | `action_required` | `pending`

**Response (200 OK):**
```json
{
  "activities": [
    {
      "id": "uuid-here",
      "agent_id": "compliance",
      "agent_name": "Compliance Tracker",
      "agent_name_swahili": "Mfuatiliaji wa Sheria",
      "type": "compliance_check",
      "status": "warning",
      "priority": "high",
      "title": "County License Expiring Soon",
      "title_swahili": "Leseni ya Kaunti Inaisha Hivi Karibuni",
      "description": "Your County Business License expires in 37 days. Initiate renewal now to avoid penalties.",
      "description_swahili": "Leseni yako ya Biashara ya Kaunti itaisha katika siku 37. Anza kufufua sasa ili kuepuka adhabu.",
      "timestamp": "2025-12-09T06:00:00Z",
      "action_required": true,
      "action_link": "/compliance/county_license",
      "action_label": "Initiate Renewal",
      "action_label_swahili": "Anza Kufufua",
      "metadata": {
        "item_type": "county_license",
        "days_left": 37,
        "penalty_amount": 5000
      },
      "liked": false
    },
    {
      "id": "uuid-here",
      "agent_id": "financials",
      "agent_name": "Financials Agent",
      "agent_name_swahili": "Wakala wa Fedha",
      "type": "mpesa_sync",
      "status": "success",
      "priority": "low",
      "title": "M-Pesa Synced - 12 New Transactions",
      "title_swahili": "M-Pesa Imesawazishwa - Miamala 12 Mpya",
      "description": "Synced KES 142,500 in (8 transactions) and KES 67,000 out (4 transactions) from M-Pesa.",
      "description_swahili": "Imesawazisha KES 142,500 kuingia (miamala 8) na KES 67,000 kutoka (miamala 4) kutoka M-Pesa.",
      "timestamp": "2025-12-09T10:28:00Z",
      "action_required": false,
      "metadata": {
        "transactions_count": 12,
        "inflow": 142500,
        "outflow": 67000,
        "net": 75500
      },
      "liked": true
    }
  ],
  "pagination": {
    "total": 247,
    "limit": 50,
    "offset": 0,
    "has_more": true
  }
}
```

### POST `/activities/{activity_id}/like`
Like/unlike an agent activity.

**Request Body:**
```json
{
  "liked": true
}
```

**Response (200 OK):**
```json
{
  "activity_id": "uuid-here",
  "liked": true
}
```

### POST `/activities/create`
Create a manual activity (for n8n agents to post updates).

**Request Body:**
```json
{
  "agent_id": "cashflow",
  "type": "forecast_generated",
  "status": "success",
  "priority": "medium",
  "title": "21-Day Cash Flow Forecast Generated",
  "title_swahili": "Utabiri wa Mtiririko wa Fedha wa Siku 21 Umetengenezwa",
  "description": "New forecast shows KES 680k surplus. Consider savings optimization.",
  "description_swahili": "Utabiri mpya unaonyesha ziada ya KES 680k. Fikiria kuboresha akiba.",
  "action_required": false,
  "metadata": {
    "forecast_id": "uuid-here",
    "surplus": 680000
  }
}
```

**Response (201 Created):**
```json
{
  "activity_id": "uuid-here",
  "created_at": "2025-12-09T10:30:00Z"
}
```

---

## Funding Navigator Endpoints

### GET `/funding/opportunities`
Get matched funding opportunities.

**Query Parameters:**
- `status` (optional): `available` | `in_progress` | `submitted`
- `min_amount` (optional): number
- `max_amount` (optional): number

**Response (200 OK):**
```json
{
  "opportunities": [
    {
      "id": "uuid-here",
      "source_id": "kie",
      "source_name": "KIE - Kenya Industrial Estates",
      "source_name_swahili": "KIE",
      "source_logo": "🏭",
      "title": "SME Growth Loan",
      "title_swahili": "Mkopo wa Ukuaji wa Biashara Ndogo",
      "amount": 2000000,
      "currency": "KES",
      "match_score": 96,
      "status": "available",
      "deadline": "2026-01-31T23:59:59Z",
      "timeline": "3-6 months",
      "requirements": ["KRA PIN", "County License", "6 months bank statements", "Business plan"],
      "application_url": "https://kie.co.ke/apply",
      "description": "Low-interest loan for SMEs in manufacturing and retail sectors.",
      "interest_rate": 9.5,
      "repayment_period_months": 36,
      "agent_notes": "High match - your sector (retail) and revenue (KES 1.2M) meet criteria.",
      "discovered_at": "2025-12-09T08:00:00Z"
    }
  ],
  "summary": {
    "total_available": 4,
    "total_amount": 7500000,
    "highest_match": 96,
    "avg_match": 91
  }
}
```

### POST `/funding/match`
Trigger funding matching algorithm.

**Response (200 OK):**
```json
{
  "match_id": "uuid-here",
  "status": "completed",
  "matches_found": 4,
  "message": "Found 4 funding opportunities with 88-96% match",
  "execution_time_ms": 1250
}
```

### POST `/funding/apply/{opportunity_id}`
Start funding application process with agent assistance.

**Request Body:**
```json
{
  "auto_draft": true,
  "notification_method": ["email", "whatsapp"]
}
```

**Response (200 OK):**
```json
{
  "application_id": "uuid-here",
  "opportunity_id": "uuid-here",
  "status": "draft_in_progress",
  "message": "Application Assistant agent is preparing your application",
  "estimated_completion": "2025-12-09T12:00:00Z",
  "next_steps": [
    {
      "step": 1,
      "action": "document_collection",
      "status": "in_progress"
    },
    {
      "step": 2,
      "action": "application_draft",
      "status": "pending"
    }
  ]
}
```

---

## Data Models

### User Profile
```json
{
  "id": "uuid",
  "email": "string",
  "name": "string",
  "phone": "string",
  "business_name": "string",
  "sector": "retail" | "agriculture" | "juakali" | ...,
  "county": "nairobi" | "mombasa" | ...,
  "annual_revenue": "number",
  "employee_count": "number",
  "registration_date": "ISO date",
  "language_preference": "en" | "sw",
  "onboarding_completed": "boolean",
  "growth_score": "number (0-100)",
  "created_at": "ISO datetime",
  "updated_at": "ISO datetime"
}
```

### M-Pesa Transaction
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "transaction_id": "string",
  "type": "inflow" | "outflow",
  "amount": "number",
  "currency": "KES",
  "timestamp": "ISO datetime",
  "customer_phone": "string",
  "customer_name": "string",
  "reference": "string",
  "balance_after": "number",
  "category": "revenue" | "inventory" | "salary" | "utilities" | "other",
  "agent_categorized": "boolean",
  "mpesa_receipt": "string",
  "synced_at": "ISO datetime"
}
```

### Compliance Item
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "type": "kra_pin" | "kra_tcc" | "county_license" | ...,
  "status": "valid" | "expiring" | "expired" | "pending",
  "issued_date": "ISO date",
  "valid_until": "ISO date",
  "days_left": "number",
  "document_url": "string",
  "auto_tracker_enabled": "boolean",
  "action_required": "boolean",
  "last_checked": "ISO datetime",
  "next_check": "ISO datetime",
  "agent_notes": "string"
}
```

---

## Webhook Endpoints (n8n Integration)

### POST `/webhooks/n8n/activity`
n8n agents post activity updates here.

**Request Body:**
```json
{
  "agent_id": "cashflow",
  "workflow_id": "n8n-workflow-123",
  "type": "forecast_generated",
  "status": "success",
  "title": "Cash Flow Forecast Ready",
  "description": "21-day forecast generated with 87% confidence",
  "metadata": {
    "forecast_id": "uuid-here",
    "confidence": 0.87
  }
}
```

### POST `/webhooks/n8n/compliance-check`
n8n compliance agent posts check results.

**Request Body:**
```json
{
  "workflow_id": "n8n-workflow-compliance-daily",
  "checked_at": "2025-12-09T06:00:00Z",
  "items_checked": 6,
  "alerts": [
    {
      "item_id": "uuid-here",
      "type": "county_license",
      "alert_type": "expiring",
      "days_left": 37,
      "severity": "warning"
    }
  ]
}
```

### POST `/webhooks/safaricom/callback`
M-Pesa transaction callback from Safaricom (secured with IP whitelist).

**Request Body (example):**
```json
{
  "TransactionType": "Pay Bill",
  "TransID": "RFK8HMXY9Z",
  "TransTime": "20251209091500",
  "TransAmount": "2500.00",
  "BusinessShortCode": "5834001",
  "BillRefNumber": "INV001",
  "MSISDN": "254722111222",
  "FirstName": "JOHN",
  "LastName": "KAMAU"
}
```

---

## Error Handling

### Standard Error Response
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
    "request_id": "uuid-here"
  }
}
```

### Error Codes
- `VALIDATION_ERROR` (400) - Invalid request data
- `UNAUTHORIZED` (401) - Missing or invalid authentication token
- `FORBIDDEN` (403) - User doesn't have permission
- `NOT_FOUND` (404) - Resource not found
- `MPESA_CONNECTION_ERROR` (503) - M-Pesa service unavailable
- `AGENT_PROCESSING_ERROR` (500) - n8n agent workflow failed
- `RATE_LIMIT_EXCEEDED` (429) - Too many requests

---

## Rate Limiting
- Authentication endpoints: 5 requests/minute
- Data retrieval (GET): 100 requests/minute
- Data mutation (POST/PUT): 30 requests/minute
- Webhook endpoints: 1000 requests/minute

---

## Notes for Backend Team

### Priority Implementation Order:
1. **Authentication** - User signup/login (Week 1)
2. **M-Pesa Integration** - Status, transactions, sync (Week 2-3)
3. **Compliance Agent** - CRUD + auto-tracker (Week 3-4)
4. **Cash Flow Forecasting** - Prophet model integration (Week 4-5)
5. **Funding Navigator** - Matching algorithm (Week 5-6)
6. **n8n Webhooks** - Agent activity posting (Week 6)

### Kenyan-Specific Considerations:
- **M-Pesa OAuth**: Use Safaricom Daraja API v2.0
- **KRA Integration**: Use iTax API for TCC status checks (if available)
- **County Portals**: Web scraping may be required (no unified API)
- **Phone Numbers**: Always validate Kenyan format (+254XXXXXXXXX)
- **Currency**: All amounts in KES (Kenyan Shillings)
- **Time Zone**: Use Africa/Nairobi (EAT, UTC+3)
- **Business Hours**: Consider Kenyan working hours (8am-5pm EAT) for agent actions

### Security:
- Use Django REST Framework JWT authentication
- Implement CORS for React frontend
- Rate limiting using Django REST Framework throttling
- M-Pesa webhooks: IP whitelist Safaricom servers
- Store sensitive credentials (M-Pesa keys) in environment variables
- Encrypt compliance documents at rest (AWS S3 or similar)

### Database Indexes:
- `mpesa_transactions`: Index on `user_id`, `timestamp`, `type`
- `compliance_items`: Index on `user_id`, `status`, `valid_until`
- `activities`: Index on `user_id`, `agent_id`, `timestamp`

---

**Last Updated:** December 9, 2025
**Frontend Contact:** [Your Name]
**Backend Team:** Django/DRF Developers
**n8n Workflow Architect:** TBD
