// Inua360 API Types - Matching Django Backend Specification
// Generated: December 2025

// ==================== AUTHENTICATION ====================

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface AuthResponse {
  user: User;
  token: TokenInfo;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  created_at: string;
}

export interface TokenInfo {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

// ==================== M-PESA / FINANCIAL AGENT ====================

export interface MPesaStatus {
  connected: boolean;
  account_type: 'till' | 'paybill' | 'wallet';
  till_number?: string;
  phone_number: string;
  last_sync: string;
  sync_status: 'success' | 'failed' | 'pending';
  balance: {
    till: number;
    wallet: number;
    cash_in_hand: number;
  };
}

export interface MPesaConnectRequest {
  phone_number: string;
  account_type: 'till' | 'paybill' | 'wallet';
  till_number?: string;
  oauth_code: string;
}

export interface MPesaConnectResponse {
  status: 'connected' | 'pending' | 'failed';
  message: string;
  connection_id: string;
  account_details: {
    type: string;
    number: string;
    name: string;
  };
}

export interface MPesaSyncResponse {
  sync_id: string;
  status: 'processing' | 'completed' | 'failed';
  message: string;
  estimated_completion: string;
}

export interface MPesaTransaction {
  id: string;
  transaction_id: string;
  type: 'inflow' | 'outflow';
  amount: number;
  currency: 'KES';
  timestamp: string;
  customer_phone?: string;
  customer_name?: string;
  recipient_phone?: string;
  recipient_name?: string;
  reference: string;
  balance_after: number;
  category: 'revenue' | 'inventory' | 'salary' | 'utilities' | 'other';
  agent_categorized: boolean;
  mpesa_receipt?: string;
}

export interface TransactionsResponse {
  transactions: MPesaTransaction[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
  };
  summary: {
    total_inflow: number;
    total_outflow: number;
    net: number;
    period: string;
  };
}

export interface CashFlowForecast {
  forecast_id: string;
  generated_at: string;
  period_days: 21 | 90;
  model_version: string;
  confidence_score: number;
  data_points: ForecastDataPoint[];
  insights: ForecastInsight[];
  summary: {
    total_predicted_inflow: number;
    total_predicted_outflow: number;
    net_profit: number;
    growth_rate: number;
  };
}

export interface ForecastDataPoint {
  date: string;
  predicted_inflow: number;
  predicted_outflow: number;
  net_cashflow: number;
  cumulative: number;
  confidence_lower: number;
  confidence_upper: number;
}

export interface ForecastInsight {
  type: 'surplus' | 'gap' | 'opportunity' | 'risk';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  recommendation: string;
  agent: string;
  action_link?: string;
}

export interface LogCashRequest {
  amount: number;
  currency: 'KES';
  description: string;
  timestamp: string;
  category: 'revenue' | 'expense';
}

export interface LogCashResponse {
  transaction_id: string;
  amount: number;
  recorded_at: string;
  message: string;
}

// ==================== COMPLIANCE AGENT ====================

export interface ComplianceStatus {
  score: number;
  last_checked: string;
  summary: {
    valid: number;
    expiring: number;
    expired: number;
    pending: number;
    total: number;
  };
  items: ComplianceItem[];
}

export interface ComplianceItem {
  id: string;
  type: 'kra_pin' | 'kra_tcc' | 'county_license' | 'nssf' | 'nhif' | 'fire' | 'food';
  name: string;
  name_swahili: string;
  status: 'valid' | 'expiring' | 'expired' | 'pending';
  required: boolean;
  renewable: boolean;
  renewal_period?: 'annual' | 'biannual';

  // Valid items
  pin_number?: string;
  license_number?: string;
  issued_date?: string;
  valid_until?: string;
  days_left?: number;

  // Pending items
  application_status?: 'submitted' | 'processing' | 'approved';
  submitted_date?: string;
  expected_completion?: string;

