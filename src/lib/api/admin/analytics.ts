import apiClient from '../client';

export interface RevenueData {
  period: string;
  amount: number;
}

export interface DashboardStats {
  totalDevotees: number;
  totalRevenue: number;
  activeEvents: number;
  activeMemberships: number;
}

export interface TopService {
  name: string;
  bookings: number;
}

export interface DevoteeStats {
  totalDevotees: number;
  membershipBreakdown: Record<string, number>;
}

export const adminAnalyticsApi = {
  getRevenue: (period: string = 'month') =>
    apiClient
      .get<RevenueData[]>('/admin/analytics/revenue', { params: { period } })
      .then((r) => r.data),

  getStats: (templeId?: number) =>
    apiClient
      .get<DashboardStats>('/admin/analytics/stats', { params: { templeId } })
      .then((r) => r.data),

  getTopServices: (limit: number = 5) =>
    apiClient
      .get<TopService[]>('/admin/analytics/top-services', { params: { limit } })
      .then((r) => r.data),

  getDevotees: (templeId?: number) =>
    apiClient
      .get<DevoteeStats>('/admin/analytics/devotees', { params: { templeId } })
      .then((r) => r.data),
};
