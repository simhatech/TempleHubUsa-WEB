import apiClient from './client';
import type { User } from '@/types';

export interface UpdateProfileRequest {
  fullName?: string;
  phone?: string;
}

export const usersApi = {
  getProfile: () => apiClient.get<User>('/users/profile').then((r) => r.data),

  updateProfile: (data: UpdateProfileRequest) =>
    apiClient.put<User>('/users/profile', data).then((r) => r.data),

  registerFcmToken: (data: { fcmToken: string; deviceType: string }) =>
    apiClient.post('/users/fcm-token', data).then((r) => r.data),
};
