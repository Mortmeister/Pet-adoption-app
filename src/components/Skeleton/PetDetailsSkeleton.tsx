import { Skeleton } from "./Skeleton";
import { PetCardSkeleton } from "./PetCardSkeleton";

export function PetDetailsPageSkeleton() {
  return (
    <>
      <div className="mx-auto w-full max-w-275 px-6 pt-4">
        <Skeleton className="h-3 w-32" />
      </div>

      <section className="mx-auto w-full max-w-275 px-6 py-6">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex md:w-[55%]">
            <Skeleton className="aspect-4/3 w-full rounded-xl md:aspect-square" />
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <Skeleton className="h-9 w-48" />
              <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
            </div>

            <Skeleton className="h-6 w-24 rounded-md" />

            <div className="overflow-hidden rounded-lg border border-(--color-border)">
              {Array.from({ length: 4 }).map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`flex ${rowIndex !== 3 ? "border-b border-(--color-border)" : ""}`}
                >
                  <div className="flex-1 px-4 py-3">
                    <Skeleton className="mb-1.5 h-2.5 w-12" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  {rowIndex !== 3 && (
                    <div className="flex-1 border-l border-(--color-border) px-4 py-3">
                      <Skeleton className="mb-1.5 h-2.5 w-12" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div>
              <Skeleton className="mb-2 h-4 w-28" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-275 border-t border-(--color-border) px-6 pt-8 pb-16">
        <Skeleton className="mb-6 h-6 w-52" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <PetCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </>
  );
}
