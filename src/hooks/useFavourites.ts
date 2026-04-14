"use client";

import { useState, useEffect, useCallback } from "react";
import {
	getFavourites,
	saveFavourites,
	type FavouriteCity,
} from "@/lib/favourites";

export function useFavourites() {
	const [favourites, setFavourites] = useState<FavouriteCity[]>([]);

	useEffect(() => {
		setFavourites(getFavourites());
	}, []);

	const isFavourite = useCallback(
		(name: string) =>
			favourites.some(
				(f) => f.name.toLowerCase() === name.toLowerCase(),
			),
		[favourites],
	);

	const toggle = useCallback(
		(city: FavouriteCity) => {
			const next = isFavourite(city.name)
				? favourites.filter(
						(f) => f.name.toLowerCase() !== city.name.toLowerCase(),
					)
				: [...favourites, city];
			saveFavourites(next);
			setFavourites(next);
		},
		[favourites, isFavourite],
	);

	return { favourites, isFavourite, toggle };
}
