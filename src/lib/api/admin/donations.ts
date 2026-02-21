import apiClient from '../client';
import type { Donation } from '@/types';
import type { DonationStats } from '../donations';

export const adminDonationsApi = {
  getByTemple: (templeId: number) =>
    apiClient
      .get<Donation[]>('/admin/donations', { params: { templeId } })
      .then((r) => r.data),

  getStats: (templeId: number) =>
    apiClient
      .get<DonationStats>('/admin/donations/stats', { params: { templeId } })
      .then((r) => r.data),
};
