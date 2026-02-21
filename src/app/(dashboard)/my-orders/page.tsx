'use client';

import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { StatusBadge } from '@/components/shared/status-badge';
import { useMyPrasadamOrders } from '@/lib/hooks/use-prasadam';
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
import { ShoppingBag } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils/format';

export default function MyOrdersPage() {
  const { data: orders, isLoading } = useMyPrasadamOrders();

  return (
    <div>
      <PageHeader title="My Orders" description="Your prasadam order history" />

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : !orders?.length ? (
        <EmptyState
          title="No orders yet"
          description="Browse temples to order prasadam"
          icon={<ShoppingBag className="h-12 w-12" />}
        />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{formatDate(order.createdAt || '')}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(order.amount)}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
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
