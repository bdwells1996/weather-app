"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
	theme: Theme;
	toggle: () => void;
}>({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	// Initialize from DOM class so we stay in sync with the inline no-flash script
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window !== "undefined") {
			return document.documentElement.classList.contains("dark") ? "dark" : "light";
		}
		return "light";
	});

	useEffect(() => {
		// Re-sync in case the DOM changed between render and hydration
		const isDark = document.documentElement.classList.contains("dark");
		const currentTheme = isDark ? "dark" : "light";
		if (theme !== currentTheme) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setTheme(currentTheme);
		}
	}, [theme]);

	const toggle = () => {
		setTheme((prev) => {
			const next = prev === "light" ? "dark" : "light";
			document.documentElement.classList.toggle("dark", next === "dark");
			localStorage.setItem("theme", next);
			return next;
		});
	};

	return (
		<ThemeContext.Provider value={{ theme, toggle }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => useContext(ThemeContext);
