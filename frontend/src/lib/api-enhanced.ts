// Enhanced API Layer for Django Backend Integration
// Supports n8n agent workflows and Kenyan SME-specific features

import type {
  SignupRequest,
  AuthResponse,
  MPesaStatus,
  MPesaConnectRequest,
  MPesaConnectResponse,
  MPesaSyncResponse,
  TransactionsResponse,
  CashFlowForecast,
  LogCashRequest,
  LogCashResponse,
  ComplianceStatus,
  RenewalRequest,
  RenewalResponse,
  ApproveAgentRequest,
  ApproveAgentResponse,
  ToggleTrackerRequest,
  ToggleTrackerResponse,
  DocumentUploadResponse,
  ActivitiesResponse,
  CreateActivityRequest,
  CreateActivityResponse,
  LikeActivityRequest,
  LikeActivityResponse,
  FundingOpportunitiesResponse,
  FundingMatchResponse,
  FundingApplicationRequest,
  FundingApplicationResponse,
  UserProfile,
  ApiError
} from '../types/api';

// ==================== CONFIGURATION ====================

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';
const TIMEOUT_MS = 30000; // 30 seconds

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  token?: string;
  timeout?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { method = 'GET', body, token, timeout = TIMEOUT_MS } = options;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      method,
      headers,
      signal: AbortSignal.timeout(timeout),
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config);

      // Handle non-JSON responses (e.g., file downloads)
      const contentType = response.headers.get('content-type');
      if (contentType && !contentType.includes('application/json')) {
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        return response as unknown as T;
      }

      const data = await response.json();

      if (!response.ok) {
        const error: ApiError = data;
        throw new ApiClientError(
          error.error?.message || 'API request failed',
          error.error?.code || 'UNKNOWN_ERROR',
          response.status,
          error.error?.details
        );
      }

      return data as T;
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError' || error.name === 'TimeoutError') {
          throw new ApiClientError('Request timeout', 'TIMEOUT_ERROR', 408);
        }
        throw new ApiClientError(error.message, 'NETWORK_ERROR', 0);
      }

      throw new ApiClientError('Unknown error occurred', 'UNKNOWN_ERROR', 0);
    }
  }

  // ==================== AUTH API ====================

  async signup(data: SignupRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: data,
    });
  }

  // ==================== USER PROFILE API ====================

  async getProfile(userId: string, token: string): Promise<UserProfile> {
    return this.request<UserProfile>(`/profile/${userId}`, { token });
  }

  async updateProfile(userId: string, updates: Partial<UserProfile>, token: string): Promise<UserProfile> {
    return this.request<UserProfile>(`/profile/${userId}`, {
      method: 'PUT',
      body: updates,
      token,
    });
  }

  // ==================== M-PESA / FINANCIAL AGENT API ====================

  async getMPesaStatus(token: string): Promise<MPesaStatus> {
    return this.request<MPesaStatus>('/mpesa/status', { token });
  }

  async connectMPesa(data: MPesaConnectRequest, token: string): Promise<MPesaConnectResponse> {
    return this.request<MPesaConnectResponse>('/mpesa/connect', {
      method: 'POST',
      body: data,
      token,
    });
  }

  async syncMPesa(token: string): Promise<MPesaSyncResponse> {
    return this.request<MPesaSyncResponse>('/mpesa/sync', {
      method: 'POST',
      token,
    });
  }

  async getMPesaTransactions(
    token: string,
    params?: {
      start_date?: string;
      end_date?: string;
      type?: 'inflow' | 'outflow' | 'all';
      limit?: number;
      offset?: number;
    }
  ): Promise<TransactionsResponse> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/mpesa/transactions?${queryString}` : '/mpesa/transactions';

    return this.request<TransactionsResponse>(endpoint, { token });
  }

  async getCashFlowForecast(token: string, days: 21 | 90 = 21): Promise<CashFlowForecast> {
    return this.request<CashFlowForecast>(`/cashflow/forecast?days=${days}`, { token });
  }

  async logCashSale(data: LogCashRequest, token: string): Promise<LogCashResponse> {
    return this.request<LogCashResponse>('/cashflow/log-cash', {
      method: 'POST',
      body: data,
      token,
    });
  }

  // ==================== COMPLIANCE AGENT API ====================

  async getComplianceStatus(token: string): Promise<ComplianceStatus> {
    return this.request<ComplianceStatus>('/compliance', { token });
  }

  async renewComplianceItem(
    itemId: string,
    data: RenewalRequest,
    token: string
  ): Promise<RenewalResponse> {
    return this.request<RenewalResponse>(`/compliance/${itemId}/renew`, {
      method: 'POST',
      body: data,
      token,
    });
  }

  async approveAgent(
    itemId: string,
    data: ApproveAgentRequest,
    token: string
  ): Promise<ApproveAgentResponse> {
    return this.request<ApproveAgentResponse>(`/compliance/${itemId}/approve-agent`, {
      method: 'POST',
      body: data,
      token,
    });
  }

  async toggleComplianceTracker(
    itemId: string,
    data: ToggleTrackerRequest,
    token: string
  ): Promise<ToggleTrackerResponse> {
    return this.request<ToggleTrackerResponse>(`/compliance/${itemId}/toggle-tracker`, {
      method: 'POST',
      body: data,
      token,
    });
  }

  async uploadComplianceDocument(
    itemId: string,
    file: File,
    documentType: string,
    token: string
  ): Promise<DocumentUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('item_id', itemId);
    formData.append('document_type', documentType);

    const headers: HeadersInit = {
      'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(`${this.baseUrl}/compliance/upload-document`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApiClientError(
        error.error?.message || 'Upload failed',
        error.error?.code || 'UPLOAD_ERROR',
        response.status
      );
    }

    return response.json();
  }

  // ==================== AGENT ACTIVITIES API ====================

  async getActivities(
    token: string,
    params?: {
      agent_id?: string;
      status?: 'success' | 'warning' | 'action_required' | 'pending';
      limit?: number;
      offset?: number;
    }
  ): Promise<ActivitiesResponse> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/activities?${queryString}` : '/activities';

    return this.request<ActivitiesResponse>(endpoint, { token });
  }

  async createActivity(data: CreateActivityRequest, token: string): Promise<CreateActivityResponse> {
    return this.request<CreateActivityResponse>('/activities/create', {
      method: 'POST',
      body: data,
      token,
    });
  }

  async likeActivity(activityId: string, data: LikeActivityRequest, token: string): Promise<LikeActivityResponse> {
    return this.request<LikeActivityResponse>(`/activities/${activityId}/like`, {
      method: 'POST',
      body: data,
      token,
    });
  }

  // ==================== FUNDING NAVIGATOR API ====================

  async getFundingOpportunities(
    token: string,
    params?: {
      status?: 'available' | 'in_progress' | 'submitted';
      min_amount?: number;
      max_amount?: number;
    }
  ): Promise<FundingOpportunitiesResponse> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/funding/opportunities?${queryString}` : '/funding/opportunities';

    return this.request<FundingOpportunitiesResponse>(endpoint, { token });
  }

  async matchFunding(token: string): Promise<FundingMatchResponse> {
    return this.request<FundingMatchResponse>('/funding/match', {
      method: 'POST',
      token,
    });
  }

  async applyForFunding(
    opportunityId: string,
    data: FundingApplicationRequest,
    token: string
  ): Promise<FundingApplicationResponse> {
    return this.request<FundingApplicationResponse>(`/funding/apply/${opportunityId}`, {
      method: 'POST',
      body: data,
      token,
    });
  }

  // ==================== HEALTH CHECK ====================

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }
}

// ==================== ERROR HANDLING ====================

export class ApiClientError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiClientError';
  }

  get isNetworkError(): boolean {
    return this.code === 'NETWORK_ERROR' || this.statusCode === 0;
  }

  get isTimeout(): boolean {
    return this.code === 'TIMEOUT_ERROR';
  }

  get isUnauthorized(): boolean {
    return this.statusCode === 401;
  }

  get isForbidden(): boolean {
    return this.statusCode === 403;
  }

  get isNotFound(): boolean {
    return this.statusCode === 404;
  }

  get isValidationError(): boolean {
    return this.code === 'VALIDATION_ERROR';
  }

  get isMPesaError(): boolean {
    return this.code === 'MPESA_CONNECTION_ERROR';
  }

  get isAgentError(): boolean {
    return this.code === 'AGENT_PROCESSING_ERROR';
  }

  get isRateLimited(): boolean {
    return this.statusCode === 429;
  }

  getUserMessage(language: 'en' | 'sw' = 'en'): string {
    if (language === 'sw') {
      if (this.isNetworkError) return 'Hakuna muunganisho wa mtandao';
      if (this.isTimeout) return 'Ombi limechukua muda mrefu sana';
      if (this.isUnauthorized) return 'Tafadhali ingia tena';
      if (this.isNotFound) return 'Rasilimali haipatikani';
      if (this.isMPesaError) return 'Hitilafu ya M-Pesa. Jaribu tena baadaye';
      if (this.isRateLimited) return 'Maombi mengi sana. Jaribu baadaye';
      return this.message || 'Hitilafu imetokea';
    }

    if (this.isNetworkError) return 'No network connection';
    if (this.isTimeout) return 'Request took too long';
    if (this.isUnauthorized) return 'Please log in again';
    if (this.isNotFound) return 'Resource not found';
    if (this.isMPesaError) return 'M-Pesa error. Please try again later';
    if (this.isRateLimited) return 'Too many requests. Please try again later';
    return this.message || 'An error occurred';
  }
}

// ==================== SINGLETON INSTANCE ====================

export const apiClient = new ApiClient(API_BASE_URL);

// ==================== EXPORT FOR BACKWARD COMPATIBILITY ====================

export const authApi = {
  signup: (data: SignupRequest) => apiClient.signup(data),
};

export const profileApi = {
  get: (userId: string, token: string) => apiClient.getProfile(userId, token),
  update: (userId: string, updates: Partial<UserProfile>, token: string) =>
    apiClient.updateProfile(userId, updates, token),
};

export const mpesaApi = {
  getStatus: (token: string) => apiClient.getMPesaStatus(token),
  connect: (data: MPesaConnectRequest, token: string) => apiClient.connectMPesa(data, token),
  sync: (token: string) => apiClient.syncMPesa(token),
  getTransactions: (token: string, params?: any) => apiClient.getMPesaTransactions(token, params),
};

export const cashflowApi = {
  getForecast: (token: string, days: 21 | 90 = 21) => apiClient.getCashFlowForecast(token, days),
  logCash: (data: LogCashRequest, token: string) => apiClient.logCashSale(data, token),
};

export const complianceApi = {
  getAll: (token: string) => apiClient.getComplianceStatus(token),
  renew: (itemId: string, data: RenewalRequest, token: string) =>
    apiClient.renewComplianceItem(itemId, data, token),
  approveAgent: (itemId: string, data: ApproveAgentRequest, token: string) =>
    apiClient.approveAgent(itemId, data, token),
  toggleTracker: (itemId: string, data: ToggleTrackerRequest, token: string) =>
    apiClient.toggleComplianceTracker(itemId, data, token),
  uploadDocument: (itemId: string, file: File, documentType: string, token: string) =>
    apiClient.uploadComplianceDocument(itemId, file, documentType, token),
};

export const activitiesApi = {
  getAll: (token: string, params?: any) => apiClient.getActivities(token, params),
  create: (data: CreateActivityRequest, token: string) => apiClient.createActivity(data, token),
  like: (activityId: string, data: LikeActivityRequest, token: string) =>
    apiClient.likeActivity(activityId, data, token),
};

export const fundingApi = {
  getOpportunities: (token: string, params?: any) => apiClient.getFundingOpportunities(token, params),
  match: (token: string) => apiClient.matchFunding(token),
  apply: (opportunityId: string, data: FundingApplicationRequest, token: string) =>
    apiClient.applyForFunding(opportunityId, data, token),
};

export const healthCheck = () => apiClient.healthCheck();
