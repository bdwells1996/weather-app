import clsx from "clsx";
import { type InputHTMLAttributes, type ReactNode, useId } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  endAdornment?: ReactNode;
  containerClassName?: string;
}

export function Input({
  label,
  hint,
  error,
  endAdornment,
  className,
  containerClassName,
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
      <div className={clsx("relative flex items-center", containerClassName)}>
        <input
          id={id}
          {...props}
          className={clsx(
            "w-full rounded-lg border bg-surface-raised py-2.5 text-sm text-foreground placeholder:text-foreground-subtle",
            endAdornment ? "pl-3.5 pr-9" : "px-3.5",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : "border-surface-border focus:border-purple-500 focus:ring-purple-500/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        />
        {endAdornment && (
          <span className="absolute right-3 flex items-center text-foreground-subtle">
            {endAdornment}
          </span>
        )}
      </div>
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
