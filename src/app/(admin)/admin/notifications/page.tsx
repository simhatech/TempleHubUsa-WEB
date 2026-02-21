'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PageHeader } from '@/components/shared/page-header';
import { useSendNotification } from '@/lib/hooks/use-admin';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bell, Plus, Send } from 'lucide-react';

interface NotificationFormValues {
  title: string;
  message: string;
  audience: string;
}

interface SentNotification {
  id: string;
  title: string;
  message: string;
  audience: string;
  audienceLabel: string;
  timestamp: Date;
}

const AUDIENCE_OPTIONS = [
  { value: 'all_devotees', label: 'All Devotees' },
  { value: 'members', label: 'Members Only' },
  { value: 'premium_members', label: 'Premium Members' },
  { value: 'staff', label: 'Staff' },
] as const;

function getAudienceLabel(topic: string): string {
  return AUDIENCE_OPTIONS.find((opt) => opt.value === topic)?.label ?? topic;
}

export default function AdminNotificationsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sentNotifications, setSentNotifications] = useState<SentNotification[]>([]);
  const sendNotification = useSendNotification();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NotificationFormValues>({
    defaultValues: {
      title: '',
      message: '',
      audience: 'all_devotees',
    },
  });

  const selectedAudience = watch('audience');

  const onSubmit = (data: NotificationFormValues) => {
    sendNotification.mutate(
      {
        title: data.title,
        body: data.message,
        topic: data.audience,
        type: 'push',
      },
      {
        onSuccess: () => {
          setSentNotifications((prev) => [
            {
              id: crypto.randomUUID(),
              title: data.title,
              message: data.message,
              audience: data.audience,
              audienceLabel: getAudienceLabel(data.audience),
              timestamp: new Date(),
            },
            ...prev,
          ]);
          setDialogOpen(false);
          reset();
        },
      },
    );
  };

  return (
    <div>
      <PageHeader title="Notifications" description="Send push notifications to users">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Send New Notification
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send New Notification</DialogTitle>
              <DialogDescription>
                Compose and send a push notification to your selected audience.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Notification title"
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Write your notification message..."
                  rows={4}
                  {...register('message', { required: 'Message is required' })}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Audience</Label>
                <Select
                  value={selectedAudience}
                  onValueChange={(value) => setValue('audience', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    {AUDIENCE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button type="submit" disabled={sendNotification.isPending}>
                  <Send className="mr-2 h-4 w-4" />
                  {sendNotification.isPending ? 'Sending...' : 'Send Notification'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {sentNotifications.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center">
          <Bell className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">No notifications sent yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Click &quot;Send New Notification&quot; to get started.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {sentNotifications.map((notification) => (
            <Card key={notification.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                </div>
                <Badge variant="secondary">{notification.audienceLabel}</Badge>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Sent {notification.timestamp.toLocaleString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
