import apiClient from './client';
import type { Puja, PujaBooking } from '@/types';

export interface BookPujaRequest {
  pujaId: number;
  scheduledDate: string;
  specialInstructions?: string;
}

export const pujasApi = {
  list: () => apiClient.get<Puja[]>('/pujas').then((r) => r.data),

  getById: (id: number) => apiClient.get<Puja>(`/pujas/${id}`).then((r) => r.data),

  book: (data: BookPujaRequest) =>
    apiClient.post<PujaBooking>('/pujas/book', data).then((r) => r.data),

  getMyBookings: () => apiClient.get<PujaBooking[]>('/pujas/bookings').then((r) => r.data),
};
