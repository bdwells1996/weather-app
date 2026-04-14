const STORAGE_KEY = "weather-favourites";

export interface FavouriteCity {
	name: string;
	country: string;
}

export function getFavourites(): FavouriteCity[] {
	if (typeof window === "undefined") return [];
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
	} catch {
		return [];
	}
}

export function saveFavourites(favourites: FavouriteCity[]): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
}
