"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { Input } from "@/components/ui/Input/Input";
import type { GeoLocation } from "@/lib/weather";

export function CitySearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(`/api/city-suggestions?q=${encodeURIComponent(debouncedQuery)}`)
      .then((r) => r.json())
      .then((data: GeoLocation[]) => {
        if (!cancelled) {
          setResults(data);
          setOpen(data.length > 0);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
        <ul
          role="listbox"
          className="absolute inset-x-0 top-full mt-1.5 z-50 rounded-xl border border-surface-border bg-surface shadow-lg overflow-hidden"
        >
          {results.map((city) => (
            <li key={`${city.name}-${city.latitude}`} role="option">
              <Link
                href={`/weather/${encodeURIComponent(city.name)}`}
                className="flex items-center justify-between px-4 py-3 text-sm hover:bg-surface-raised transition-colors"
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                  setResults([]);
                }}
              >
                <span className="font-semibold text-foreground">{city.name}</span>
                <span className="text-foreground-subtle">{city.country}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
