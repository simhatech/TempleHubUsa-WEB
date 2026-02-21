'use client';

import { useAuthStore } from '@/lib/stores/auth-store';
import { AuthGuard } from './auth-guard';
import type { UserRole } from '@/types';
import { ShieldAlert } from 'lucide-react';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  return (
    <AuthGuard>
      <RoleCheck allowedRoles={allowedRoles}>{children}</RoleCheck>
    </AuthGuard>
  );
}

function RoleCheck({
  allowedRoles,
  children,
}: {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}) {
  const user = useAuthStore((s) => s.user);

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <ShieldAlert className="h-16 w-16 text-destructive" />
        <h1 className="mt-4 text-2xl font-bold">Access Denied</h1>
        <p className="mt-2 text-muted-foreground">
          You don&apos;t have permission to access this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
