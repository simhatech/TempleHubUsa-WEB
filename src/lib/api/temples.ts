import apiClient from './client';
import type { Temple } from '@/types';
import type { PaginatedResponse } from '@/types/api';

export interface TempleQueryParams {
  page?: number;
  size?: number;
  sort?: string;
}

export const templesApi = {
  list: (params?: TempleQueryParams) =>
    apiClient.get<PaginatedResponse<Temple>>('/temples', { params }).then((r) => r.data),

  getById: (id: number) => apiClient.get<Temple>(`/temples/${id}`).then((r) => r.data),

  getCount: () => apiClient.get<number>('/temples/count').then((r) => r.data),

  create: (data: Record<string, unknown>) =>
    apiClient.post<Temple>('/temples', data).then((r) => r.data),

  update: (id: number, data: Record<string, unknown>) =>
    apiClient.put<Temple>(`/temples/${id}`, data).then((r) => r.data),
};
