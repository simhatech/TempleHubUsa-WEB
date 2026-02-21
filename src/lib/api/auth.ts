import apiClient from './client';
import type { LoginRequest, RegisterRequest, GoogleSignInRequest, AuthResponse } from '@/types/auth';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>('/auth/login', data).then((r) => r.data),

  register: (data: RegisterRequest) =>
    apiClient.post<AuthResponse>('/auth/register', data).then((r) => r.data),

  googleSignIn: (data: GoogleSignInRequest) =>
    apiClient.post<AuthResponse>('/auth/google', data).then((r) => r.data),
};
