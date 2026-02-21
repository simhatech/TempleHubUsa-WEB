import apiClient from '../client';
import type { Inventory } from '@/types';

export interface InventoryStats {
  totalItems: number;
  lowStockCount: number;
}

export const adminInventoryApi = {
  getItems: (templeId: number) =>
    apiClient
      .get<Inventory[]>('/admin/inventory', { params: { templeId } })
      .then((r) => r.data),

  getStats: (templeId: number) =>
    apiClient
      .get<InventoryStats>('/admin/inventory/stats', { params: { templeId } })
      .then((r) => r.data),

  create: (data: Record<string, unknown>) =>
    apiClient.post<Inventory>('/admin/inventory', data).then((r) => r.data),

  update: (id: number, data: Record<string, unknown>) =>
    apiClient.put<Inventory>(`/admin/inventory/${id}`, data).then((r) => r.data),
};
