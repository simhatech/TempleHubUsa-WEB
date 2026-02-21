'use client';

import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { StatusBadge } from '@/components/shared/status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar } from 'lucide-react';
import { useUpcomingEvents } from '@/lib/hooks/use-events';
import { formatDateTime } from '@/lib/utils/format';
import Link from 'next/link';

export default function MyEventsPage() {
  const { data: events, isLoading } = useUpcomingEvents();

  return (
    <div>
      <PageHeader title="My Events" description="Events you've RSVP'd to">
        <Button asChild>
          <Link href="/temples">Browse Temples</Link>
        </Button>
      </PageHeader>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="mt-2 h-4 w-32" />
                <Skeleton className="mt-2 h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : !events?.length ? (
        <EmptyState
          title="No events yet"
          description="Browse temples to find events and RSVP"
          icon={<Calendar className="h-12 w-12" />}
        >
          <Button asChild>
            <Link href="/temples">Explore Temples</Link>
          </Button>
        </EmptyState>
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
                <p className="text-sm text-muted-foreground">
                  {formatDateTime(event.startTime)} - {formatDateTime(event.endTime)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {event.currentAttendees}
                  {event.maxAttendees ? ` / ${event.maxAttendees}` : ''} attendees
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
