import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const safePage = Math.min(Math.max(page, 1), totalPages);

  return (
    <div className="mt-10 flex flex-nowrap items-center justify-center gap-1.5 sm:gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, safePage - 1))}
        disabled={safePage === 1}
        className="btn-outline flex shrink-0 items-center gap-1 px-2.5 py-2 text-xs disabled:cursor-default disabled:opacity-40 sm:px-4 sm:text-sm"
      >
        <ChevronLeft size={14} />
        <span className="hidden sm:inline">Prev</span>
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => {
          const isActive = pageNumber === safePage;
          const showPage =
            pageNumber === 1 ||
            pageNumber === totalPages ||
            pageNumber === safePage ||
            pageNumber === safePage - 1;
          const showEllipsisBefore =
            pageNumber === safePage - 2 && safePage > 3;
          const showEllipsisAfter =
            pageNumber === safePage + 2 && safePage < totalPages - 2;

          if (showEllipsisBefore || showEllipsisAfter) {
            return (
              <span
                key={`ellipsis-${pageNumber}`}
                className="shrink-0 px-0.5 text-sm text-(--color-text-muted) sm:px-1"
              >
                …
              </span>
            );
          }

          if (!showPage) return null;

          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border-[1.5px] text-sm transition-colors duration-150 ${
                isActive
                  ? "border-(--color-primary) bg-(--color-primary) font-medium text-white"
                  : "cursor-pointer border-(--color-border) text-(--color-text) hover:border-(--color-primary)"
              }`}
            >
              {pageNumber}
            </button>
          );
        },
      )}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
        disabled={safePage === totalPages}
        className="btn-outline flex items-center gap-1 disabled:cursor-default disabled:opacity-40"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
