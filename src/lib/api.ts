import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-ce50372d`;

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  token?: string;
}

async function apiCall(endpoint: string, options: ApiOptions = {}) {
  const { method = 'GET', body, token } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token || publicAnonKey}`
  };

  const config: RequestInit = {
    method,
    headers
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// ==================== AUTH API ====================

export const authApi = {
  signup: async (email: string, password: string, name: string, phone: string) => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: { email, password, name, phone }
    });
  }
};

// ==================== USER PROFILE API ====================

export const profileApi = {
  get: async (userId: string, token: string) => {
    return apiCall(`/profile/${userId}`, { token });
  },

  update: async (userId: string, updates: any, token: string) => {
    return apiCall(`/profile/${userId}`, {
      method: 'PUT',
      body: updates,
      token
    });
  }
};

// ==================== M-PESA API ====================

export const mpesaApi = {
  connect: async (phoneNumber: string, accountType: string, tillNumber: string, token: string) => {
    return apiCall('/mpesa/connect', {
      method: 'POST',
      body: { phoneNumber, accountType, tillNumber },
      token
    });
  },

  getStatus: async (token: string) => {
    return apiCall('/mpesa/status', { token });
  },

  sync: async (token: string) => {
    return apiCall('/mpesa/sync', {
      method: 'POST',
      token
    });
  },

  getTransactions: async (token: string) => {
    return apiCall('/mpesa/transactions', { token });
  }
};

// ==================== AGENT ACTIVITIES API ====================

export const activitiesApi = {
  getAll: async (token: string) => {
    return apiCall('/activities', { token });
  },

  create: async (activity: any, token: string) => {
    return apiCall('/activities', {
      method: 'POST',
      body: activity,
      token
    });
  }
};

// ==================== FUNDING API ====================

export const fundingApi = {
  getOpportunities: async (token: string) => {
    return apiCall('/funding/opportunities', { token });
  },

  matchFunding: async (token: string) => {
    return apiCall('/funding/match', {
      method: 'POST',
      token
    });
  }
};

// ==================== ANALYTICS API ====================

export const analyticsApi = {
  get: async (token: string) => {
    return apiCall('/analytics', { token });
  },

  generate: async (token: string) => {
    return apiCall('/analytics/generate', {
      method: 'POST',
      token
    });
  }
};

// ==================== COMPLIANCE API ====================

export const complianceApi = {
  getAll: async (token: string) => {
    return apiCall('/compliance', { token });
  }
};

// ==================== BUSINESS REPORT API ====================

export const reportApi = {
  get: async (token: string) => {
    return apiCall('/report', { token });
  },

  generate: async (token: string) => {
    return apiCall('/report/generate', {
      method: 'POST',
      token
    });
  }
};

// ==================== SETTINGS API ====================

export const settingsApi = {
  get: async (token: string) => {
    return apiCall('/settings', { token });
  },

  update: async (updates: any, token: string) => {
    return apiCall('/settings', {
      method: 'PUT',
      body: updates,
      token
    });
  }
};

// ==================== HEALTH CHECK ====================

export const healthCheck = async () => {
  return apiCall('/health');
};
