'use client';

import { PageHeader } from '@/components/shared/page-header';
import { useAdminDonations, useAdminDonationStats } from '@/lib/hooks/use-admin';
import { useTempleContextStore } from '@/lib/stores/temple-context-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency, formatDate } from '@/lib/utils/format';

export default function AdminDonationsPage() {
  const templeId = useTempleContextStore((s) => s.selectedTempleId);
  const { data: donations, isLoading } = useAdminDonations(templeId ?? undefined);
  const { data: stats, isLoading: statsLoading } = useAdminDonationStats(templeId ?? undefined);

  return (
    <div>
      <PageHeader title="Donation Reports" description="View and manage temple donations" />

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Donations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-2xl font-bold">{formatCurrency(stats?.totalAmount || 0)}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Count</CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{stats?.totalCount || 0}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average</CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-2xl font-bold">{formatCurrency(stats?.averageAmount || 0)}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {!templeId ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Select a temple to view donations</p>
        </Card>
      ) : isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Receipt #</TableHead>
                <TableHead>Anonymous</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations?.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>{formatDate(d.createdAt || '')}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(d.amount)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{d.purpose}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{d.receiptNumber || '-'}</TableCell>
                  <TableCell>{d.isAnonymous ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
