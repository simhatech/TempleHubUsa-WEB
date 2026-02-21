'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { templesApi, type TempleQueryParams } from '@/lib/api/temples';
import { QUERY_KEYS } from '@/lib/utils/constants';
import { toast } from 'sonner';

export function useTemples(params?: TempleQueryParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.temples, params],
    queryFn: () => templesApi.list(params),
  });
}

export function useTemple(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.temple(id),
    queryFn: () => templesApi.getById(id),
    enabled: !!id,
  });
}

export function useTempleCount() {
  return useQuery({
    queryKey: QUERY_KEYS.templeCount,
    queryFn: () => templesApi.getCount(),
  });
}

export function useCreateTemple() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: templesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.temples });
      toast.success('Temple created successfully');
    },
    onError: () => toast.error('Failed to create temple'),
  });
}

export function useUpdateTemple() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) =>
      templesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.temple(variables.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.temples });
      toast.success('Temple updated successfully');
    },
    onError: () => toast.error('Failed to update temple'),
  });
}
