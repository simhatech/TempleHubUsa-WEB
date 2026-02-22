'use client';

import { PageHeader } from '@/components/shared/page-header';
import { useAdminFinanceTransactions, useAdminFinanceSummary } from '@/lib/hooks/use-admin';
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
import { DollarSign, Heart, BookOpen, UtensilsCrossed, Crown } from 'lucide-react';

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  SUCCESS: 'default',
  PENDING: 'secondary',
  FAILED: 'destructive',
  REFUNDED: 'outline',
};

export default function AdminFinancesPage() {
  const templeId = useTempleContextStore((s) => s.selectedTempleId) ?? undefined;
  const { data: summary, isLoading: summaryLoading } = useAdminFinanceSummary(templeId);
  const { data: transactions, isLoading } = useAdminFinanceTransactions(templeId);

  const summaryCards = [
    { label: 'Total Revenue', value: summary?.totalRevenue, icon: DollarSign },
    { label: 'Donations', value: summary?.totalDonations, icon: Heart },
    { label: 'Puja Bookings', value: summary?.totalPujaBookings, icon: BookOpen },
    { label: 'Prasadam Orders', value: summary?.totalPrasadamOrders, icon: UtensilsCrossed },
    { label: 'Memberships', value: summary?.totalMemberships, icon: Crown },
  ];

  return (
    <div>
      <PageHeader title="Finances" description="Revenue summary and transaction history" />

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {summaryCards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {summaryLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <p className="text-2xl font-bold">{formatCurrency(card.value || 0)}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transactions Table */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : !transactions?.length ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No transactions found</p>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="text-muted-foreground">#{t.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {t.paymentType.replace(/_/g, ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{formatCurrency(t.amount)}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[t.status] || 'secondary'}>
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {t.paymentMethod || '-'}
                  </TableCell>
                  <TableCell>{t.createdAt ? formatDate(t.createdAt) : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
