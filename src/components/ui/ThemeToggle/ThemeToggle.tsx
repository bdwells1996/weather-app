"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
	const { theme, toggle } = useTheme();
	const isDark = theme === "dark";

	return (
		<button
			type="button"
			role="switch"
			aria-checked={isDark}
			aria-label="Dark mode"
			onClick={toggle}
			className="relative inline-flex h-7 w-13 shrink-0 cursor-pointer items-center rounded-full border border-surface-border bg-surface-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
		>
			<span
				className="pointer-events-none absolute left-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-surface shadow-sm transition-transform duration-200"
				style={{ transform: isDark ? "translateX(1.5rem)" : "translateX(0)" }}
			>
				{isDark
					? <Moon size={13} className="text-purple-400" aria-hidden="true" />
					: <Sun size={13} className="text-foreground-muted" aria-hidden="true" />
				}
			</span>
		</button>
	);
}
