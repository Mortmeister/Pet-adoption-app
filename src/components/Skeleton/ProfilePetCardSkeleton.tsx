import { Skeleton } from "./Skeleton";

export function ProfilePetCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface)">
      <Skeleton className="aspect-16/10 w-full rounded-none" />

      <div className="px-3 py-2.5">
        <Skeleton className="mb-1 h-4 w-2/3" />
        <Skeleton className="mb-3 h-3 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-8 flex-1 rounded-lg" />
          <Skeleton className="h-8 flex-1 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
