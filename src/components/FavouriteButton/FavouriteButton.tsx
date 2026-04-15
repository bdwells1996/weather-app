"use client";

import { useState } from "react";
import { useFavourites } from "@/hooks/useFavourites";
import type { FavouriteCity } from "@/lib/favourites";

export function FavouriteButton({ city }: { city: FavouriteCity }) {
	const { isFavourite, toggle } = useFavourites();
	const saved = isFavourite(city);
	const [anim, setAnim] = useState<"idle" | "pressed" | "bounce">("idle");

	function handleClick() {
		toggle(city);
		setAnim("pressed");
		setTimeout(() => setAnim("bounce"), 80);
		setTimeout(() => setAnim("idle"), 400);
	}

	const scale =
		anim === "pressed"
			? "scale-[0.99]"
			: anim === "bounce"
				? "scale-[1.18]"
				: "scale-100";

	return (
		<button
			onClick={handleClick}
			type="button"
			aria-label={saved ? "Remove from favourites" : "Add to favourites"}
			className="rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill={saved ? "currentColor" : "none"}
				stroke="currentColor"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
				className={`w-5 h-5 text-white transition-transform duration-150 ease-out ${scale}`}
			>
				<title>Heart Icon</title>
				<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
			</svg>
		</button>
	);
}
