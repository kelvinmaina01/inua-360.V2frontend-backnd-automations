# Inua 360 - Onboarding API Endpoints

This document outlines the backend API endpoints required for the onboarding flow.

---

## Base URL
```
/api/v1
```

---

## 1. User Onboarding

### Create/Update Business Profile
```http
POST /onboarding/business-profile
```

**Request Body:**
```json
{
  "business_name": "Mama Fua Laundry",
  "sector": "retail",
  "county": "nairobi",
  "revenue_range": "50k_100k",
  "challenges": ["funding", "cashflow", "customers"],
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "profile_id": "uuid",
  "profile_completion": 65
}
```

---

### Connect M-Pesa Business Account
```http
POST /onboarding/mpesa/connect
```

**Request Body:**
```json
{
  "account_type": "till | paybill | pochi",
  "till_number": "123456",
  "paybill_number": null,
  "account_number": null,
  "pochi_phone": null
}
```

**Response:**
```json
{
  "success": true,
  "connection_status": "pending_verification",
  "verification_code_sent": true
}
```

---

### Set Notification Channel
```http
POST /onboarding/notifications/channel
```

**Request Body:**
```json
{
  "channel": "whatsapp | gmail | slack",
  "contact": "+254712345678"
}
```

**Response:**
```json
{
  "success": true,
  "verification_required": true,
  "verification_sent_to": "+254712345678"
}
```

---

### Enable Autonomy Mode
```http
POST /onboarding/autonomy/enable
```

**Request Body:**
```json
{
  "enabled": true,
  "agents": ["profile", "compliance", "funding", "cashflow", "application", "supervisor"]
}
```

**Response:**
```json
{
  "success": true,
  "agents_activated": 6,
  "supervisor_status": "active"
}
```

---

### Complete Onboarding
```http
POST /onboarding/complete
```

**Request Body:**
```json
{
  "business_profile": { ... },
  "mpesa_connected": true,
  "notification_channel": "whatsapp",
  "autonomy_enabled": true
}
```

**Response:**
```json
{
  "success": true,
  "user_id": "uuid",
  "dashboard_url": "/dashboard",
  "agents_status": {
    "profile": "active",
    "compliance": "active",
    "funding": "active",
    "cashflow": "active",
    "application": "active",
    "supervisor": "active"
  }
}
```

---

## 2. Agent Endpoints

### Get Agent Status
```http
GET /agents/{agent_id}/status
```

**Response:**
```json
{
  "agent_id": "profile",
  "name": "Profile Builder",
  "status": "active | idle | processing",
  "last_action": "2026-01-14T10:00:00Z",
  "pending_tasks": 3
}
```

---

### Get All Agents Status
```http
GET /agents/status
```

**Response:**
```json
{
  "agents": [
    { "id": "profile", "status": "active", "pending_tasks": 2 },
    { "id": "compliance", "status": "active", "pending_tasks": 1 },
    { "id": "funding", "status": "idle", "pending_tasks": 0 },
    { "id": "cashflow", "status": "processing", "pending_tasks": 1 },
    { "id": "application", "status": "active", "pending_tasks": 5 },
    { "id": "supervisor", "status": "active", "pending_tasks": 0 }
  ]
}
```

---

### Trigger Agent Action
```http
POST /agents/{agent_id}/trigger
```

**Request Body:**
```json
{
  "action": "scan_compliance | find_funding | update_profile | forecast_cashflow | prepare_application"
}
```

---

## 3. Notification Endpoints

### Send Notification
```http
POST /notifications/send
```

**Request Body:**
```json
{
  "channel": "whatsapp | gmail | slack",
  "type": "alert | approval_request | update",
  "title": "License Expiring Soon",
  "message": "Your county business license expires in 14 days",
  "action_url": "/compliance/renew/county_license"
}
```

---

### Get Notification Preferences
```http
GET /notifications/preferences
```

---

### Update Notification Preferences
```http
PATCH /notifications/preferences
```

**Request Body:**
```json
{
  "channel": "whatsapp",
  "frequency": "instant | daily_digest | weekly",
  "quiet_hours": { "start": "22:00", "end": "06:00" }
}
```

---

## 4. Webhooks (Incoming)

### WhatsApp Business API Webhook
```http
POST /webhooks/whatsapp
```

### Gmail Push Notifications
```http
POST /webhooks/gmail/push
```

### Slack Events API
```http
POST /webhooks/slack/events
```

---

## Authentication
All endpoints require JWT Bearer token:
```http
Authorization: Bearer <jwt_token>
```

---

## Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid revenue range",
    "details": { "field": "revenue_range", "allowed": ["below_10k", "10k_30k", ...] }
  }
}
```
