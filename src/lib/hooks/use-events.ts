'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi } from '@/lib/api/events';
import { QUERY_KEYS } from '@/lib/utils/constants';
import { toast } from 'sonner';

export function useEvents(templeId?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.events(templeId),
    queryFn: () => eventsApi.getByTemple(templeId!),
    enabled: !!templeId,
  });
}

export function useUpcomingEvents(templeId?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.upcomingEvents(templeId),
    queryFn: () => eventsApi.getUpcoming(templeId),
  });
}

export function useRsvp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eventsApi.rsvp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('RSVP confirmed!');
    },
    onError: () => toast.error('Failed to RSVP'),
  });
}

export function useCancelRsvp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eventsApi.cancelRsvp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('RSVP cancelled');
    },
    onError: () => toast.error('Failed to cancel RSVP'),
  });
}
