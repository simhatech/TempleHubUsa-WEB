'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import {
  useAdminInventory,
  useAdminInventoryStats,
  useCreateInventoryItem,
} from '@/lib/hooks/use-admin';
import { useTempleContextStore } from '@/lib/stores/temple-context-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Plus, AlertTriangle, Package } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inventorySchema, type InventoryFormValues } from '@/lib/utils/validators';
import { INVENTORY_CATEGORIES } from '@/lib/utils/constants';

export default function AdminInventoryPage() {
  const templeId = useTempleContextStore((s) => s.selectedTempleId);
  const { data: items, isLoading } = useAdminInventory(templeId ?? undefined);
  const { data: stats } = useAdminInventoryStats(templeId ?? undefined);
  const createItem = useCreateInventoryItem();
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema),
    defaultValues: { itemName: '', quantity: 0, minQuantity: 0, unit: '' },
  });

  function onSubmit(values: InventoryFormValues) {
    if (!templeId) return;
    createItem.mutate(
      { ...values, templeId },
      {
        onSuccess: () => {
          setDialogOpen(false);
          form.reset();
        },
      },
    );
  }

  return (
    <div>
      <PageHeader title="Inventory Management" description="Track temple inventory items">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Inventory Item</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="itemName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {INVENTORY_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat.replace(/_/g, ' ')}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="quantity" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl><Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value) || 0)} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="unit" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl><Input {...field} placeholder="pcs, kg, etc." /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="minQuantity" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Quantity (alert threshold)</FormLabel>
                    <FormControl><Input {...field} type="number" onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" disabled={createItem.isPending} className="w-full">
                  {createItem.isPending ? 'Adding...' : 'Add Item'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              <Package className="mr-1 inline h-4 w-4" />
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats?.totalItems || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              <AlertTriangle className="mr-1 inline h-4 w-4 text-destructive" />
              Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">{stats?.lowStockCount || 0}</p>
          </CardContent>
        </Card>
      </div>

      {!templeId ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Select a temple to manage inventory</p>
        </Card>
      ) : isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Min Qty</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items?.map((item) => {
                const isLow = item.minQuantity != null && item.quantity < item.minQuantity;
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.itemName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category?.replace(/_/g, ' ')}</Badge>
                    </TableCell>
                    <TableCell className={isLow ? 'font-bold text-destructive' : ''}>
                      {item.quantity}
                    </TableCell>
                    <TableCell>{item.minQuantity ?? '-'}</TableCell>
                    <TableCell>{item.unit || '-'}</TableCell>
                    <TableCell>
                      {isLow ? (
                        <Badge variant="destructive">Low Stock</Badge>
                      ) : (
                        <Badge variant="outline">In Stock</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
