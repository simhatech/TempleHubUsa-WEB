'use client';

import { use } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { StatusBadge } from '@/components/shared/status-badge';
import { useEvents, useRsvp, useCancelRsvp } from '@/lib/hooks/use-events';
import { useTemple } from '@/lib/hooks/use-temples';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, UserCheck, UserX } from 'lucide-react';
import { formatDateTime } from '@/lib/utils/format';

export default function TempleEventsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const templeId = Number(id);
  const { data: temple } = useTemple(templeId);
  const { data: events, isLoading } = useEvents(templeId);
  const rsvp = useRsvp();
  const cancelRsvp = useCancelRsvp();

  return (
    <div>
      <PageHeader
        title={`Events at ${temple?.name || 'Temple'}`}
        description="Browse and RSVP to events"
      />

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
      ) : !events?.length ? (
        <EmptyState
          title="No events"
          description="There are no upcoming events at this temple"
          icon={<Calendar className="h-12 w-12" />}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  {event.category && <StatusBadge status={event.category} />}
                </div>
              </CardHeader>
              <CardContent>
                {event.description && (
                  <p className="mb-2 text-sm text-muted-foreground">{event.description}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  {formatDateTime(event.startTime)}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {event.currentAttendees}
                    {event.maxAttendees ? ` / ${event.maxAttendees}` : ''} attending
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => rsvp.mutate(event.id)}
                      disabled={rsvp.isPending}
                    >
                      <UserCheck className="mr-1 h-4 w-4" />
                      RSVP
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => cancelRsvp.mutate(event.id)}
                      disabled={cancelRsvp.isPending}
                    >
                      <UserX className="mr-1 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

