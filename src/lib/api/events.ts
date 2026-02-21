import apiClient from './client';
import type { Event } from '@/types';

export const eventsApi = {
  getByTemple: (templeId: number) =>
    apiClient.get<Event[]>('/events', { params: { templeId } }).then((r) => r.data),

  getUpcoming: (templeId?: number) =>
    apiClient.get<Event[]>('/events/upcoming', { params: { templeId } }).then((r) => r.data),

  rsvp: (eventId: number) =>
    apiClient.post(`/events/${eventId}/rsvp`).then((r) => r.data),

  cancelRsvp: (eventId: number) =>
    apiClient.delete(`/events/${eventId}/rsvp`).then((r) => r.data),
};
