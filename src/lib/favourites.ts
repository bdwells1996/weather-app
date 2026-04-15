const STORAGE_KEY = "weather-favourites";

export interface FavouriteCity {
	name: string;
	country: string;
	region?: string;
	latitude: number;
	longitude: number;
	timezone: string;
}

export function getFavourites(): FavouriteCity[] {
	if (typeof window === "undefined") return [];
	try {
		const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
		return parsed.filter(
			(f: FavouriteCity) =>
				typeof f.latitude === "number" &&
				typeof f.longitude === "number" &&
				typeof f.timezone === "string",
		);
	} catch {
		return [];
	}
}

export function saveFavourites(favourites: FavouriteCity[]): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
}
