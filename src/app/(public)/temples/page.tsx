'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTemples } from '@/lib/hooks/use-temples';
import { TempleCard, TempleCardSkeleton } from '@/components/temple/temple-card';
import { EmptyState } from '@/components/shared/empty-state';
import { PageHeader } from '@/components/shared/page-header';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { TempleQueryParams } from '@/lib/api/temples';

const PAGE_SIZE = 12;

export default function TemplesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(0);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(0); // Reset to first page on new search
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const params: TempleQueryParams = {
    page,
    size: PAGE_SIZE,
    ...(debouncedSearch && { sort: debouncedSearch }),
  };

  const { data, isLoading, isError } = useTemples(params);

  const temples = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;
  const currentPage = data?.number ?? 0;
  const isFirst = data?.first ?? true;
  const isLast = data?.last ?? true;

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <PageHeader
        title="Temple Directory"
        description="Discover Hindu temples across the United States"
      />

      {/* Search Bar */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search temples by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <TempleCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <EmptyState
          title="Unable to load temples"
          description="Something went wrong while fetching the temple directory. Please try again."
        >
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </EmptyState>
      )}

      {/* Empty State */}
      {!isLoading && !isError && temples.length === 0 && (
        <EmptyState
          title="No temples found"
          description={
            debouncedSearch
              ? `No temples matching "${debouncedSearch}". Try a different search term.`
              : 'No temples are listed yet. Check back soon!'
          }
        />
      )}

      {/* Temple Grid */}
      {!isLoading && !isError && temples.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {temples.map((temple) => (
              <TempleCard key={temple.id} temple={temple} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (!isFirst) handlePageChange(currentPage - 1);
                      }}
                      className={isFirst ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, i) => {
                    // Show limited page numbers for large sets
                    if (
                      totalPages <= 7 ||
                      i === 0 ||
                      i === totalPages - 1 ||
                      (i >= currentPage - 1 && i <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href="#"
                            isActive={i === currentPage}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(i);
                            }}
                            className="cursor-pointer"
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    // Show ellipsis
                    if (i === currentPage - 2 || i === currentPage + 2) {
                      return (
                        <PaginationItem key={i}>
                          <span className="flex h-9 w-9 items-center justify-center text-sm">
                            ...
                          </span>
                        </PaginationItem>
                      );
                    }

                    return null;
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (!isLast) handlePageChange(currentPage + 1);
                      }}
                      className={isLast ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}
