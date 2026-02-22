'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoginForm } from '@/components/auth/login-form';
import { useGoogleSignIn } from '@/lib/hooks/use-auth';

export default function LoginPage() {
  const googleSignIn = useGoogleSignIn();
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    // After Google OAuth redirect, the access_token is in the URL hash
    const hash = window.location.hash;
    if (hash.includes('access_token=')) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      if (accessToken) {
        // Clear the hash so token isn't visible in URL
        window.history.replaceState(null, '', '/login');
        setGoogleLoading(true);
        googleSignIn.mutate({ idToken: accessToken });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm googleLoading={googleLoading || googleSignIn.isPending} />
      </CardContent>
    </Card>
  );
}
