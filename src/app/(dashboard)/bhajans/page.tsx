'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  Headphones,
  Clock,
  Music,
  Pause,
  Play,
  Share2,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { toast } from 'sonner';

interface Bhajan {
  emoji: string;
  title: string;
  duration: string;
  artist: string;
  isFavorite: boolean;
}

const bhajans: Bhajan[] = [
  {
    emoji: '🎵',
    title: 'Hare Krishna Maha Mantra',
    duration: '5:30',
    artist: 'Traditional',
    isFavorite: true,
  },
  {
    emoji: '🔱',
    title: 'Om Namah Shivaya',
    duration: '4:15',
    artist: 'Traditional',
    isFavorite: false,
  },
  {
    emoji: '🐒',
    title: 'Hanuman Chalisa',
    duration: '8:20',
    artist: 'Tulsidas',
    isFavorite: true,
  },
  {
    emoji: '☀️',
    title: 'Gayatri Mantra',
    duration: '3:45',
    artist: 'Vedic Chant',
    isFavorite: false,
  },
  {
    emoji: '💙',
    title: 'Shri Ram Jai Ram',
    duration: '6:10',
    artist: 'Traditional',
    isFavorite: true,
  },
  {
    emoji: '🎶',
    title: 'Govind Bolo',
    duration: '4:55',
    artist: 'Devotional',
    isFavorite: false,
  },
];

export default function BhajansPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(bhajans.filter((b) => b.isFavorite).map((b) => b.title))
  );

  const handleComingSoon = () => {
    toast.info('Coming soon', {
      description: 'This feature will be available in a future update.',
    });
  };

  const toggleFavorite = (title: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
    toast.success(favorites.has(title) ? 'Removed from favorites' : 'Added to favorites');
  };

  return (
    <div>
      <PageHeader title="Bhajans & Kirtans" description="Devotional music">
        <Badge variant="secondary">Preview</Badge>
      </PageHeader>

      {/* Now Playing */}
      <Card className="mb-8 overflow-hidden border-0">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Music className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-wide opacity-90">Now Playing</p>
          </div>
          <p className="text-xl font-bold md:text-2xl">Hare Krishna Maha Mantra</p>
          <p className="mt-1 text-sm opacity-80">Traditional &middot; 5:30</p>

          {/* Progress Bar */}
          <div className="mt-4 mb-2">
            <div className="h-1 w-full rounded-full bg-white/30">
              <div className="h-1 w-1/3 rounded-full bg-white transition-all" />
            </div>
            <div className="mt-1 flex justify-between text-xs opacity-70">
              <span>1:48</span>
              <span>5:30</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={handleComingSoon}
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-14 w-14 rounded-full bg-white/20 text-white hover:bg-white/30"
              onClick={() => {
                setIsPlaying(!isPlaying);
                handleComingSoon();
              }}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={handleComingSoon}
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center p-4">
            <Headphones className="mb-1 h-5 w-5 text-muted-foreground" />
            <p className="text-2xl font-bold">25</p>
            <p className="text-xs text-muted-foreground">Listened</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-4">
            <Heart className="mb-1 h-5 w-5 text-muted-foreground" />
            <p className="text-2xl font-bold">8</p>
            <p className="text-xs text-muted-foreground">Favorites</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-4">
            <Clock className="mb-1 h-5 w-5 text-muted-foreground" />
            <p className="text-2xl font-bold">3h</p>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Bhajans List */}
      <h2 className="mb-4 text-lg font-semibold">All Bhajans</h2>
      <div className="space-y-3">
        {bhajans.map((bhajan) => (
          <Card key={bhajan.title}>
            <CardContent className="flex items-center gap-4 p-4">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-full"
                onClick={handleComingSoon}
              >
                <Play className="h-4 w-4" />
              </Button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{bhajan.emoji}</span>
                  <p className="font-medium truncate">{bhajan.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {bhajan.artist} &middot; {bhajan.duration}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => toggleFavorite(bhajan.title)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.has(bhajan.title)
                        ? 'fill-red-500 text-red-500'
                        : 'text-muted-foreground'
                    }`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleComingSoon}
                >
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
