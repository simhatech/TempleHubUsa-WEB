import apiClient from './client';
import type { LoginRequest, RegisterRequest, GoogleSignInRequest, AuthResponse } from '@/types/auth';
import type { User } from '@/types';

/** Maps the flat backend AuthResponse to the nested structure the frontend expects. */
function mapAuthResponse(data: Record<string, unknown>): AuthResponse {
  return {
    token: data.token as string,
    user: {
      id: data.userId as number,
      email: data.email as string,
      fullName: data.fullName as string,
      role: (data.role as User['role']) || 'DEVOTEE',
      membershipTier: data.membershipTier as string | undefined,
    },
  };
}

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post('/auth/login', data).then((r) => mapAuthResponse(r.data)),

  register: (data: RegisterRequest) =>
    apiClient.post('/auth/register', data).then((r) => mapAuthResponse(r.data)),

  googleSignIn: (data: GoogleSignInRequest) =>
    apiClient.post('/auth/google', data).then((r) => mapAuthResponse(r.data)),
};
