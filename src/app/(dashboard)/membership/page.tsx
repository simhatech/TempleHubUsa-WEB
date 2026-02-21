'use client';

import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { useMembershipStatus, useCancelMembership } from '@/lib/hooks/use-membership';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Crown } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils/format';

export default function MembershipPage() {
  const { data: membership, isLoading, error } = useMembershipStatus();
  const cancelMembership = useCancelMembership();

  return (
    <div>
      <PageHeader title="Membership" description="Manage your temple membership" />

      {isLoading ? (
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-4 h-4 w-64" />
          </CardContent>
        </Card>
      ) : error || !membership ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12">
            <Crown className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Active Membership</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Visit a temple page to explore membership plans
            </p>
            <Button asChild className="mt-4">
              <a href="/temples">Browse Temples</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Current Membership
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge status={membership.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Billing</span>
                <span className="font-medium">{membership.billingCycle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Price Paid</span>
                <span className="font-medium">{formatCurrency(membership.pricePaid)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Start Date</span>
                <span>{formatDate(membership.startDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">End Date</span>
                <span>{formatDate(membership.endDate)}</span>
              </div>

              {membership.status === 'ACTIVE' && (
                <ConfirmDialog
                  trigger={
                    <Button variant="outline" className="mt-4 w-full">
                      Cancel Membership
                    </Button>
                  }
                  title="Cancel Membership?"
                  description="Are you sure you want to cancel your membership? You'll lose access to member benefits."
                  confirmLabel="Cancel Membership"
                  variant="destructive"
                  onConfirm={() => cancelMembership.mutate()}
                />
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
