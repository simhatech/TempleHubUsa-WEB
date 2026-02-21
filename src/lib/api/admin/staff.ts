import apiClient from '../client';
import type { Staff, StaffAttendance } from '@/types';

export const adminStaffApi = {
  getStaff: (templeId: number) =>
    apiClient.get<Staff[]>('/admin/staff', { params: { templeId } }).then((r) => r.data),

  create: (data: Record<string, unknown>) =>
    apiClient.post<Staff>('/admin/staff', data).then((r) => r.data),

  update: (id: number, data: Record<string, unknown>) =>
    apiClient.put<Staff>(`/admin/staff/${id}`, data).then((r) => r.data),

  remove: (id: number) => apiClient.delete(`/admin/staff/${id}`).then((r) => r.data),

  getAttendance: (templeId: number, date: string) =>
    apiClient
      .get<StaffAttendance[]>('/admin/staff/attendance', { params: { templeId, date } })
      .then((r) => r.data),

  markAttendance: (staffId: number, data: { date: string; status: string; notes?: string }) =>
    apiClient
      .post<StaffAttendance>(`/admin/staff/${staffId}/attendance`, data)
      .then((r) => r.data),
};
