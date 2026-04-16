"use client";

import { useCallback, useEffect, useState } from "react";
import {
	type FavouriteCity,
	getFavourites,
	saveFavourites,
} from "@/lib/favourites";

export function useFavourites() {
	const [favourites, setFavourites] = useState<FavouriteCity[]>([]);

	// Reading localStorage in a lazy useState initializer causes a hydration
	// mismatch because the server renders with no localStorage. Deferring to
	// an effect ensures the first render matches the server's empty state, then
	// syncs with localStorage on the client after hydration.
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
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
