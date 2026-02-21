'use client';

import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { StatusBadge } from '@/components/shared/status-badge';
import { useMySevaRegistrations, useCancelSeva } from '@/lib/hooks/use-seva';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { HandHelping } from 'lucide-react';
import { formatDate } from '@/lib/utils/format';

export default function MySevaPage() {
  const { data: registrations, isLoading } = useMySevaRegistrations();
  const cancelSeva = useCancelSeva();

  return (
    <div>
      <PageHeader title="My Seva" description="Your volunteer registrations" />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="mt-2 h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : !registrations?.length ? (
        <EmptyState
          title="No seva registrations"
          description="Browse temples to find volunteer opportunities"
          icon={<HandHelping className="h-12 w-12" />}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {registrations.map((reg) => (
            <Card key={reg.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Seva #{reg.opportunityId}</CardTitle>
                  <StatusBadge status={reg.status} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Registered: {formatDate(reg.registeredAt)}
                </p>
                {reg.completedAt && (
                  <p className="text-sm text-muted-foreground">
                    Completed: {formatDate(reg.completedAt)}
                  </p>
                )}
                {reg.status === 'REGISTERED' && (
                  <ConfirmDialog
                    trigger={
                      <Button variant="outline" size="sm" className="mt-3">
                        Cancel Registration
                      </Button>
                    }
                    title="Cancel Seva Registration?"
                    description="Are you sure you want to cancel this volunteer registration?"
                    confirmLabel="Cancel Registration"
                    variant="destructive"
                    onConfirm={() => cancelSeva.mutate(reg.id)}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
