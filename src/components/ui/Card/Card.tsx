import clsx from "clsx";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Adds a subtle purple accent border on the left */
  accent?: boolean;
  /** Elevates the card with a shadow */
  elevated?: boolean;
  /** Makes the card interactive (hover/focus styles) */
  interactive?: boolean;
}

export function Card({
  children,
  className,
  accent = false,
  elevated = false,
  interactive = false,
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-surface-border bg-surface p-6",
        accent && "border-l-4 border-l-purple-500",
        elevated && "shadow-md",
        interactive &&
          "cursor-pointer transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mb-4 flex items-start justify-between", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={clsx(
        "text-lg font-bold text-foreground leading-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("text-sm text-foreground-muted leading-relaxed", className)}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mt-5 flex items-center gap-3", className)}>
      {children}
    </div>
  );
}
