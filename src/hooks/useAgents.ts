// Enhanced Agent Hooks for n8n-powered AI Agents
// Financial Agent & Compliance Agent with full error handling

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  apiClient,
  ApiClientError,
  mpesaApi,
  cashflowApi,
  complianceApi,
  activitiesApi,
  fundingApi
} from '../lib/api-enhanced';
import type {
  MPesaStatus,
  MPesaConnectRequest,
  TransactionsResponse,
  CashFlowForecast,
  LogCashRequest,
  ComplianceStatus,
  RenewalRequest,
  ApproveAgentRequest,
  ToggleTrackerRequest,
  ActivitiesResponse,
  FundingOpportunitiesResponse,
  CreateActivityRequest,
  LikeActivityRequest
} from '../types/api';

// ==================== TYPES ====================

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiClientError | null;
  refetch: () => Promise<void>;
}

interface UseMutationState<T> {
  data: T | null;
  loading: boolean;
  error: ApiClientError | null;
  execute: (...args: any[]) => Promise<T | undefined>;
  reset: () => void;
}

// ==================== GENERIC HOOKS ====================

function useApiQuery<T>(
  queryFn: (token: string) => Promise<T>,
  deps: any[] = []
): UseApiState<T> {
  const { session } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiClientError | null>(null);

  const fetchData = useCallback(async () => {
    if (!session?.access_token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await queryFn(session.access_token);
      setData(result);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err);
      } else {
        setError(new ApiClientError('Unknown error', 'UNKNOWN_ERROR', 0));
      }
      console.error('API query failed:', err);
    } finally {
      setLoading(false);
    }
  }, [session?.access_token, ...deps]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

