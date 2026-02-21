import apiClient from './client';
import type { Donation } from '@/types';

export interface CreateDonationRequest {
  templeId: number;
  amount: number;
  purpose: string;
  isAnonymous?: boolean;
}

export interface DonationStats {
  totalAmount: number;
  totalCount: number;
  averageAmount: number;
}

export const donationsApi = {
  create: (data: CreateDonationRequest) =>
    apiClient.post<Donation>('/donations', data).then((r) => r.data),

  getMyDonations: () => apiClient.get<Donation[]>('/donations').then((r) => r.data),

  getStats: () => apiClient.get<DonationStats>('/donations/stats').then((r) => r.data),
};
