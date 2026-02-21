'use client';

import { Calendar } from 'lucide-react';
import { useUpcomingEvents } from '@/lib/hooks/use-events';
import { useTemples } from '@/lib/hooks/use-temples';
import { EventCard, EventCardSkeleton } from '@/components/event/event-card';
import { EmptyState } from '@/components/shared/empty-state';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';

export default function EventsPage() {
  const { data: events, isLoading, isError } = useUpcomingEvents();
  const { data: templesData } = useTemples({ page: 0, size: 200 });

  // Build a map of templeId -> temple name for displaying on event cards
  const templeMap = new Map<number, string>();
  if (templesData?.content) {
    for (const temple of templesData.content) {
      templeMap.set(temple.id, temple.name);
    }
  }

  const upcomingEvents = events ?? [];

  return (
    <div className="container mx-auto px-4 py-10">
      <PageHeader
        title="Upcoming Events"
        description="Discover festivals, cultural programs, and spiritual events at temples across the country"
      />

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <EmptyState
          title="Unable to load events"
          description="Something went wrong while fetching events. Please try again."
          icon={<Calendar className="h-12 w-12" />}
        >
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </EmptyState>
      )}

      {/* Empty State */}
      {!isLoading && !isError && upcomingEvents.length === 0 && (
        <EmptyState
          title="No upcoming events"
          description="There are no upcoming events scheduled at this time. Check back soon for festivals, cultural programs, and community gatherings."
          icon={<Calendar className="h-12 w-12" />}
        />
      )}

      {/* Events List */}
      {!isLoading && !isError && upcomingEvents.length > 0 && (
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              templeName={templeMap.get(event.templeId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
