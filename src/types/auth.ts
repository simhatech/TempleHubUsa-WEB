import type { User } from '.';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface GoogleSignInRequest {
  idToken: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
