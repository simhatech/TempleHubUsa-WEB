'use client';

import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { useMyDonations, useDonationStats } from '@/lib/hooks/use-donations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils/format';

export default function MyDonationsPage() {
  const { data: donations, isLoading } = useMyDonations();
  const { data: stats, isLoading: statsLoading } = useDonationStats();

  return (
    <div>
      <PageHeader title="My Donations" description="Your donation history and receipts" />

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Donated</CardTitle>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Donations
            </CardTitle>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Donation
            </CardTitle>
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

      {/* Donations Table */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : !donations?.length ? (
        <EmptyState
          title="No donations yet"
          description="Support your temple community by making a donation"
          icon={<Heart className="h-12 w-12" />}
        />
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
              {donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>{formatDate(donation.createdAt || '')}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(donation.amount)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{donation.purpose}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {donation.receiptNumber || '-'}
                  </TableCell>
                  <TableCell>{donation.isAnonymous ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
