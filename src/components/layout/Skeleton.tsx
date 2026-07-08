import { type ComponentProps } from "react";

type SkeletonProps = ComponentProps<"div">;

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-(--color-border) ${className}`}
      {...props}
    />
  );
}
