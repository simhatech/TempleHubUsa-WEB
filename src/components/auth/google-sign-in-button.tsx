'use client';

import { GoogleLogin } from '@react-oauth/google';
import { useGoogleSignIn } from '@/lib/hooks/use-auth';
import { Loader2 } from 'lucide-react';

interface GoogleSignInButtonProps {
  disabled?: boolean;
}

export function GoogleSignInButton({ disabled }: GoogleSignInButtonProps) {
  const googleSignIn = useGoogleSignIn();

  if (googleSignIn.isPending) {
    return (
      <div className="flex h-10 w-full items-center justify-center rounded-md border bg-background">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <span className="text-sm">Signing in...</span>
      </div>
    );
  }

  if (disabled) {
    return (
      <div className="flex h-10 w-full items-center justify-center rounded-md border bg-muted opacity-50">
        <span className="text-sm text-muted-foreground">Continue with Google</span>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center [&>div]:w-full">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            googleSignIn.mutate({ idToken: credentialResponse.credential });
          }
        }}
        onError={() => {
          // Error is handled by the mutation's onError
          googleSignIn.mutate({ idToken: '' });
        }}
        width="400"
        text="continue_with"
        shape="rectangular"
        theme="outline"
      />
    </div>
  );
}
