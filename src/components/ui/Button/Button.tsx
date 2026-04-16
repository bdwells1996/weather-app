import { Children, isValidElement, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg" | "none";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		"bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 border border-transparent cursor-pointer focus-visible:ring-purple-500",
	secondary:
		"bg-white text-purple-700 hover:bg-purple-50 active:bg-purple-100 border border-purple-300 cursor-pointer focus-visible:ring-purple-500",
	ghost:
		"bg-transparent text-purple-700 border border-transparent cursor-pointer focus-visible:ring-purple-500",
	destructive:
		"bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border border-transparent cursor-pointer focus-visible:ring-red-500",
};

const sizeClasses: Record<ButtonSize, string> = {
	sm: "px-3 py-1.5 text-sm rounded-md gap-1.5",
	md: "px-4 py-2 text-sm rounded-lg gap-2",
	lg: "px-6 py-3 text-base rounded-xl gap-2.5",
	none: "",
};

export function Button({
	variant = "primary",
	size = "md",
	fullWidth = false,
	className,
	disabled,
	children,
	...props
}: ButtonProps) {
	const isIconOnly =
		Children.count(children) === 1 &&
		isValidElement(children) &&
		typeof children.type !== "string";

	return (
		<button
			{...props}
			disabled={disabled}
			className={clsx(
				"inline-flex items-center justify-center font-semibold tracking-wide transition-colors duration-150",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
				"disabled:pointer-events-none disabled:opacity-50",
				!isIconOnly && variantClasses[variant],
				!isIconOnly && sizeClasses[size],
				isIconOnly && "rounded-full p-2 transition-colors",
				fullWidth && "w-full",
				className,
			)}
		>
			{children}
		</button>
	);
}
