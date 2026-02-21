'use client';

import { useMemo } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useMyDonations, useDonationStats } from '@/lib/hooks/use-donations';
import { useMyBookings } from '@/lib/hooks/use-pujas';
import { useFamilyMembers } from '@/lib/hooks/use-family';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Calendar,
  Heart,
  BookOpen,
  Users,
  HandHelping,
  Building2,
  MapPin,
  ScrollText,
  HandHeart,
  Music,
  Video,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils/format';

const dailyQuotes = [
  {
    text: 'You have the right to perform your duty, but you are not entitled to the fruits of your actions.',
    source: 'Bhagavad Gita 2.47',
  },
  {
    text: 'The soul is neither born, and nor does it die.',
    source: 'Bhagavad Gita 2.20',
  },
  {
    text: 'When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.',
    source: 'Bhagavad Gita 6.19',
  },
  {
    text: 'Set thy heart upon thy work, but never on its reward.',
    source: 'Bhagavad Gita 2.47',
  },
  {
    text: 'For one who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, the mind will remain the greatest enemy.',
    source: 'Bhagavad Gita 6.6',
  },
  {
    text: 'There is neither this world, nor the world beyond, nor happiness for the one who doubts.',
    source: 'Bhagavad Gita 4.40',
  },
  {
    text: 'Reshape yourself through the power of your will; never let yourself be degraded by self-will.',
    source: 'Bhagavad Gita 6.5',
  },
];

const featureSections = [
  {
    title: 'Worship & Rituals',
    items: [
      { href: '/prayers', label: 'Prayers', icon: HandHeart, color: 'text-orange-500' },
      { href: '/live-darshan', label: 'Live Darshan', icon: Video, color: 'text-red-500' },
      { href: '/scriptures', label: 'Scriptures', icon: ScrollText, color: 'text-amber-600' },
      { href: '/bhajans', label: 'Bhajans', icon: Music, color: 'text-pink-500' },
    ],
  },
  {
    title: 'Services & Giving',
    items: [
      { href: '/my-bookings', label: 'Book Puja', icon: BookOpen, color: 'text-blue-500' },
      { href: '/my-donations', label: 'Donate', icon: Heart, color: 'text-rose-500' },
      { href: '/my-seva', label: 'Volunteer', icon: HandHelping, color: 'text-green-500' },
      { href: '/my-orders', label: 'Prasadam', icon: ShoppingBag, color: 'text-yellow-600' },
    ],
  },
  {
    title: 'Explore',
    items: [
      { href: '/temple-finder', label: 'Find Temple', icon: MapPin, color: 'text-indigo-500' },
      { href: '/my-events', label: 'Events', icon: Calendar, color: 'text-teal-500' },
      { href: '/temples', label: 'All Temples', icon: Building2, color: 'text-violet-500' },
      { href: '/family', label: 'Family', icon: Users, color: 'text-cyan-500' },
    ],
  },
];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data: donationStats, isLoading: statsLoading } = useDonationStats();
  const { data: bookings, isLoading: bookingsLoading } = useMyBookings();
  const { data: family, isLoading: familyLoading } = useFamilyMembers();

  const todaysQuote = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
    );
    return dailyQuotes[dayOfYear % dailyQuotes.length];
  }, []);

  return (
    <div>
      <PageHeader
        title={`Welcome, ${user?.fullName?.split(' ')[0] || 'Devotee'}!`}
        description="Here's an overview of your activity"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Donated
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-2xl font-bold">
                {formatCurrency(donationStats?.totalAmount || 0)}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Donations
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{donationStats?.totalCount || 0}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Puja Bookings
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {bookingsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{bookings?.length || 0}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Family Members
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {familyLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{family?.length || 0}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Feature Grid — grouped */}
      {featureSections.map((section) => (
        <div key={section.title} className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">{section.title}</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {section.items.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                  <CardContent className="flex flex-col items-center gap-2 pt-6">
                    <item.icon className={`h-8 w-8 ${item.color}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Daily Quote */}
      <div className="mt-8">
        <Card className="border-temple-200 bg-gradient-to-r from-temple-50 to-saffron-50 dark:border-temple-800 dark:from-temple-900/20 dark:to-saffron-700/10">
          <CardContent className="flex items-start gap-4 pt-6">
            <Sparkles className="mt-1 h-6 w-6 shrink-0 text-temple-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Daily Quote</p>
              <blockquote className="mt-1 text-base italic leading-relaxed">
                &ldquo;{todaysQuote.text}&rdquo;
              </blockquote>
              <p className="mt-2 text-sm font-medium text-temple-600 dark:text-temple-400">
                — {todaysQuote.source}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
