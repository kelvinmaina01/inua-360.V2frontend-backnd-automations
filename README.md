
# Inua360 v2.0

_The Modular AI Platform for Powering Kenyan SMEs_

[View Full System Flowchart (Figma)](https://www.figma.com/board/WZNrTep7rRtcd8RqfY8kYp/Inua360-Flowchart-%E2%80%93-Large-Font-Version?node-id=0-1&t=22zHiob5CcUMuqDS-1)

---

## Vision

Inua360 v2.0 is a modular AI-powered platform that automatically constructs comprehensive 360° profiles for small and medium enterprises (SMEs) in Kenya. These living profiles power a suite of intelligent agents—across funding, compliance, sales, marketing, finance, and HR—to discover opportunities, automate key processes, and drive measurable ROI for growing businesses.

---

## Core Goals

- **Generate actionable SME profiles:** Dynamic scoring, signals, and insights.
- **Automate discovery and applications:** Match businesses to funding and opportunities.
- **Proactive compliance monitoring:** Real-time alerts and proactive checks.
- **Business process automation:** Integrate profile insights into marketing, sales, and finance automation.

---

## High-Level System Architecture

- **Frontend:** React (mobile-first), Tailwind UI, Localized (Swahili & English)
- **API & Backend:** Node.js (TypeScript, NestJS) _or_ Python (FastAPI) microservices
- **Datastore:** MongoDB (profiles), PostgreSQL (users/transactions/meta), Amazon S3 (file storage)
- **ML Infrastructure:** Python, scikit-learn, XGBoost, Prophet, PyTorch, MLflow registry for model management
- **Orchestration:** n8n (external workflows), Airflow/Prefect (data pipelines)
- **Authentication:** Supabase/Auth0; OTP via Africa’s Talking or Twilio
- **Deployment:** Vercel (frontend), Dockerized microservices on AWS/GCP/DigitalOcean
- **Monitoring:** Sentry, Prometheus, Grafana, data-drift tools (NannyML)

---

## Modular Agents

Each Agent comprises:
- Dedicated microservice
- User interface
- Workflow automation (n8n)
- Machine learning models (where applicable)

### **1. Profile Builder Agent (Core)**
- **Role:** Ingests, normalizes, enriches, and scores SME data.
- **Features:** Data ingestion (forms, CSV, M-Pesa, PDFs), feature engineering, profile scoring.

### **2. Funding Agent**
- **Role:** Discovers funding, matches, manages applications & follow-up.
- **Features:** Opportunity matching, funding feeds, pitch deck generation, M-Pesa integration, budget management.

### **3. Compliance Agent**
- **Role:** Keeps SMEs tax/license/sector compliant.
- **Features:** Checklists, reg-scraping, auto pre-fill, alerts, KRA/BRS integration.

### **4. Sales Agent**
- **Role:** Drives revenue growth via operational sales actions.
- **Features:** Lead scoring, CRM sync, WhatsApp/SMS hooks, sales playbooks.

### **5. Marketing Agent**
- **Role:** Facilitates customer acquisition and campaign automation.
- **Features:** Audience segmentation, campaign deployment (SMS/WhatsApp/Meta Ads), ROI forecasting.

### **6. Finance Agent**
- **Role:** Ensures healthy finances and lending readiness.
- **Features:** Cashflow forecasting, invoice tracking, budgeting, financial reporting.

### **7. HR Agent**
- **Role:** Manages staff compliance, hiring, and cost forecasting.
- **Features:** Payroll compliance, cost-per-hire analytics, grant-ready reporting.

### **8. Insights/Advisory Agent**
- **Role:** Provides recommendations, next actions, and strategy roadmaps.

---

## Data Flow

1. **Ingestion:** Forms, CSVs, M-Pesa, accounting exports, scraped public data
2. **Normalization & Enrichment**
3. **Profile Storage (MongoDB)**
4. **Scoring & Explanation (ML Models)**
5. **Agent Actions:** UI, automated actions, notifications
6. **Logs, Monitoring, and Model Retraining**

---

## Machine Learning Model Ecosystem

- **Feature Engineering:** Revenue, invoice stats, staff costs, customer repeat rates, macro trends.
- **Model List:**
    - Health Score (XGBoost)
    - Growth Predictor (Prophet + XGBoost)
    - Funding Match (LightGBM)
    - Compliance Risk (XGBoost)
    - Lead Scoring (Logistic regression/XGBoost)
    - Churn Prediction (Survival analysis)
    - Segmentation (HDBSCAN, KMeans)
    - Spend Categorization (NLP)
    - Document Verification (OCR + ML)
- **Training Loop:** Ingest → validate → featurize → train/test split → cross-validation → model registry → deploy → monitor → retrain.
- **Explainability:** SHAP (tabular), LIME/attention (NLP).
- **Monitoring:** Threshold drift triggers, weekly retraining.

---

## n8n Automations (Sample Workflows)

- Onboard CSV → Profile Creation → Enrichment
- M-Pesa Transaction → Attach to Profile → Re-score
- Funding Feed Ingest → Match Opportunities → Notify User
- Compliance Regulation Scrape → Alert
- Campaign Planning & Deployment

---

## Deployment & Monitoring

- **Frontend:** Vercel (React)
- **Backend/Services:** Docker containers (AWS/GCP/DigitalOcean)
- **Monitoring:** Sentry (errors), Prometheus & Grafana (metrics), NannyML (data/model drift)

---

## Quick Start (Coming Soon)

Instructions for environment setup, deployment, and contributing will be provided soon.

---

## Contribution

Pull requests and suggestions are welcome! For major changes, please open an issue first to discuss your ideas.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Acknowledgements

- [Africa’s Talking](https://africastalking.com/)
- [n8n](https://n8n.io/)
- [MLflow](https://mlflow.org/)
- [Supabase](https://supabase.com/)

---

## Contact

For questions or demo requests, please contact the maintainer or raise a GitHub issue.


