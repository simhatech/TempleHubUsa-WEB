'use client';

import Link from 'next/link';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/lib/utils/format';
import { cn } from '@/lib/utils';
import type { Event } from '@/types';

interface EventCardProps {
  event: Event;
  templeName?: string;
  className?: string;
}

const categoryColors: Record<string, string> = {
  FESTIVAL: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  CULTURAL: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  EDUCATIONAL: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  SPIRITUAL: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  COMMUNITY: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
};

export function EventCard({ event, templeName, className }: EventCardProps) {
  const startDate = new Date(event.startTime);
  const month = startDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = startDate.getDate();

  return (
    <Card className={cn('transition-shadow hover:shadow-md', className)}>
      <CardContent className="flex gap-4 py-4">
        {/* Date Badge */}
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
            {month}
          </span>
          <span className="text-lg font-bold leading-tight text-primary">{day}</span>
        </div>

        {/* Event Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-tight">
              <Link
                href={`/temples/${event.templeId}`}
                className="hover:text-primary hover:underline"
              >
                {event.title}
              </Link>
            </h3>
            {event.category && (
              <Badge
                variant="outline"
                className={cn(
                  'shrink-0 text-[10px]',
                  categoryColors[event.category] || '',
                )}
              >
                {event.category}
              </Badge>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatDateTime(event.startTime)}
            </span>

            {event.maxAttendees && (
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {event.currentAttendees}
                {event.maxAttendees ? `/${event.maxAttendees}` : ''} attendees
              </span>
            )}

            {!event.maxAttendees && event.currentAttendees > 0 && (
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {event.currentAttendees} attending
              </span>
            )}
          </div>

          {templeName && (
            <div className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <Link
                href={`/temples/${event.templeId}`}
                className="hover:text-foreground hover:underline"
              >
                {templeName}
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function EventCardSkeleton() {
  return (
    <Card>
      <CardContent className="flex gap-4 py-4">
        <div className="h-14 w-14 shrink-0 animate-pulse rounded-lg bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}
