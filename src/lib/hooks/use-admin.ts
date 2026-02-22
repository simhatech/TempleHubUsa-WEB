'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminAnalyticsApi } from '@/lib/api/admin/analytics';
import { adminInventoryApi } from '@/lib/api/admin/inventory';
import { adminStaffApi } from '@/lib/api/admin/staff';
import { adminEventsApi } from '@/lib/api/admin/events';
import { adminDonationsApi } from '@/lib/api/admin/donations';
import { adminNotificationsApi } from '@/lib/api/admin/notifications';
import { adminFinancesApi } from '@/lib/api/admin/finances';
import { QUERY_KEYS } from '@/lib/utils/constants';
import { toast } from 'sonner';

// Analytics
export function useAdminRevenue(period?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.adminAnalytics(period),
    queryFn: () => adminAnalyticsApi.getRevenue(period),
  });
}

export function useAdminStats(templeId?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.adminStats(templeId),
    queryFn: () => adminAnalyticsApi.getStats(templeId),
  });
}

export function useAdminTopServices(limit?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.adminTopServices(limit),
    queryFn: () => adminAnalyticsApi.getTopServices(limit),
  });
}

export function useAdminDevotees(templeId?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.adminDevotees(templeId),
    queryFn: () => adminAnalyticsApi.getDevotees(templeId),
  });
}

// Inventory
export function useAdminInventory(templeId?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.adminInventory(templeId),
    queryFn: () => adminInventoryApi.getItems(templeId!),
    enabled: !!templeId,
  });
}

export function useAdminInventoryStats(templeId?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.adminInventoryStats(templeId),
    queryFn: () => adminInventoryApi.getStats(templeId!),
    enabled: !!templeId,
  });
}

export function useCreateInventoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminInventoryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'inventory'] });
      toast.success('Inventory item added');
    },
    onError: () => toast.error('Failed to add item'),
  });
}

export function useUpdateInventoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) =>
      adminInventoryApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'inventory'] });
      toast.success('Inventory item updated');
    },
    onError: () => toast.error('Failed to update item'),
  });
}

// Staff
export function useAdminStaff(templeId?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.adminStaff(templeId),
    queryFn: () => adminStaffApi.getStaff(templeId!),
    enabled: !!templeId,
  });
}

export function useCreateStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminStaffApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'staff'] });
      toast.success('Staff member added');
    },
    onError: () => toast.error('Failed to add staff'),
  });
}

export function useUpdateStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) =>
      adminStaffApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'staff'] });
      toast.success('Staff updated');
    },
    onError: () => toast.error('Failed to update staff'),
  });
}

export function useRemoveStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminStaffApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'staff'] });
      toast.success('Staff removed');
    },
    onError: () => toast.error('Failed to remove staff'),
  });
}

export function useStaffAttendance(templeId?: number, date?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.adminStaffAttendance(templeId, date),
    queryFn: () => adminStaffApi.getAttendance(templeId!, date!),
    enabled: !!templeId && !!date,
  });
}

export function useMarkAttendance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      staffId,
      data,
    }: {
      staffId: number;
      data: { date: string; status: string; notes?: string };
    }) => adminStaffApi.markAttendance(staffId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'staff', 'attendance'] });
      toast.success('Attendance marked');
    },
    onError: () => toast.error('Failed to mark attendance'),
  });
}

// Events
export function useAdminEvents(templeId?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.adminEvents(templeId),
    queryFn: () => adminEventsApi.getByTemple(templeId!),
    enabled: !!templeId,
  });
}

export function useAdminCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminEventsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event created');
    },
    onError: () => toast.error('Failed to create event'),
  });
}

export function useAdminUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) =>
      adminEventsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event updated');
    },
    onError: () => toast.error('Failed to update event'),
  });
}

// Donations
export function useAdminDonations(templeId?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.adminDonations(templeId),
    queryFn: () => adminDonationsApi.getByTemple(templeId!),
    enabled: !!templeId,
  });
}

export function useAdminDonationStats(templeId?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.adminDonationStats(templeId),
    queryFn: () => adminDonationsApi.getStats(templeId!),
    enabled: !!templeId,
  });
}

// Finances
export function useAdminFinanceTransactions(templeId?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.adminFinanceTransactions(templeId),
    queryFn: () => adminFinancesApi.getTransactions(templeId),
  });
}

export function useAdminFinanceSummary(templeId?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.adminFinanceSummary(templeId),
    queryFn: () => adminFinancesApi.getSummary(templeId),
  });
}

// Notifications
export function useSendNotification() {
  return useMutation({
    mutationFn: adminNotificationsApi.send,
    onSuccess: () => toast.success('Notification sent'),
    onError: () => toast.error('Failed to send notification'),
  });
}