  // Common
  document_url?: string;
  auto_tracker_enabled: boolean;
  action_required: boolean;
  last_checked: string;
  agent_notes?: string;
}

export interface RenewalRequest {
  auto_submit: boolean;
  notification_method: ('email' | 'whatsapp' | 'sms')[];
}

export interface RenewalResponse {
  renewal_id: string;
  item_type: string;
  status: 'initiated' | 'in_progress' | 'completed';
  message: string;
  next_steps: RenewalStep[];
  estimated_completion: string;
}

export interface RenewalStep {
  step: number;
  action: 'document_collection' | 'payment' | 'submission' | 'verification';
  description: string;
  required_documents?: string[];
  amount?: number;
  paybill?: string;
  account_number?: string;
  estimated_duration?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface ApproveAgentRequest {
  action: 'renew' | 'submit' | 'pay';
  approved: boolean;
  notes?: string;
}

export interface ApproveAgentResponse {
  approval_id: string;
  status: 'approved' | 'denied';
  message: string;
  agent_will_execute_at?: string;
}

export interface ToggleTrackerRequest {
  enabled: boolean;
}

export interface ToggleTrackerResponse {
  item_id: string;
  auto_tracker_enabled: boolean;
  message: string;
}

export interface DocumentUploadResponse {
  document_id: string;
  url: string;
  uploaded_at: string;
  file_size: number;
  mime_type: string;
}

// ==================== AGENT ACTIVITIES ====================

export interface AgentActivity {
  id: string;
  agent_id: 'profile' | 'compliance' | 'funding' | 'cashflow' | 'application' | 'supervisor' | 'financials' | 'tender';
  agent_name: string;
  agent_name_swahili: string;
  type: string;
  status: 'success' | 'warning' | 'action_required' | 'pending' | 'error';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  title_swahili: string;
  description: string;
  description_swahili: string;
  timestamp: string;
  action_required: boolean;
  action_link?: string;
  action_label?: string;
  action_label_swahili?: string;
  metadata?: Record<string, any>;
  liked: boolean;
}

export interface ActivitiesResponse {
  activities: AgentActivity[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
  };
}

export interface CreateActivityRequest {
  agent_id: string;
  type: string;
  status: 'success' | 'warning' | 'action_required' | 'pending' | 'error';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  title_swahili: string;
  description: string;
  description_swahili: string;
  action_required: boolean;
  metadata?: Record<string, any>;
}

export interface CreateActivityResponse {
  activity_id: string;
  created_at: string;
}

export interface LikeActivityRequest {
  liked: boolean;
}

export interface LikeActivityResponse {
  activity_id: string;
  liked: boolean;
}

// ==================== FUNDING NAVIGATOR ====================

export interface FundingOpportunity {
  id: string;
  source_id: string;
  source_name: string;
  source_name_swahili: string;
  source_logo: string;
  title: string;
  title_swahili: string;
  amount: number;
  currency: 'KES';
  match_score: number;
  status: 'available' | 'in_progress' | 'submitted';
  deadline: string;
  timeline: string;
  requirements: string[];
  application_url?: string;
  description: string;
  interest_rate?: number;
  repayment_period_months?: number;
  agent_notes?: string;
  discovered_at: string;
}

export interface FundingOpportunitiesResponse {
  opportunities: FundingOpportunity[];
  summary: {
    total_available: number;
    total_amount: number;
    highest_match: number;
    avg_match: number;
  };
}

export interface FundingMatchResponse {
  match_id: string;
  status: 'completed' | 'processing' | 'failed';
  matches_found: number;
  message: string;
  execution_time_ms: number;
}

export interface FundingApplicationRequest {
  auto_draft: boolean;
  notification_method: ('email' | 'whatsapp' | 'sms')[];
}

export interface FundingApplicationResponse {
  application_id: string;
  opportunity_id: string;
  status: 'draft_in_progress' | 'ready_for_review' | 'submitted';
  message: string;
  estimated_completion: string;
  next_steps: ApplicationStep[];
}

export interface ApplicationStep {
  step: number;
  action: string;
  status: 'pending' | 'in_progress' | 'completed';
}

// ==================== USER PROFILE ====================

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  business_name: string;
  sector: 'retail' | 'agriculture' | 'juakali' | 'transport' | 'food' | 'tech' | 'beauty' | 'construction' | 'other';
  county: string;
  annual_revenue: number;
  employee_count: number;
  registration_date: string;
  language_preference: 'en' | 'sw';
  onboarding_completed: boolean;
  growth_score: number;
  created_at: string;
  updated_at: string;
}

// ==================== ERROR HANDLING ====================

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
    request_id: string;
  };
}

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'MPESA_CONNECTION_ERROR'
  | 'AGENT_PROCESSING_ERROR'
  | 'RATE_LIMIT_EXCEEDED';

// ==================== LOAN READINESS & LENDING ====================

export interface LoanReadinessReport {
  report_id: string;
  generated_at: string;
  user_id: string;
  business_name: string;
  loan_readiness_score: number;
  approval_likelihood: 'very_high' | 'high' | 'medium' | 'low';
  assessment: {
    financial_health: AssessmentCategory;
    documentation_completeness: AssessmentCategory;
    repayment_capacity: AssessmentCategory;
  };
  loan_capacity: {
    recommended_loan_amount: number;
    max_loan_amount: number;
    recommended_term_months: number;
    estimated_interest_rate: number;
    monthly_payment: number;
    notes: string;
  };
  improvement_actions: ImprovementAction[];
  matched_lenders: MatchedLender[];
}

export interface AssessmentCategory {
  score: number;
  status: 'excellent' | 'good' | 'adequate' | 'needs_improvement';
  factors: Record<string, AssessmentFactor>;
}

export interface AssessmentFactor {
  score: number;
  status: string;
  details: string;
  value?: number;
}

export interface ImprovementAction {
  priority: 'high' | 'medium' | 'low';
  category: 'documentation' | 'compliance' | 'financial_health';
  action: string;
  impact: string;
  estimated_time: string;
}

