import { Skeleton } from "./Skeleton";
import { ProfilePetCardSkeleton } from "./ProfilePetCardSkeleton";

export function ProfilePageSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <Skeleton className="h-50 w-full rounded-none" />

      <div className="border-b border-(--color-border) bg-(--color-surface)">
        <div className="mx-auto max-w-275 px-6 pb-6">
          <div className="relative -mt-9 inline-block">
            <Skeleton className="h-40 w-40 rounded-full border border-(--color-surface)" />
          </div>

          <div className="mt-3 flex items-start justify-between">
            <div className="space-y-2">
              <Skeleton className="h-7 w-40" />
              <Skeleton className="h-4 w-52" />
            </div>
            <Skeleton className="h-8 w-28 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-275 flex-1 px-6 py-8">
        <div className="mb-8 rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
          <Skeleton className="mb-2 h-2.5 w-12" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-16 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <ProfilePetCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
