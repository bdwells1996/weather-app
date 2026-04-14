import Link from "next/link";

import { WeatherBentoHeader } from "@/components/WeatherResult/WeatherBentoHeader";
import { WeatherForecastRow } from "@/components/WeatherResult/WeatherForecastRow";
import { getWeatherForCity, WeatherError } from "@/lib/weather";

async function WeatherData({ params }: { params: Promise<{ city: string }> }) {
	const { city } = await params;
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
		<div className="flex flex-col gap-6">
			<WeatherBentoHeader weather={weather} error={error} />
			{weather && <WeatherForecastRow weather={weather} />}
		</div>
	);
}

export default function CityWeatherPage(props: PageProps<"/weather/[city]">) {
	return (
		<main className="flex flex-1 flex-col items-center px-4 py-8 gap-6">
			<div className="w-full max-w-4xl">
				<Link
					href="/"
					className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-foreground-muted transition-colors"
				>
					&larr; Back to search
				</Link>

				<WeatherData params={props.params} />
			</div>
		</main>
	);
}
