'use client';

import { use } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { useSevaOpportunities, useRegisterSeva } from '@/lib/hooks/use-seva';
import { useTemple } from '@/lib/hooks/use-temples';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { HandHelping, Clock, Users } from 'lucide-react';

export default function TempleSevaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const templeId = Number(id);
  const { data: temple } = useTemple(templeId);
  const { data: opportunities, isLoading } = useSevaOpportunities(templeId);
  const registerSeva = useRegisterSeva();

  return (
    <div>
      <PageHeader
        title={`Volunteer at ${temple?.name || 'Temple'}`}
        description="Browse and register for seva opportunities"
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
      ) : !opportunities?.length ? (
        <EmptyState
          title="No seva opportunities"
          description="There are no active volunteer opportunities at this temple"
          icon={<HandHelping className="h-12 w-12" />}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opp) => {
            const isFull =
              opp.maxVolunteers != null && opp.currentVolunteers >= opp.maxVolunteers;
            return (
              <Card key={opp.id} className="flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    {opp.emoji && <span className="text-2xl">{opp.emoji}</span>}
                    <CardTitle className="text-lg">{opp.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  {opp.description && (
                    <p className="mb-3 text-sm text-muted-foreground">{opp.description}</p>
                  )}
                  <div className="mt-auto space-y-2">
                    {opp.schedule && (
                      <p className="text-sm text-muted-foreground">{opp.schedule}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {opp.durationMinutes && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {opp.durationMinutes} min
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {opp.currentVolunteers}
                        {opp.maxVolunteers ? ` / ${opp.maxVolunteers}` : ''} volunteers
                      </span>
                    </div>
                    {opp.maxVolunteers != null && (
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{
                            width: `${Math.min(
                              (opp.currentVolunteers / opp.maxVolunteers) * 100,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    )}
                    <Button
                      onClick={() => registerSeva.mutate({ opportunityId: opp.id })}
                      disabled={isFull || registerSeva.isPending}
                      className="w-full"
                    >
                      {isFull ? 'Full' : registerSeva.isPending ? 'Registering...' : 'Register'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

