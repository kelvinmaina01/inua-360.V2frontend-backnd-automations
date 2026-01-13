<p align="center">
  <img src="https://img.shields.io/badge/🇰🇪-Made%20for%20Kenya-black?style=for-the-badge" alt="Made for Kenya">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Django-5.0-092E20?style=for-the-badge&logo=django" alt="Django">
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
</p>

<h1 align="center">
  <img src="https://em-content.zobj.net/source/apple/391/rocket_1f680.png" width="32"> Inua 360
</h1>

<p align="center">
  <strong>Kenya's First Autonomous AI Co-Pilot for SMEs</strong><br>
  <em>Funding • Compliance • Financial Intelligence</em>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-agents">Agents</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-documentation">Documentation</a>
</p>

---

## 🎯 What is Inua 360?

Inua 360 is an AI-powered platform that helps Kenyan SMEs:

- **Secure funding** from Hustler Fund, KIE, Women Fund, and more
- **Stay compliant** with KRA, TCC, County Licenses, NSSF/NHIF
- **Forecast cash flow** using M-Pesa transaction data
- **Make smarter decisions** with financial KPIs and insights

> 💡 Think of it as having a CFO, compliance officer, and loan broker in your pocket—powered by AI, speaking Swahili, and integrated with M-Pesa.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Loan Readiness Score** | 0-100 score showing how ready you are to get a loan |
| **Lender Matching** | Automatically matched to KIE, Hustler Fund, Women Fund |
| **Compliance Tracking** | KRA PIN, TCC, County License, NSSF/NHIF status |
| **Cash Flow Forecast** | 21-day and 90-day predictions using ML |
| **M-Pesa Integration** | Real-time transaction sync and categorization |
| **Bilingual UI** | Full English and Swahili support |
| **Mobile-First** | Optimized for phones, works on desktop too |

---

## 🤖 Agents

Inua 360 runs on **7 autonomous AI agents**:

| Agent | Function |
|-------|----------|
| 🛡️ **Compliance Tracker** | Monitors license expiry, sends renewal alerts |
| 📱 **Financials Agent** | Syncs M-Pesa transactions, tracks balances |
| 📈 **Cash-Flow Forecaster** | Predicts future cash using Prophet ML |
| 💰 **Loan Readiness** | Calculates loan score, matches lenders |
| 🎯 **Funding Navigator** | Finds grant and loan opportunities |
| 🧱 **Profile Builder** | Creates your 360° business profile |
| 🤖 **Supervisor** | Orchestrates all agents |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│                  localhost:3000                          │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                Backend (Django + Celery)                 │
│                  localhost:8000                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │  REST API   │  │   Agents    │  │  Celery Tasks   │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└────────────┬──────────────┬────────────────┬────────────┘
             │              │                │
             ▼              ▼                ▼
       ┌──────────┐   ┌──────────┐    ┌──────────────┐
       │PostgreSQL│   │   Redis  │    │ ML Endpoints │
       └──────────┘   └──────────┘    └──────────────┘
```

---

## 🚀 Quick Start

### Frontend

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Backend (Coming Soon)

```bash
# Django backend setup will be added
# See BACKEND_SPEC.md for specifications
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [BACKEND_SPEC.md](./BACKEND_SPEC.md) | Database models, API endpoints, Celery setup |
| [AGENT_LOGIC.md](./AGENT_LOGIC.md) | Pseudocode for all agent tasks |
| [ML_INTEGRATION.md](./ML_INTEGRATION.md) | ML endpoint contracts |
| [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) | Architecture & build order |
| [DESIGN_SYSTEM.md](./src/DESIGN_SYSTEM.md) | UI/UX design system |

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS v4
- Shadcn/ui components
- Recharts (data viz)

**Backend**
- Django 5 + Django REST Framework
- Celery + Redis (scheduled tasks)
- PostgreSQL (database)

**ML** (Separate Team)
- XGBoost (loan scoring)
- Prophet (forecasting)
- NLP (transaction categorization)

---

## 📱 Screenshots

<p align="center">
  <em>Coming soon</em>
</p>

---

## 🤝 Team Structure

| Team | Responsibility |
|------|----------------|
| **Frontend** | React web app, UI/UX |
| **Backend** | Django API, Celery agents |
| **ML** | Model training & hosting |

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

<p align="center">
  <strong>Imetengenezwa kwa upendo kwa wajasiriamali wa Kenya 🇰🇪</strong><br>
  <em>Built with love for Kenyan entrepreneurs</em>
</p>
