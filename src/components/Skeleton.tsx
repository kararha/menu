"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-surface-card",
        className
      )}
    />
  );
}

export function MenuItemSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border-subtle bg-surface-card p-4">
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
}

export function MenuGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <MenuItemSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryPageSkeleton() {
  return (
    <div className="mx-auto flex max-w-7xl gap-0 px-6 py-6">
      <aside className="hidden w-56 shrink-0 lg:block">
        <Skeleton className="mb-6 h-8 w-32" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
        <Skeleton className="mt-8 h-32 w-full rounded-xl" />
      </aside>
      <main className="flex-1 ps-0 lg:ps-8">
        <Skeleton className="mb-6 h-10 w-48" />
        <MenuGridSkeleton count={6} />
      </main>
    </div>
  );
}

export function ItemDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <div className="mb-6 flex gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <Skeleton className="mb-4 h-[400px] w-full rounded-2xl" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="flex gap-4">
            <Skeleton className="h-12 flex-1 rounded-full" />
            <Skeleton className="h-12 flex-1 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Skeleton className="mb-6 h-10 w-32" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-border-subtle bg-surface-card p-4">
                <Skeleton className="h-24 w-24 shrink-0 rounded-lg" />
                <div className="flex flex-1 flex-col justify-between">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-24 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <Skeleton className="sticky top-24 h-80 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-9 rounded-lg" />
      ))}
    </div>
  );
}
