'use client';

import { use, useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { usePrasadamItems, useCreatePrasadamOrder } from '@/lib/hooks/use-prasadam';
import { useTemple } from '@/lib/hooks/use-temples';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UtensilsCrossed } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format';
import type { PrasadamItem } from '@/types';

export default function TemplePrasadamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const templeId = Number(id);
  const { data: temple } = useTemple(templeId);
  const { data: items, isLoading } = usePrasadamItems(templeId);
  const createOrder = useCreatePrasadamOrder();
  const [selectedItem, setSelectedItem] = useState<PrasadamItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  function handleOrder() {
    if (!selectedItem) return;
    createOrder.mutate(
      {
        itemId: selectedItem.id,
        templeId,
        quantity,
        deliveryAddress: deliveryAddress || undefined,
      },
      {
        onSuccess: () => {
          setSelectedItem(null);
          setQuantity(1);
          setDeliveryAddress('');
        },
      },
    );
  }

  return (
    <div>
      <PageHeader
        title={`Prasadam at ${temple?.name || 'Temple'}`}
        description="Order temple food for delivery"
      />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="mt-2 h-5 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : !items?.length ? (
        <EmptyState
          title="No prasadam available"
          description="There are no menu items at this temple right now"
          icon={<UtensilsCrossed className="h-12 w-12" />}
        />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items
              .filter((item) => item.isAvailable)
              .map((item) => (
                <Card key={item.id} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.itemName}</CardTitle>
                      {item.category && <Badge variant="outline">{item.category}</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    {item.description && (
                      <p className="mb-3 text-sm text-muted-foreground">{item.description}</p>
                    )}
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {formatCurrency(item.price)}
                      </span>
                      <Button size="sm" onClick={() => setSelectedItem(item)}>
                        Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Order {selectedItem?.itemName}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Price per item</label>
                  <p className="text-lg font-bold text-primary">
                    {selectedItem && formatCurrency(selectedItem.price)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Quantity</label>
                  <Input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Delivery Address (optional)</label>
                  <Input
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="mt-1"
                    placeholder="Enter delivery address"
                  />
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="font-bold">
                      {selectedItem && formatCurrency(selectedItem.price * quantity)}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleOrder}
                  disabled={createOrder.isPending}
                  className="w-full"
                >
                  {createOrder.isPending ? 'Ordering...' : 'Place Order'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}

