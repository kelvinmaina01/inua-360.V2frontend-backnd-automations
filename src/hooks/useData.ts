import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  mpesaApi,
  activitiesApi,
  fundingApi,
  analyticsApi,
  complianceApi,
  reportApi,
  settingsApi
} from '../lib/api';

// Generic hook for API calls with loading and error states
function useApiCall<T>(
  apiFunction: (token: string) => Promise<T>,
  deps: any[] = []
) {
  const { session } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    if (!session?.access_token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await apiFunction(session.access_token);
      setData(result);
    } catch (err) {
      setError(err as Error);
      console.error('API call failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [session?.access_token, ...deps]);

  return { data, loading, error, refetch };
}

// ==================== M-PESA HOOKS ====================

export function useMPesaStatus() {
  return useApiCall(mpesaApi.getStatus);
}

export function useMPesaTransactions() {
  return useApiCall(mpesaApi.getTransactions);
}

export function useMPesaConnect() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const connect = async (phoneNumber: string, accountType: string, tillNumber: string) => {
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const result = await mpesaApi.connect(phoneNumber, accountType, tillNumber, session.access_token);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sync = async () => {
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const result = await mpesaApi.sync(session.access_token);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { connect, sync, loading, error };
}

// ==================== ACTIVITIES HOOKS ====================

export function useActivities() {
  return useApiCall(activitiesApi.getAll);
}

// ==================== FUNDING HOOKS ====================

export function useFundingOpportunities() {
  return useApiCall(fundingApi.getOpportunities);
}

export function useFundingMatch() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const matchFunding = async () => {
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fundingApi.matchFunding(session.access_token);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { matchFunding, loading, error };
}

// ==================== ANALYTICS HOOKS ====================

export function useAnalytics() {
  return useApiCall(analyticsApi.get);
}

export function useAnalyticsGenerate() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateAnalytics = async () => {
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyticsApi.generate(session.access_token);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generateAnalytics, loading, error };
}

// ==================== COMPLIANCE HOOKS ====================

export function useCompliance() {
  return useApiCall(complianceApi.getAll);
}

// ==================== BUSINESS REPORT HOOKS ====================

export function useBusinessReport() {
  return useApiCall(reportApi.get);
}

export function useReportGenerate() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateReport = async () => {
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const result = await reportApi.generate(session.access_token);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generateReport, loading, error };
}

// ==================== SETTINGS HOOKS ====================

export function useSettings() {
  return useApiCall(settingsApi.get);
}

export function useSettingsUpdate() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateSettings = async (updates: any) => {
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const result = await settingsApi.update(updates, session.access_token);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateSettings, loading, error };
}
