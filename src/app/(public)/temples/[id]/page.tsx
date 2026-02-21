'use client';

import { use } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  HandHelping,
  UtensilsCrossed,
  Heart,
  ArrowLeft,
  Clock,
  Users,
  Building2,
} from 'lucide-react';
import { useTemple } from '@/lib/hooks/use-temples';
import { useUpcomingEvents } from '@/lib/hooks/use-events';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { formatDateTime } from '@/lib/utils/format';
import { cn } from '@/lib/utils';

interface TempleDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TempleDetailPage({ params }: TempleDetailPageProps) {
  const { id } = use(params);
  const templeId = parseInt(id, 10);
  const { isAuthenticated } = useAuthStore();

  const { data: temple, isLoading: templeLoading, isError: templeError } = useTemple(templeId);
  const { data: events, isLoading: eventsLoading } = useUpcomingEvents(templeId);

  function getServiceLink(path: string) {
    const fullPath = `/dashboard/temple/${templeId}/${path}`;
    if (isAuthenticated) return fullPath;
    return `/login?redirect=${encodeURIComponent(fullPath)}`;
  }

  const serviceLinks = [
    {
      label: 'Book Pujas',
      icon: BookOpen,
      path: 'pujas',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    },
    {
      label: 'Volunteer',
      icon: HandHelping,
      path: 'seva',
      color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    },
    {
      label: 'Order Prasadam',
      icon: UtensilsCrossed,
      path: 'prasadam',
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    },
    {
      label: 'Donate',
      icon: Heart,
      path: 'donations',
      color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    },
  ];

  // Loading State
  if (templeLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Skeleton className="mb-6 h-8 w-40" />
        <div className="mb-8">
          <Skeleton className="mb-3 h-10 w-2/3" />
          <Skeleton className="h-5 w-1/3" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      </div>
    );
  }

  // Error State
  if (templeError || !temple) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20">
        <Building2 className="mb-4 h-16 w-16 text-muted-foreground" />
        <h2 className="mb-2 text-2xl font-bold">Temple Not Found</h2>
        <p className="mb-6 text-muted-foreground">
          The temple you are looking for does not exist or may have been removed.
        </p>
        <Button asChild>
          <Link href="/temples">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Link>
        </Button>
      </div>
    );
  }

  const upcomingEvents = events ?? [];

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Back Link */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/temples">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="mb-10">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl font-bold text-primary">
            {temple.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{temple.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>
                {temple.address}, {temple.city}, {temple.state} {temple.zipCode}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Info & Events */}
        <div className="space-y-8 lg:col-span-2">
          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Address Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-4 w-4 text-primary" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {temple.address}
                </p>
                <p className="text-sm text-muted-foreground">
                  {temple.city}, {temple.state} {temple.zipCode}
                </p>
                {temple.latitude && temple.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${temple.latitude},${temple.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Open in Google Maps
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Phone className="h-4 w-4 text-primary" />
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  For inquiries, please visit the temple or reach out through the
                  temple&apos;s official channels.
                </p>
                {temple.isIntegrated && (
                  <Badge variant="secondary" className="text-xs">
                    Verified Partner Temple
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events Section */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Upcoming Events</h2>

            {eventsLoading && (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
              </div>
            )}

            {!eventsLoading && upcomingEvents.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center py-10 text-center">
                  <Calendar className="mb-3 h-10 w-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No upcoming events scheduled at this temple.
                  </p>
                </CardContent>
              </Card>
            )}

            {!eventsLoading && upcomingEvents.length > 0 && (
              <div className="space-y-3">
                {upcomingEvents.slice(0, 5).map((event) => (
                  <Card key={event.id} className="transition-shadow hover:shadow-sm">
                    <CardContent className="flex items-center gap-4 py-4">
                      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {formatDateTime(event.startTime)}
                          </span>
                          {event.maxAttendees && (
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              {event.currentAttendees}/{event.maxAttendees}
                            </span>
                          )}
                        </div>
                      </div>
                      {event.category && (
                        <Badge variant="secondary" className="shrink-0">
                          {event.category}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {upcomingEvents.length > 5 && (
                  <div className="pt-2 text-center">
                    <Button variant="link" asChild>
                      <Link href="/events">View All Events</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Services */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Temple Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {serviceLinks.map((service) => {
                const Icon = service.icon;
                return (
                  <Button
                    key={service.path}
                    variant="outline"
                    asChild
                    className="h-auto w-full justify-start px-4 py-3"
                  >
                    <Link href={getServiceLink(service.path)}>
                      <div
                        className={cn(
                          'mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                          service.color,
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{service.label}</span>
                    </Link>
                  </Button>
                );
              })}

              {!isAuthenticated && (
                <>
                  <Separator className="my-4" />
                  <p className="text-center text-xs text-muted-foreground">
                    Please{' '}
                    <Link href="/login" className="font-medium text-primary hover:underline">
                      sign in
                    </Link>{' '}
                    or{' '}
                    <Link href="/register" className="font-medium text-primary hover:underline">
                      create an account
                    </Link>{' '}
                    to access temple services.
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

