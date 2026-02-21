'use client';

import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { StatusBadge } from '@/components/shared/status-badge';
import { useMyBookings } from '@/lib/hooks/use-pujas';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BookOpen } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils/format';

export default function MyBookingsPage() {
  const { data: bookings, isLoading } = useMyBookings();

  return (
    <div>
      <PageHeader title="My Puja Bookings" description="Your puja booking history" />

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : !bookings?.length ? (
        <EmptyState
          title="No bookings yet"
          description="Browse temples to book pujas"
          icon={<BookOpen className="h-12 w-12" />}
        />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Puja ID</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Instructions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>#{booking.pujaId}</TableCell>
                  <TableCell>{formatDate(booking.scheduledDate)}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(booking.amount)}</TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">
                    {booking.specialInstructions || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
