'use client';

import { PageHeader } from '@/components/shared/page-header';
import { useTemples } from '@/lib/hooks/use-temples';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil } from 'lucide-react';
import Link from 'next/link';

export default function AdminTemplesPage() {
  const { data, isLoading } = useTemples({ size: 100 });

  return (
    <div>
      <PageHeader title="Manage Temples" description="Create and manage temple listings">
        <Button asChild>
          <Link href="/admin/temples/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Temple
          </Link>
        </Button>
      </PageHeader>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Zip Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.content?.map((temple) => (
                <TableRow key={temple.id}>
                  <TableCell className="font-medium">{temple.name}</TableCell>
                  <TableCell>{temple.city}</TableCell>
                  <TableCell>{temple.state}</TableCell>
                  <TableCell>{temple.zipCode}</TableCell>
                  <TableCell>
                    <Badge variant={temple.isIntegrated ? 'default' : 'outline'}>
                      {temple.isIntegrated ? 'Integrated' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/temples/${temple.id}/edit`}>
                        <Pencil className="mr-1 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
