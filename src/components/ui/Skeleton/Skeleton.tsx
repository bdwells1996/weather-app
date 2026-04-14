import clsx from "clsx";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "skeleton rounded-md bg-surface-raised",
        className,
      )}
      aria-hidden="true"
    />
  );
}
