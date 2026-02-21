'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pujasApi, type BookPujaRequest } from '@/lib/api/pujas';
import { QUERY_KEYS } from '@/lib/utils/constants';
import { toast } from 'sonner';

export function usePujas() {
  return useQuery({
    queryKey: QUERY_KEYS.pujas,
    queryFn: pujasApi.list,
  });
}

export function usePuja(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.puja(id),
    queryFn: () => pujasApi.getById(id),
    enabled: !!id,
  });
}

export function useMyBookings() {
  return useQuery({
    queryKey: QUERY_KEYS.pujaBookings,
    queryFn: pujasApi.getMyBookings,
  });
}

export function useBookPuja() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BookPujaRequest) => pujasApi.book(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pujaBookings });
      toast.success('Puja booked successfully!');
    },
    onError: () => toast.error('Failed to book puja'),
  });
}
