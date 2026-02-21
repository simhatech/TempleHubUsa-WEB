import apiClient from '../client';
import type { Event } from '@/types';

export const adminEventsApi = {
  create: (data: Record<string, unknown>) =>
    apiClient.post<Event>('/admin/events', data).then((r) => r.data),

  getByTemple: (templeId: number) =>
    apiClient.get<Event[]>('/admin/events', { params: { templeId } }).then((r) => r.data),

  update: (id: number, data: Record<string, unknown>) =>
    apiClient.put<Event>(`/admin/events/${id}`, data).then((r) => r.data),
};
