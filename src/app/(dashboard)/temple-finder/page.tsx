'use client';

import { useState, useCallback } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ExternalLink,
  Locate,
  MapPin,
  Navigation,
  Phone,
  Search,
  Star,
} from 'lucide-react';
import { toast } from 'sonner';

interface TempleResult {
  placeId: string;
  name: string;
  address: string;
  rating: number | null;
  userRatingsTotal: number;
  isOpen: boolean | null;
  location: { lat: number; lng: number } | null;
}

interface SearchLocation {
  lat: number;
  lng: number;
}

const RADIUS_OPTIONS = [
  { value: '8047', label: '5 miles' },
  { value: '16093', label: '10 miles' },
  { value: '40234', label: '25 miles' },
  { value: '80467', label: '50 miles' },
];

export default function TempleFinderPage() {
  const [zip, setZip] = useState('');
  const [radius, setRadius] = useState('16093');
  const [results, setResults] = useState<TempleResult[]>([]);
  const [searchLocation, setSearchLocation] = useState<SearchLocation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTemples = useCallback(
    async (searchZip?: string, lat?: number, lng?: number) => {
      setIsLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        const params = new URLSearchParams({ radius });

        if (searchZip) {
          params.set('zip', searchZip);
        }
        if (lat !== undefined && lng !== undefined) {
          params.set('lat', lat.toString());
          params.set('lng', lng.toString());
        }

        const response = await fetch(`/api/places/search?${params.toString()}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Search failed');
        }

        setResults(data.results || []);
        if (data.location) {
          setSearchLocation(data.location);
        }

        if (data.results?.length === 0) {
          toast.info('No temples found', {
            description: 'Try expanding your search radius or changing your location.',
          });
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong';
        setError(message);
        toast.error('Search failed', { description: message });
      } finally {
        setIsLoading(false);
      }
    },
    [radius]
  );

  const handleSearch = () => {
    if (!zip.trim()) {
      toast.error('Please enter a ZIP code');
      return;
    }
    searchTemples(zip.trim());
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    toast.loading('Getting your location...', { id: 'location' });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        toast.dismiss('location');
        toast.success('Location found');
        const { latitude, longitude } = position.coords;
        setSearchLocation({ lat: latitude, lng: longitude });
        searchTemples(undefined, latitude, longitude);
      },
      (err) => {
        toast.dismiss('location');
        toast.error('Could not get your location', {
          description: 'Please check your browser permissions and try again.',
        });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const getDirectionsUrl = (temple: TempleResult) => {
    if (temple.location) {
      return `https://www.google.com/maps/dir/?api=1&destination=${temple.location.lat},${temple.location.lng}&destination_place_id=${temple.placeId}`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(temple.name + ' ' + temple.address)}`;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        );
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-amber-400/50 text-amber-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="h-4 w-4 text-muted-foreground/30" />
        );
      }
    }
    return stars;
  };

  const mapEmbedUrl = searchLocation
    ? `https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=hindu+temple+mandir&center=${searchLocation.lat},${searchLocation.lng}&zoom=11`
    : null;

  return (
    <div>
      <PageHeader title="Find Temples" description="Discover Hindu temples near you" />

      {/* Search Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium">ZIP Code</label>
              <Input
                placeholder="Enter ZIP code (e.g., 10001)"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
                maxLength={10}
              />
            </div>
            <div className="w-full sm:w-40">
              <label className="mb-2 block text-sm font-medium">Radius</label>
              <Select value={radius} onValueChange={setRadius}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RADIUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSearch} disabled={isLoading}>
                <Search className="mr-2 h-4 w-4" />
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
              <Button variant="outline" onClick={handleUseMyLocation} disabled={isLoading}>
                <Locate className="mr-2 h-4 w-4" />
                Use My Location
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Embed */}
      {mapEmbedUrl && (
        <Card className="mb-8 overflow-hidden">
          <div className="aspect-video w-full">
            <iframe
              src={mapEmbedUrl}
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Temple locations map"
            />
          </div>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-1/2" />
                <div className="mt-4 flex gap-2">
                  <Skeleton className="h-9 w-32" />
                  <Skeleton className="h-9 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <Card className="border-destructive/50">
          <CardContent className="flex flex-col items-center p-8 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <MapPin className="h-6 w-6 text-destructive" />
            </div>
            <p className="text-lg font-semibold">Search Error</p>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            <Button className="mt-4" variant="outline" onClick={handleSearch}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {hasSearched && !isLoading && !error && results.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center p-8 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <MapPin className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold">No Temples Found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try expanding your search radius or searching in a different area.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {!isLoading && results.length > 0 && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {results.length} Temple{results.length !== 1 ? 's' : ''} Found
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((temple) => (
              <Card key={temple.placeId} className="flex flex-col">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold leading-tight">{temple.name}</h3>
                    {temple.isOpen !== null && (
                      <Badge
                        variant={temple.isOpen ? 'default' : 'secondary'}
                        className={
                          temple.isOpen
                            ? 'shrink-0 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400'
                            : 'shrink-0'
                        }
                      >
                        {temple.isOpen ? 'Open' : 'Closed'}
                      </Badge>
                    )}
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">{temple.address}</p>

                  {temple.rating !== null && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex">{renderStars(temple.rating)}</div>
                      <span className="text-sm font-medium">{temple.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({temple.userRatingsTotal})
                      </span>
                    </div>
                  )}

                  <div className="mt-auto flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        window.open(getDirectionsUrl(temple), '_blank', 'noopener,noreferrer')
                      }
                    >
                      <Navigation className="mr-1.5 h-3.5 w-3.5" />
                      Get Directions
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/place/?q=place_id:${temple.placeId}`,
                          '_blank',
                          'noopener,noreferrer'
                        )
                      }
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Initial State - No search yet */}
      {!hasSearched && !isLoading && (
        <Card>
          <CardContent className="flex flex-col items-center p-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
              <MapPin className="h-8 w-8 text-orange-500" />
            </div>
            <p className="text-lg font-semibold">Discover Temples Near You</p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Enter your ZIP code or use your current location to find Hindu temples, mandirs, and
              spiritual centers in your area.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