export interface MatchedLender {
  lender_id: string;
  lender_name: string;
  match_score: number;
  max_amount: number;
  interest_rate: number;
  approval_likelihood: 'very_high' | 'high' | 'medium' | 'low';
  reasons: string[];
}

export interface DebtSchedule {
  schedule_id: string;
  user_id: string;
  generated_at: string;
  total_debt: number;
  monthly_obligations: number;
  debt_to_income_ratio: number;
  status: 'manageable' | 'concerning' | 'critical';
  loans: Loan[];
  payment_calendar: PaymentCalendarEntry[];
  recommendations: DebtRecommendation[];
}

export interface Loan {
  loan_id: string;
  lender: string;
  loan_type: 'working_capital' | 'equipment' | 'expansion' | 'emergency' | 'other';
  principal_amount: number;
  outstanding_balance: number;
  interest_rate: number;
  term_months: number;
  monthly_payment: number;
  next_payment_date: string;
  next_payment_amount: number;
  payments_made: number;
  payments_remaining: number;
  payment_history: PaymentHistory[];
  auto_pay_enabled: boolean;
  delinquency_status: 'current' | 'late_1_30' | 'late_31_60' | 'late_61_90' | 'default';
}

export interface PaymentHistory {
  date: string;
  amount: number;
  status: 'paid' | 'missed' | 'partial';
  days_late: number;
}

export interface PaymentCalendarEntry {
  date: string;
  loans: string[];
  total_amount: number;
  status: 'upcoming' | 'due_today' | 'overdue';
  warning?: string;
}

export interface DebtRecommendation {
  type: 'early_payment' | 'refinance' | 'consolidation' | 'payment_plan';
  message: string;
  savings?: number;
  priority?: 'high' | 'medium' | 'low';
}

export interface BudgetSuggestions {
  budget_id: string;
  user_id: string;
  generated_at: string;
  period: 'monthly' | 'quarterly' | 'yearly';
  recommended_budget: {
    total_income: number;
    total_expenses: number;
    savings_target: number;
    categories: Record<string, BudgetCategory>;
  };
  savings_plan: {
    emergency_fund_target: number;
    emergency_fund_current: number;
    emergency_fund_gap: number;
    recommended_monthly_savings: number;
    months_to_goal: number;
  };
}

export interface BudgetCategory {
  current_spend: number;
  recommended_spend: number;
  variance: number;
  percentage_of_income: number;
  benchmark: string;
  status: 'optimal' | 'good' | 'needs_attention' | 'underspending';
  suggestions?: string[];
}

export interface InvoiceManagement {
  receivables_id: string;
  user_id: string;
  generated_at: string;
  total_outstanding: number;
  total_overdue: number;
  invoices: Invoice[];
  collection_rate: {
    last_30_days: number;
    last_90_days: number;
    average_days_to_payment: number;
  };
  recommendations: InvoiceRecommendation[];
}

export interface Invoice {
  invoice_id: string;
  customer_name: string;
  customer_phone: string;
  amount: number;
  issue_date: string;
  due_date: string;
  days_until_due?: number;
  days_overdue?: number;
  status: 'pending' | 'overdue' | 'paid' | 'cancelled';
  reminders_sent: number;
  last_reminder_date?: string;
  next_reminder_date?: string;
  auto_reminder_enabled: boolean;
  collection_status?: 'normal' | 'escalated' | 'legal';
}

export interface InvoiceRecommendation {
  type: 'reminder' | 'escalation' | 'discount' | 'payment_plan';
  invoice_id: string;
  action: string;
  scheduled_for?: string;
  severity?: 'low' | 'medium' | 'urgent';
}

export interface BookkeepingSuggestions {
  bookkeeping_id: string;
  user_id: string;
  generated_at: string;
  suggestions: BookkeepingSuggestion[];
  automation_opportunities: AutomationOpportunity[];
}

export interface BookkeepingSuggestion {
  category: 'categorization' | 'reconciliation' | 'receipts' | 'reporting';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  transactions?: Array<{
    transaction_id: string;
    amount: number;
    description: string;
    suggested_category?: string;
    confidence?: number;
    date?: string;
  }>;
  action: string;
  estimated_time: string;
}

export interface AutomationOpportunity {
  type: 'auto_categorize' | 'recurring_payments' | 'invoice_automation' | 'expense_tracking';
  description: string;
  savings: string;
  confidence: 'high' | 'medium' | 'low';
}

// ==================== KPIs ====================

export interface FinancialKPIs {
  user_id: string;
  generated_at: string;
  cash_runway_days: number;
  invoice_collection_rate: number;
  loan_approval_likelihood: number;
  debt_service_coverage_ratio: number;
  gross_profit_margin: number;
  operating_expense_ratio: number;
  current_ratio: number;
  quick_ratio: number;
  revenue_growth_rate: number;
}
