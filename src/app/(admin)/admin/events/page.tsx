'use client';

import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { useAdminEvents } from '@/lib/hooks/use-admin';
import { useTempleContextStore } from '@/lib/stores/temple-context-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Pencil } from 'lucide-react';
import { formatDateTime } from '@/lib/utils/format';
import Link from 'next/link';

export default function AdminEventsPage() {
  const templeId = useTempleContextStore((s) => s.selectedTempleId);
  const { data: events, isLoading } = useAdminEvents(templeId ?? undefined);

  return (
    <div>
      <PageHeader title="Manage Events" description="Create and manage temple events">
        <Button asChild>
          <Link href="/admin/events/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </PageHeader>

      {!templeId ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            Select a temple from the context to view events
          </p>
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
                <TableHead>Title</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events?.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{formatDateTime(event.startTime)}</TableCell>
                  <TableCell>
                    {event.category && <StatusBadge status={event.category} />}
                  </TableCell>
                  <TableCell>
                    {event.currentAttendees}
                    {event.maxAttendees ? ` / ${event.maxAttendees}` : ''}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={event.isActive ? 'ACTIVE' : 'INACTIVE'} />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/events/${event.id}/edit`}>
                        <Pencil className="mr-1 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
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
