import { Card } from "@/components/ui/Card/Card";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";

export function WeatherResultSkeleton() {
  return (
    <div className="mt-8 w-full space-y-4">
      {/* Current conditions skeleton */}
      <Card accent>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-5 w-10 rounded-full" />
            </div>
            <Skeleton className="mt-1 h-3.5 w-40" />
          </div>
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-lg bg-surface-raised px-3 py-3 text-center"
            >
              <Skeleton className="mx-auto h-7 w-12" />
              <Skeleton className="mx-auto mt-1.5 h-3 w-16" />
            </div>
          ))}
        </div>
      </Card>

      {/* 7-day forecast skeleton */}
      <Card>
        <Skeleton className="mb-3 h-4 w-28" />
        <ul className="divide-y divide-surface-border">
          {Array.from({ length: 7 }).map((_, i) => (
            <li
              key={i}
              className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
            >
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-5 rounded-sm" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
