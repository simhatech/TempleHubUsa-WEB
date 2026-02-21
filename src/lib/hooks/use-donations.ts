'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { donationsApi, type CreateDonationRequest } from '@/lib/api/donations';
import { QUERY_KEYS } from '@/lib/utils/constants';
import { toast } from 'sonner';

export function useMyDonations() {
  return useQuery({
    queryKey: QUERY_KEYS.donations,
    queryFn: donationsApi.getMyDonations,
  });
}

export function useDonationStats() {
  return useQuery({
    queryKey: QUERY_KEYS.donationStats,
    queryFn: donationsApi.getStats,
  });
}

export function useCreateDonation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDonationRequest) => donationsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.donations });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.donationStats });
      toast.success('Thank you for your donation!');
    },
    onError: () => toast.error('Donation failed. Please try again.'),
  });
}
