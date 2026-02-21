'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Bell,
  Calendar,
  Clock,
  Eye,
  MessageCircle,
  Play,
  Send,
  Users,
  Video,
} from 'lucide-react';
import { toast } from 'sonner';

interface ScheduleItem {
  name: string;
  time: string;
  isLive: boolean;
}

interface ChatMessage {
  username: string;
  message: string;
  time: string;
}

const schedule: ScheduleItem[] = [
  { name: 'Morning Aarti', time: '6:00 AM - 6:30 AM', isLive: true },
  { name: 'Afternoon Darshan', time: '12:00 PM - 1:00 PM', isLive: false },
  { name: 'Evening Aarti', time: '7:00 PM - 8:00 PM', isLive: false },
];

const chatMessages: ChatMessage[] = [
  { username: 'Devotee123', message: 'Om Namah Shivaya 🙏', time: '2 min ago' },
  { username: 'Bhakta456', message: 'Beautiful aarti today', time: '5 min ago' },
  { username: 'Seeker789', message: 'Har Har Mahadev', time: '8 min ago' },
];

export default function LiveDarshanPage() {
  const [notifications, setNotifications] = useState({
    morningAarti: true,
    eveningAarti: true,
    specialEvents: false,
  });
  const [chatInput, setChatInput] = useState('');

  const handlePlay = () => {
    toast.info('Coming soon', {
      description: 'Live streaming will be available in a future update.',
    });
  };

  const handleSendChat = () => {
    if (chatInput.trim()) {
      toast.info('Coming soon', {
        description: 'Live chat will be available in a future update.',
      });
      setChatInput('');
    }
  };

  return (
    <div>
      <PageHeader title="Live Darshan" description="Sacred live experience">
        <Badge variant="secondary">Preview</Badge>
      </PageHeader>

      {/* Video Player Placeholder */}
      <div className="relative mb-8 aspect-video overflow-hidden rounded-lg bg-gray-900">
        {/* LIVE Badge */}
        <div className="absolute left-4 top-4 z-10">
          <Badge className="bg-red-600 text-white hover:bg-red-600">
            <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
            LIVE
          </Badge>
        </div>

        {/* Viewer Count */}
        <div className="absolute right-4 top-4 z-10">
          <Badge variant="secondary" className="bg-black/60 text-white">
            <Eye className="mr-1 h-3 w-3" />
            1,247 viewers
          </Badge>
        </div>

        {/* Center Play Button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-20 w-20 rounded-full bg-white/20 text-white hover:bg-white/30"
            onClick={handlePlay}
          >
            <Play className="h-10 w-10" />
          </Button>
          <p className="mt-4 text-lg font-semibold text-white">Morning Aarti - Live Now</p>
          <p className="mt-1 text-sm text-white/70">Tap to watch</p>
        </div>

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-5 w-5 text-orange-500" />
                Today&apos;s Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((item, idx) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            item.isLive ? 'animate-pulse bg-red-500' : 'bg-muted-foreground/30'
                          }`}
                        />
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      </div>
                      {item.isLive && (
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">
                          Live Now
                        </Badge>
                      )}
                    </div>
                    {idx < schedule.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notification Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-5 w-5 text-orange-500" />
                Notification Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Morning Aarti</p>
                    <p className="text-xs text-muted-foreground">Daily at 6:00 AM</p>
                  </div>
                  <Switch
                    checked={notifications.morningAarti}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, morningAarti: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Evening Aarti</p>
                    <p className="text-xs text-muted-foreground">Daily at 7:00 PM</p>
                  </div>
                  <Switch
                    checked={notifications.eveningAarti}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, eveningAarti: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Special Events</p>
                    <p className="text-xs text-muted-foreground">Festival celebrations & more</p>
                  </div>
                  <Switch
                    checked={notifications.specialEvents}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, specialEvents: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Live Chat */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageCircle className="h-5 w-5 text-orange-500" />
              Live Chat
              <Badge variant="secondary" className="ml-auto">
                <Users className="mr-1 h-3 w-3" />
                156 online
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col">
            {/* Chat Messages */}
            <div className="flex-1 space-y-4 mb-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold">
                    {msg.username.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{msg.username}</p>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="mb-4" />

            {/* Chat Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendChat();
                }}
              />
              <Button size="icon" onClick={handleSendChat}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
