import apiClient from './client';
import type { SevaOpportunity, SevaRegistration } from '@/types';

export interface RegisterSevaRequest {
  opportunityId: number;
}

export const sevaApi = {
  getOpportunities: (templeId: number) =>
    apiClient
      .get<SevaOpportunity[]>('/seva/opportunities', { params: { templeId } })
      .then((r) => r.data),

  register: (data: RegisterSevaRequest) =>
    apiClient.post<SevaRegistration>('/seva/register', data).then((r) => r.data),

  cancelRegistration: (id: number) =>
    apiClient.delete(`/seva/register/${id}`).then((r) => r.data),

  getMyRegistrations: () =>
    apiClient.get<SevaRegistration[]>('/seva/my-registrations').then((r) => r.data),
};
