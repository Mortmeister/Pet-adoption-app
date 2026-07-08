import { Skeleton } from "./Skeleton";

export function PetCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface) shadow-sm">
      <Skeleton className="aspect-video w-full rounded-none" />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>

        <Skeleton className="mt-auto h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}
