'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sevaApi } from '@/lib/api/seva';
import { QUERY_KEYS } from '@/lib/utils/constants';
import { toast } from 'sonner';

export function useSevaOpportunities(templeId?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.sevaOpportunities(templeId),
    queryFn: () => sevaApi.getOpportunities(templeId!),
    enabled: !!templeId,
  });
}

export function useMySevaRegistrations() {
  return useQuery({
    queryKey: QUERY_KEYS.sevaRegistrations,
    queryFn: sevaApi.getMyRegistrations,
  });
}

export function useRegisterSeva() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sevaApi.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seva'] });
      toast.success('Registered for seva!');
    },
    onError: () => toast.error('Failed to register'),
  });
}

export function useCancelSeva() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sevaApi.cancelRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seva'] });
      toast.success('Seva registration cancelled');
    },
    onError: () => toast.error('Failed to cancel'),
  });
}
