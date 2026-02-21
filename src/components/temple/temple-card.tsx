'use client';

import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Temple } from '@/types';
import { cn } from '@/lib/utils';

interface TempleCardProps {
  temple: Temple;
  className?: string;
}

const themeColors: Record<string, string> = {
  DEFAULT: 'bg-primary/10 text-primary',
  GANESH: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  LAKSHMI: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  SHIVA: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  DURGA: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export function TempleCard({ temple, className }: TempleCardProps) {
  const colorClass = themeColors[temple.colorTheme || 'DEFAULT'] || themeColors.DEFAULT;

  return (
    <Card className={cn('flex h-full flex-col transition-shadow hover:shadow-md', className)}>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg font-bold',
              colorClass,
            )}
          >
            {temple.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <CardTitle className="line-clamp-2 text-base">{temple.name}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="line-clamp-2">
            {temple.city}, {temple.state} {temple.zipCode}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link href={`/temples/${temple.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function TempleCardSkeleton() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 h-4 w-4 shrink-0 animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-8 w-full animate-pulse rounded-md bg-muted" />
      </CardFooter>
    </Card>
  );
}
