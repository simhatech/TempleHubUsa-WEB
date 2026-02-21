'use client';

import { PageHeader } from '@/components/shared/page-header';
import { useMembershipPlans } from '@/lib/hooks/use-membership';
import { useTempleContextStore } from '@/lib/stores/temple-context-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format';

export default function AdminMembershipPlansPage() {
  const templeId = useTempleContextStore((s) => s.selectedTempleId);
  const { data: plans } = useMembershipPlans(templeId ?? undefined);

  return (
    <div>
      <PageHeader title="Membership Plans" description="Manage temple membership tiers" />

      {!templeId ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Select a temple to manage membership plans</p>
        </Card>
      ) : !plans?.length ? (
        <Card className="flex flex-col items-center py-12">
          <CardContent className="text-center">
            <Crown className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Plans Yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              No membership plans configured for this temple
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    {plan.tier}
                  </CardTitle>
                  <Badge variant={plan.isActive ? 'default' : 'outline'}>
                    {plan.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div>
                  <p className="text-3xl font-bold">
                    {formatCurrency(plan.monthlyPrice)}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                  <p className="text-muted-foreground">
                    or {formatCurrency(plan.yearlyPrice)}/year
                  </p>
                </div>
                {plan.features && (
                  <div>
                    <p className="text-sm font-medium">Features</p>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.features}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