function useApiMutation<T, Args extends any[]>(
  mutationFn: (token: string, ...args: Args) => Promise<T>
): UseMutationState<T> {
  const { session } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiClientError | null>(null);

  const execute = useCallback(
    async (...args: Args): Promise<T | undefined> => {
      if (!session?.access_token) {
        setError(new ApiClientError('Not authenticated', 'UNAUTHORIZED', 401));
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await mutationFn(session.access_token, ...args);
        setData(result);
        return result;
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err);
        } else {
          setError(new ApiClientError('Unknown error', 'UNKNOWN_ERROR', 0));
        }
        console.error('API mutation failed:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [session?.access_token, mutationFn]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}

// ==================== FINANCIAL AGENT HOOKS ====================

/**
 * Get M-Pesa connection status
 * Financial Agent monitors account balance and sync status
 */
export function useMPesaStatus() {
  return useApiQuery<MPesaStatus>((token) => mpesaApi.getStatus(token));
}

/**
 * Connect M-Pesa account
 * Initiates OAuth flow with Safaricom
 */
export function useMPesaConnect() {
  return useApiMutation<any, [MPesaConnectRequest]>(
    (token, data) => mpesaApi.connect(data, token)
  );
}

/**
 * Manually trigger M-Pesa sync
 * Financial Agent will process transactions in background
 */
export function useMPesaSync() {
  return useApiMutation<any, []>(
    (token) => mpesaApi.sync(token)
  );
}

/**
 * Get M-Pesa transaction history
 * Financial Agent categorizes transactions automatically
 */
export function useMPesaTransactions(params?: {
  start_date?: string;
  end_date?: string;
  type?: 'inflow' | 'outflow' | 'all';
  limit?: number;
  offset?: number;
}) {
  return useApiQuery<TransactionsResponse>(
    (token) => mpesaApi.getTransactions(token, params),
    [JSON.stringify(params)]
  );
}

/**
 * Get AI-generated cash flow forecast
 * Cashflow Agent uses Prophet model for predictions
 */
export function useCashFlowForecast(days: 21 | 90 = 21) {
  return useApiQuery<CashFlowForecast>(
    (token) => cashflowApi.getForecast(token, days),
    [days]
  );
}

/**
 * Log cash sale (non-M-Pesa transaction)
 * Allows manual entry of cash transactions
 */
export function useLogCashSale() {
  return useApiMutation<any, [LogCashRequest]>(
    (token, data) => cashflowApi.logCash(data, token)
  );
}

// ==================== COMPLIANCE AGENT HOOKS ====================

/**
 * Get all compliance items with status
 * Compliance Agent monitors expiry dates and tracks renewals
 */
export function useComplianceStatus() {
  return useApiQuery<ComplianceStatus>((token) => complianceApi.getAll(token));
}

/**
 * Initiate compliance item renewal
 * Compliance Agent guides through renewal process
 */
export function useRenewalInitiate() {
  return useApiMutation<any, [string, RenewalRequest]>(
    (token, itemId, data) => complianceApi.renew(itemId, data, token)
  );
}

/**
 * Approve agent to proceed with compliance action
 * User gives permission for agent to act autonomously
 */
export function useApproveAgent() {
  return useApiMutation<any, [string, ApproveAgentRequest]>(
    (token, itemId, data) => complianceApi.approveAgent(itemId, data, token)
  );
}

/**
 * Toggle auto-tracker for compliance item
 * Enable/disable daily monitoring by Compliance Agent
 */
export function useToggleComplianceTracker() {
  return useApiMutation<any, [string, ToggleTrackerRequest]>(
    (token, itemId, data) => complianceApi.toggleTracker(itemId, data, token)
  );
}

/**
 * Upload compliance document
 * Attach PDF/image to compliance item
 */
export function useUploadComplianceDocument() {
  return useApiMutation<any, [string, File, string]>(
    (token, itemId, file, documentType) =>
      complianceApi.uploadDocument(itemId, file, documentType, token)
  );
}

// ==================== AGENT ACTIVITIES HOOKS ====================

/**
 * Get all agent activities
 * Feed of actions from all 8 AI agents
 */
export function useAgentActivities(params?: {
  agent_id?: string;
  status?: 'success' | 'warning' | 'action_required' | 'pending';
  limit?: number;
  offset?: number;
}) {
  return useApiQuery<ActivitiesResponse>(
    (token) => activitiesApi.getAll(token, params),
    [JSON.stringify(params)]
  );
}

/**
 * Create manual activity
 * For n8n agents to post updates
 */
export function useCreateActivity() {
  return useApiMutation<any, [CreateActivityRequest]>(
    (token, data) => activitiesApi.create(data, token)
  );
}

/**
 * Like/unlike activity
 * Feedback mechanism for agent learning
 */
export function useLikeActivity() {
  return useApiMutation<any, [string, LikeActivityRequest]>(
    (token, activityId, data) => activitiesApi.like(activityId, data, token)
  );
}

// ==================== FUNDING NAVIGATOR HOOKS ====================

/**
 * Get matched funding opportunities
 * Funding Agent finds opportunities matching business profile
 */
export function useFundingOpportunities(params?: {
  status?: 'available' | 'in_progress' | 'submitted';
  min_amount?: number;
  max_amount?: number;
}) {
  return useApiQuery<FundingOpportunitiesResponse>(
    (token) => fundingApi.getOpportunities(token, params),
    [JSON.stringify(params)]
  );
}

/**
 * Trigger funding matching
 * Manually run matching algorithm
 */
export function useFundingMatch() {
  return useApiMutation<any, []>(
    (token) => fundingApi.match(token)
  );
}

/**
 * Apply for funding opportunity
 * Application Agent assists with application preparation
 */
export function useApplyForFunding() {
  return useApiMutation<any, [string, any]>(
    (token, opportunityId, data) => fundingApi.apply(opportunityId, data, token)
  );
}

// ==================== COMPOSITE HOOKS ====================

/**
 * Combined Financial Agent state
 * All financial data in one hook
 */
export function useFinancialAgent() {
  const mpesaStatus = useMPesaStatus();
  const transactions = useMPesaTransactions({ limit: 100 });
  const forecast = useCashFlowForecast(21);
  const syncMutation = useMPesaSync();

  const syncNow = useCallback(async () => {
    try {
      await syncMutation.execute();
      // Refetch data after sync
      await Promise.all([
        mpesaStatus.refetch(),
        transactions.refetch(),
        forecast.refetch()
      ]);
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }, [syncMutation, mpesaStatus, transactions, forecast]);

  return {
    status: mpesaStatus.data,
    transactions: transactions.data,
    forecast: forecast.data,
    loading: mpesaStatus.loading || transactions.loading || forecast.loading,
    error: mpesaStatus.error || transactions.error || forecast.error,
    syncing: syncMutation.loading,
    syncNow,
    refetch: async () => {
      await Promise.all([
        mpesaStatus.refetch(),
        transactions.refetch(),
        forecast.refetch()
      ]);
    }
  };
}

/**
 * Combined Compliance Agent state
 * All compliance data in one hook
 */
export function useComplianceAgent() {
  const complianceStatus = useComplianceStatus();
  const renewMutation = useRenewalInitiate();
  const approveMutation = useApproveAgent();
  const toggleMutation = useToggleComplianceTracker();

  const renewItem = useCallback(async (itemId: string, data: RenewalRequest) => {
    try {
      await renewMutation.execute(itemId, data);
      await complianceStatus.refetch();
    } catch (error) {
      console.error('Renewal failed:', error);
    }
  }, [renewMutation, complianceStatus]);

  const approveAgent = useCallback(async (itemId: string, data: ApproveAgentRequest) => {
    try {
      await approveMutation.execute(itemId, data);
      await complianceStatus.refetch();
    } catch (error) {
      console.error('Approval failed:', error);
    }
  }, [approveMutation, complianceStatus]);

  const toggleTracker = useCallback(async (itemId: string, enabled: boolean) => {
    try {
      await toggleMutation.execute(itemId, { enabled });
      await complianceStatus.refetch();
    } catch (error) {
      console.error('Toggle failed:', error);
    }
  }, [toggleMutation, complianceStatus]);

  return {
    status: complianceStatus.data,
    loading: complianceStatus.loading,
    error: complianceStatus.error,
    renewItem,
    approveAgent,
    toggleTracker,
    refetch: complianceStatus.refetch
  };
}

// ==================== UTILITY HOOKS ====================

/**
 * Handle API errors with user-friendly messages
 */
export function useErrorHandler(language: 'en' | 'sw' = 'en') {
  const handleError = useCallback((error: ApiClientError | null): string | null => {
    if (!error) return null;
    return error.getUserMessage(language);
  }, [language]);

  return { handleError };
}
