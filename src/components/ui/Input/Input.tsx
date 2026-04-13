import { type InputHTMLAttributes, useId } from "react";
import clsx from "clsx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Input({
  label,
  hint,
  error,
  className,
  id: idProp,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-foreground"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={clsx(
          "w-full rounded-lg border bg-surface-raised px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-subtle",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-offset-0",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : "border-surface-border focus:border-purple-500 focus:ring-purple-500/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      />
      {(hint || error) && (
        <p
          className={clsx(
            "text-xs",
            error ? "text-red-400" : "text-foreground-muted",
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
