'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { membershipApi, type UpgradeMembershipRequest } from '@/lib/api/membership';
import { QUERY_KEYS } from '@/lib/utils/constants';
import { toast } from 'sonner';

export function useMembershipPlans(templeId?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.membershipPlans(templeId),
    queryFn: () => membershipApi.getPlans(templeId!),
    enabled: !!templeId,
  });
}

export function useMembershipStatus() {
  return useQuery({
    queryKey: QUERY_KEYS.membershipStatus,
    queryFn: membershipApi.getStatus,
  });
}

export function useUpgradeMembership() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpgradeMembershipRequest) => membershipApi.upgrade(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membership'] });
      toast.success('Membership upgraded!');
    },
    onError: () => toast.error('Failed to upgrade membership'),
  });
}

export function useCancelMembership() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: membershipApi.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membership'] });
      toast.success('Membership cancelled');
    },
    onError: () => toast.error('Failed to cancel membership'),
  });
}
