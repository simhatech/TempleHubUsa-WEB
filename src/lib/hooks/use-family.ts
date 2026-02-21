'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { familyApi, type AddFamilyMemberRequest } from '@/lib/api/family';
import { QUERY_KEYS } from '@/lib/utils/constants';
import { toast } from 'sonner';

export function useFamilyMembers() {
  return useQuery({
    queryKey: QUERY_KEYS.familyMembers,
    queryFn: familyApi.getMembers,
  });
}

export function useAddFamilyMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddFamilyMemberRequest) => familyApi.addMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.familyMembers });
      toast.success('Family member added');
    },
    onError: () => toast.error('Failed to add family member'),
  });
}

export function useRemoveFamilyMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: familyApi.removeMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.familyMembers });
      toast.success('Family member removed');
    },
    onError: () => toast.error('Failed to remove family member'),
  });
}
