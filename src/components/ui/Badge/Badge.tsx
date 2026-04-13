import clsx from "clsx";

export type BadgeVariant =
  | "purple"
  | "gray"
  | "green"
  | "red"
  | "yellow"
  | "blue";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  purple: "bg-purple-100 text-purple-800 ring-purple-200",
  gray: "bg-gray-100 text-gray-700 ring-gray-200",
  green: "bg-green-100 text-green-800 ring-green-200",
  red: "bg-red-100 text-red-800 ring-red-200",
  yellow: "bg-yellow-100 text-yellow-800 ring-yellow-200",
  blue: "bg-blue-100 text-blue-800 ring-blue-200",
};

export function Badge({
  variant = "purple",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
