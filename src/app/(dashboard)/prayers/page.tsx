'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Clock, Flame, Heart, Play, Star, Target, Trophy } from 'lucide-react';
import { toast } from 'sonner';

const prayerCategories = [
  {
    emoji: '🙏',
    title: 'Morning Prayers',
    description: 'Start your day with divine blessings',
    count: 12,
  },
  {
    emoji: '🌅',
    title: 'Evening Aarti',
    description: 'End your day with devotion',
    count: 8,
  },
  {
    emoji: '📿',
    title: 'Mantras',
    description: 'Sacred chants for meditation',
    count: 15,
  },
  {
    emoji: '🕉️',
    title: 'Meditation',
    description: 'Guided spiritual meditation',
    count: 6,
  },
];

const weeklyStreaks = [
  { name: 'Morning Prayer', completed: 7, total: 7, icon: '🌄' },
  { name: 'Evening Aarti', completed: 5, total: 7, icon: '🪔' },
  { name: 'Gayatri Mantra', completed: 108, total: 108, icon: '📿' },
];

const favoritePrayers = [
  {
    name: 'Ganesh Vandana',
    duration: '5 min',
    description: 'Prayer to Lord Ganesh for removing obstacles',
  },
  {
    name: 'Surya Namaskara',
    duration: '12 min',
    description: 'Salutation to the Sun God',
  },
  {
    name: 'Shiva Stotram',
    duration: '8 min',
    description: 'Hymn in praise of Lord Shiva',
  },
];

export default function PrayersPage() {
  const handlePlay = () => {
    toast.info('Coming soon', {
      description: 'Audio playback will be available in a future update.',
    });
  };

  return (
    <div>
      <PageHeader title="Prayers & Mantras" description="Daily devotional practice">
        <Badge variant="secondary">Preview</Badge>
      </PageHeader>

      {/* Today's Prayer Goal */}
      <Card className="mb-8 overflow-hidden border-0">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-wide opacity-90">
              Today&apos;s Prayer Goal
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold">3/5</p>
              <p className="text-sm opacity-80">Prayers Completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold">25</p>
              <p className="text-sm opacity-80">Minutes Today</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-3xl font-bold">
                <Flame className="inline h-7 w-7" /> 7
              </p>
              <p className="text-sm opacity-80">Day Streak</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-sm opacity-80">
              <span>Progress</span>
              <span>60%</span>
            </div>
            <Progress value={60} className="h-3 bg-white/30 [&>div]:bg-white" />
          </div>
        </div>
      </Card>

      {/* Prayer Categories */}
      <h2 className="mb-4 text-lg font-semibold">Categories</h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {prayerCategories.map((category) => (
          <Card
            key={category.title}
            className="cursor-pointer transition-colors hover:bg-muted/50"
            onClick={handlePlay}
          >
            <CardContent className="flex items-center gap-4 p-6">
              <span className="text-4xl">{category.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold">{category.title}</p>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
              <Badge variant="secondary">{category.count}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Prayer Tracker */}
      <h2 className="mb-4 text-lg font-semibold">Weekly Streak</h2>
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="space-y-6">
            {weeklyStreaks.map((streak) => (
              <div key={streak.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{streak.icon}</span>
                    <span className="text-sm font-medium">{streak.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {streak.completed}/{streak.total}
                    </span>
                    {streak.completed === streak.total && (
                      <Trophy className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                </div>
                <Progress
                  value={(streak.completed / streak.total) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Favorite Prayers */}
      <h2 className="mb-4 text-lg font-semibold">Favorite Prayers</h2>
      <div className="space-y-3">
        {favoritePrayers.map((prayer, idx) => (
          <Card key={prayer.name}>
            <CardContent className="flex items-center gap-4 p-4">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-full"
                onClick={handlePlay}
              >
                <Play className="h-4 w-4" />
              </Button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{prayer.name}</p>
                  <Heart className="h-4 w-4 shrink-0 fill-red-500 text-red-500" />
                </div>
                <p className="text-sm text-muted-foreground truncate">{prayer.description}</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                <Clock className="h-3.5 w-3.5" />
                {prayer.duration}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
