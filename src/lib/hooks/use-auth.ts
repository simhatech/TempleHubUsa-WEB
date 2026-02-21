'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/stores/auth-store';
import { toast } from 'sonner';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Welcome back!');
      // Use window.location to ensure cookie is sent with the new request
      window.location.href = '/dashboard';
    },
    onError: () => {
      toast.error('Invalid email or password');
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Account created successfully!');
      window.location.href = '/dashboard';
    },
    onError: () => {
      toast.error('Registration failed. Please try again.');
    },
  });
}

export function useGoogleSignIn() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: authApi.googleSignIn,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Welcome!');
      window.location.href = '/dashboard';
    },
    onError: () => {
      toast.error('Google sign-in failed. Please try again.');
    },
  });
}

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return () => {
    clearAuth();
    toast.success('Logged out successfully');
    window.location.href = '/';
  };
}
