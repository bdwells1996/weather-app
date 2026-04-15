"use client";

import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import { Input } from "@/components/ui/Input/Input";
import type { GeoLocation } from "@/lib/weather";

export function CitySearch() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<GeoLocation[]>([]);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const fetchSuggestions = useDebouncedCallback((value: string) => {
		setLoading(true);
		fetch(`/api/city-suggestions?q=${encodeURIComponent(value)}`)
			.then((r) => r.json())
			.then((data: GeoLocation[]) => {
				setResults(data);
				setOpen(data.length > 0);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, 300);

	// Cancel any pending debounced fetch on unmount
	useEffect(() => () => fetchSuggestions.cancel(), [fetchSuggestions]);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const clearSearch = () => {
		fetchSuggestions.cancel();
		setQuery("");
		setResults([]);
		setOpen(false);
		setLoading(false);
	};

	return (
		<div ref={containerRef} className="relative w-full">
			<Input
				type="text"
				value={query}
				onChange={(e) => {
					const value = e.target.value;
					setQuery(value);
					if (value.length < 2) {
						fetchSuggestions.cancel();
						setResults([]);
						setOpen(false);
					} else {
						fetchSuggestions(value);
					}
				}}
				onFocus={() => results.length > 0 && setOpen(true)}
				placeholder="Search for a city — e.g. Tokyo, Sydney…"
				aria-label="City search"
				aria-autocomplete="list"
				aria-expanded={open}
			/>

			{loading && query.length >= 2 && (
				<div className="absolute inset-x-0 top-full mt-1.5 rounded-xl border border-surface-border bg-surface shadow-lg px-4 py-3 text-sm text-foreground-muted">
					Searching…
				</div>
			)}

			{open && results.length > 0 && (
				<ul className="absolute inset-x-0 top-full mt-1.5 z-50 rounded-xl border border-surface-border bg-surface shadow-lg overflow-hidden">
					{results.map((city) => (
						<li key={`${city.name}-${city.latitude}`}>
							<Link
								href={`/weather/${encodeURIComponent(city.name)}?lat=${city.latitude}&lon=${city.longitude}&tz=${encodeURIComponent(city.timezone)}&country=${encodeURIComponent(city.country)}${city.region ? `&region=${encodeURIComponent(city.region)}` : ""}`}
								className="flex items-center justify-between px-4 py-3 text-sm hover:bg-surface-raised transition-colors"
								onClick={clearSearch}
							>
								<span className="font-semibold text-foreground">{city.name}</span>
								<span className="text-foreground-subtle">
									{city.region ? `${city.region}, ${city.country}` : city.country}
								</span>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
