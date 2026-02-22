import apiClient from '../client';
import type { Payment } from '@/types';

export interface FinanceSummary {
  totalRevenue: number;
  totalDonations: number;
  totalPujaBookings: number;
  totalPrasadamOrders: number;
  totalMemberships: number;
}

export const adminFinancesApi = {
  getTransactions: (templeId?: number) =>
    apiClient
      .get<Payment[]>('/admin/finances/transactions', { params: { templeId } })
      .then((r) => r.data),

  getSummary: (templeId?: number) =>
    apiClient
      .get<FinanceSummary>('/admin/finances/summary', { params: { templeId } })
      .then((r) => r.data),
};
