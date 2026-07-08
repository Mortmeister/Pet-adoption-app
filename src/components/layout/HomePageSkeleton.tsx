import { Skeleton } from "./Skeleton";
import { PetCardSkeleton } from "./PetCardSkeleton";

export function HomePageSkeleton() {
  return (
    <div>
      <section className="relative mb-4 overflow-hidden px-6 py-12">
        <div className="relative z-10 mx-auto flex max-w-275 flex-col items-center gap-12 md:flex-row">
          <div className="flex-1">
            <Skeleton className="mb-5 h-7 w-52 rounded-full" />

            <div className="mb-4 space-y-3">
              <Skeleton className="h-10 w-full max-w-sm" />
              <Skeleton className="h-10 w-3/4 max-w-xs" />
            </div>

            <div className="mb-7 max-w-md space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
          </div>

          <div className="relative w-full max-w-85 shrink-0">
            <Skeleton className="aspect-square w-full rounded-2xl" />
          </div>
        </div>
      </section>

      <section className="w-full justify-items-center border-y border-(--color-border) bg-(--color-surface) px-6 py-8">
        <div className="grid w-full max-w-275 grid-cols-2 gap-6 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Skeleton className="h-9 w-16" />
              <Skeleton className="h-3.5 w-24" />
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-6 pt-8">
        <div className="mx-auto max-w-275">
          <div className="mb-4 flex gap-2">
            <Skeleton className="h-10 flex-1 rounded-lg" />
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-275">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-7 w-36" />
              <Skeleton className="h-6 w-10 rounded-md" />
            </div>
            <Skeleton className="h-4 w-40" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <PetCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
