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
		(city: FavouriteCity) =>
			favourites.some(
				(f) => f.latitude === city.latitude && f.longitude === city.longitude,
			),
		[favourites],
	);

	const toggle = useCallback(
		(city: FavouriteCity) => {
			const next = isFavourite(city)
				? favourites.filter(
						(f) =>
							!(f.latitude === city.latitude && f.longitude === city.longitude),
					)
				: [...favourites, city];
			saveFavourites(next);
			setFavourites(next);
		},
		[favourites, isFavourite],
	);

	return { favourites, isFavourite, toggle };
}
