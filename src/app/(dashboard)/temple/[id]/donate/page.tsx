'use client';

import { use, useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { useCreateDonation } from '@/lib/hooks/use-donations';
import { useTemple } from '@/lib/hooks/use-temples';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Heart } from 'lucide-react';
import { PRESET_DONATION_AMOUNTS, DONATION_PURPOSES } from '@/lib/utils/constants';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils';

export default function TempleDonationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const templeId = Number(id);
  const { data: temple } = useTemple(templeId);
  const createDonation = useCreateDonation();

  const [amount, setAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState('');
  const [purpose, setPurpose] = useState('GENERAL');
  const [isAnonymous, setIsAnonymous] = useState(false);

  function selectPreset(value: number) {
    setAmount(value);
    setCustomAmount('');
  }

  function handleCustomAmount(value: string) {
    setCustomAmount(value);
    setAmount(Number(value) || 0);
  }

  function handleDonate() {
    if (amount < 1) return;
    createDonation.mutate(
      { templeId, amount, purpose, isAnonymous },
      {
        onSuccess: () => {
          setAmount(0);
          setCustomAmount('');
          setPurpose('GENERAL');
          setIsAnonymous(false);
        },
      },
    );
  }

  return (
    <div>
      <PageHeader
        title={`Donate to ${temple?.name || 'Temple'}`}
        description="Support your temple community"
      />

      <div className="mx-auto max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Make a Donation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Preset Amounts */}
            <div>
              <label className="text-sm font-medium">Select Amount</label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {PRESET_DONATION_AMOUNTS.map((preset) => (
                  <Button
                    key={preset}
                    type="button"
                    variant={amount === preset && !customAmount ? 'default' : 'outline'}
                    onClick={() => selectPreset(preset)}
                    className={cn('text-lg')}
                  >
                    ${preset}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="text-sm font-medium">Or enter custom amount</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  min={1}
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className="pl-7"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="text-sm font-medium">Purpose</label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DONATION_PURPOSES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p.charAt(0) + p.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Anonymous */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={(checked) => setIsAnonymous(checked === true)}
              />
              <label htmlFor="anonymous" className="text-sm">
                Make this donation anonymous
              </label>
            </div>

            {/* Summary */}
            {amount > 0 && (
              <div className="rounded-lg bg-muted p-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Donation Amount</span>
                  <span className="text-primary">{formatCurrency(amount)}</span>
                </div>
              </div>
            )}

            <Button
              onClick={handleDonate}
              disabled={amount < 1 || createDonation.isPending}
              className="w-full"
              size="lg"
            >
              {createDonation.isPending ? 'Processing...' : `Donate ${amount > 0 ? formatCurrency(amount) : ''}`}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

