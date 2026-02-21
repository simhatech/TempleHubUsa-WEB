'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prasadamApi, type CreatePrasadamOrderRequest } from '@/lib/api/prasadam';
import { QUERY_KEYS } from '@/lib/utils/constants';
import { toast } from 'sonner';

export function usePrasadamItems(templeId?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.prasadamItems(templeId),
    queryFn: () => prasadamApi.getItems(templeId!),
    enabled: !!templeId,
  });
}

export function useMyPrasadamOrders() {
  return useQuery({
    queryKey: QUERY_KEYS.prasadamOrders,
    queryFn: prasadamApi.getMyOrders,
  });
}

export function useCreatePrasadamOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePrasadamOrderRequest) => prasadamApi.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prasadam'] });
      toast.success('Order placed successfully!');
    },
    onError: () => toast.error('Failed to place order'),
  });
}
