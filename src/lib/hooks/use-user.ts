'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi, type UpdateProfileRequest } from '@/lib/api/users';
import { useAuthStore } from '@/lib/stores/auth-store';
import { QUERY_KEYS } from '@/lib/utils/constants';
import { toast } from 'sonner';

export function useUserProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.userProfile,
    queryFn: usersApi.getProfile,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const updateUser = useAuthStore((s) => s.updateUser);

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => usersApi.updateProfile(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userProfile });
      updateUser(data);
      toast.success('Profile updated');
    },
    onError: () => toast.error('Failed to update profile'),
  });
}
