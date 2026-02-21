'use client';

import { use, useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { usePujas, useBookPuja } from '@/lib/hooks/use-pujas';
import { useTemple } from '@/lib/hooks/use-temples';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { BookOpen, Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format';
import type { Puja } from '@/types';

export default function TemplePujasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const templeId = Number(id);
  const { data: temple } = useTemple(templeId);
  const { data: pujas, isLoading } = usePujas();
  const bookPuja = useBookPuja();
  const [selectedPuja, setSelectedPuja] = useState<Puja | null>(null);
  const [scheduledDate, setScheduledDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const templePujas = pujas?.filter((p) => p.templeId === templeId && p.isActive);

  function handleBook() {
    if (!selectedPuja || !scheduledDate) return;
    bookPuja.mutate(
      {
        pujaId: selectedPuja.id,
        scheduledDate,
        specialInstructions: specialInstructions || undefined,
      },
      {
        onSuccess: () => {
          setSelectedPuja(null);
          setScheduledDate('');
          setSpecialInstructions('');
        },
      },
    );
  }

  return (
    <div>
      <PageHeader
        title={`Pujas at ${temple?.name || 'Temple'}`}
        description="Browse and book pujas"
      />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="mt-2 h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : !templePujas?.length ? (
        <EmptyState
          title="No pujas available"
          description="There are no active pujas at this temple"
          icon={<BookOpen className="h-12 w-12" />}
        />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templePujas.map((puja) => (
              <Card key={puja.id} className="flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{puja.name}</CardTitle>
                    {puja.category && <Badge variant="outline">{puja.category}</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  {puja.description && (
                    <p className="mb-3 text-sm text-muted-foreground">{puja.description}</p>
                  )}
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {puja.durationMinutes} minutes
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {formatCurrency(puja.price)}
                      </span>
                      <Button size="sm" onClick={() => setSelectedPuja(puja)}>
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={!!selectedPuja} onOpenChange={(open) => !open && setSelectedPuja(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book {selectedPuja?.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Price</label>
                  <p className="text-lg font-bold text-primary">
                    {selectedPuja && formatCurrency(selectedPuja.price)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Select Date</label>
                  <Input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="mt-1"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Special Instructions (optional)</label>
                  <Textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="mt-1"
                    placeholder="Any special requests..."
                  />
                </div>
                <Button
                  onClick={handleBook}
                  disabled={!scheduledDate || bookPuja.isPending}
                  className="w-full"
                >
                  {bookPuja.isPending ? 'Booking...' : 'Confirm Booking'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}

