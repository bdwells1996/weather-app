import Link from "next/link";

import { WeatherBentoHeader } from "@/components/WeatherResult/WeatherBentoHeader";
import { WeatherForecastRow } from "@/components/WeatherResult/WeatherForecastRow";
import { getWeatherForCity, getWeatherByCoords, WeatherError } from "@/lib/weather";

async function WeatherData({
	params,
	searchParams,
}: {
	params: Promise<{ city: string }>;
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const { city } = await params;
	const sp = await searchParams;
	const decodedCity = decodeURIComponent(city);

	let weather = null;
	let error = null;

	const lat = typeof sp.lat === "string" ? parseFloat(sp.lat) : NaN;
	const lon = typeof sp.lon === "string" ? parseFloat(sp.lon) : NaN;
	const tz = typeof sp.tz === "string" ? sp.tz : "";
	const country = typeof sp.country === "string" ? sp.country : "";
	const region = typeof sp.region === "string" ? sp.region : undefined;

	try {
		if (!isNaN(lat) && !isNaN(lon) && tz && country) {
			weather = await getWeatherByCoords(decodedCity, country, lat, lon, tz, region);
		} else {
			weather = await getWeatherForCity(decodedCity);
		}
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

				<WeatherData params={props.params} searchParams={props.searchParams} />
			</div>
		</main>
	);
}
