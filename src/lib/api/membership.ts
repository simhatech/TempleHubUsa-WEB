import apiClient from './client';
import type { MembershipPlan, UserMembership } from '@/types';

export interface UpgradeMembershipRequest {
  planId: number;
  billingCycle: 'MONTHLY' | 'YEARLY';
}

export const membershipApi = {
  getPlans: (templeId: number) =>
    apiClient
      .get<MembershipPlan[]>('/membership/plans', { params: { templeId } })
      .then((r) => r.data),

  createPlan: (data: Partial<MembershipPlan>) =>
    apiClient.post<MembershipPlan>('/membership/plans', data).then((r) => r.data),

  getStatus: () =>
    apiClient.get<UserMembership>('/membership/status').then((r) => r.data),

  upgrade: (data: UpgradeMembershipRequest) =>
    apiClient.post<UserMembership>('/membership/upgrade', data).then((r) => r.data),

  cancel: () => apiClient.delete('/membership').then((r) => r.data),
};
