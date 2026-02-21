import apiClient from './client';
import type { PrasadamItem, PrasadamOrder } from '@/types';

export interface CreatePrasadamOrderRequest {
  itemId: number;
  templeId: number;
  quantity: number;
  deliveryAddress?: string;
}

export const prasadamApi = {
  getItems: (templeId: number) =>
    apiClient
      .get<PrasadamItem[]>('/prasadam/items', { params: { templeId } })
      .then((r) => r.data),

  createOrder: (data: CreatePrasadamOrderRequest) =>
    apiClient.post<PrasadamOrder>('/prasadam/order', data).then((r) => r.data),

  getMyOrders: () => apiClient.get<PrasadamOrder[]>('/prasadam/orders').then((r) => r.data),
};
