import Link from "next/link";

import { getWeatherForCity, WeatherError } from "@/lib/weather";
import { WeatherDisplay } from "./_components/WeatherDisplay";
import { WeatherProvider } from "./_context/WeatherContext";

export default async function CityWeatherPage(props: PageProps<"/weather/[city]">) {
	const { city } = await props.params;
	const decodedCity = decodeURIComponent(city);

	let weather = null;
	let error = null;

	try {
		weather = await getWeatherForCity(decodedCity);
	} catch (err) {
		error =
			err instanceof WeatherError && err.code === "CITY_NOT_FOUND"
				? `No results for "${decodedCity}". Try a different city name.`
				: "Failed to load weather data. Please try again.";
	}

	return (
		<main className="flex flex-1 flex-col items-center px-4 py-8 gap-6">
			<div className="w-full max-w-4xl">
				<Link
					href="/"
					className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground-muted hover:text-foreground transition-colors"
				>
					&larr; Back to search
				</Link>

				<WeatherProvider weather={weather} error={error}>
					<WeatherDisplay />
				</WeatherProvider>
			</div>
		</main>
	);
}
