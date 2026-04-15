import type { WeatherData } from "@/lib/weather";
import { describeWeatherCode, getWeatherState } from "@/lib/weatherCodes";
import { Badge } from "@/components/ui/Badge/Badge";
import { FavouriteButton } from "@/components/FavouriteButton/FavouriteButton";
import {
	WeatherIllustration,
	WEATHER_STATE_GRADIENT,
} from "./WeatherIllustration";
import { RefreshButton } from "./RefreshButton";

function formatToday() {
	return new Date().toLocaleDateString("en-GB", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

export function WeatherBentoHeader({
	weather,
	error,
}: {
	weather: WeatherData | null;
	error: string | null;
}) {
	if (error) {
		return (
			<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 p-8 h-56 flex items-center">
				<p className="text-white text-lg font-semibold">{error}</p>
			</div>
		);
	}

	if (!weather) return null;

	const { location, current } = weather;
	const condition = describeWeatherCode(current.weatherCode);
	const state = getWeatherState(current.weatherCode);
	const gradient = WEATHER_STATE_GRADIENT[state];

	return (
		<div
			className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} py-6 px-4 flex flex-col justify-between min-h-50 md:p-8 md:min-h-58`}
		>
			<WeatherIllustration state={state} />

			<div className="relative z-10 flex items-start justify-between gap-4">
				<div>
					<div className="flex items-center gap-2 mb-1">
						<h2 className="text-white text-2xl font-black">{location.name}</h2>
						<Badge className="bg-white/20 text-white ring-white/30">
							{location.region ? `${location.region}, ${location.country}` : location.country}
						</Badge>
					</div>
					<p className="text-white/70 text-sm">{formatToday()}</p>
				</div>
				<div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2">
					<RefreshButton latitude={location.latitude} longitude={location.longitude} />
					<FavouriteButton
						city={{
							name: location.name,
							country: location.country,
							region: location.region,
							latitude: location.latitude,
							longitude: location.longitude,
							timezone: location.timezone,
						}}
					/>
				</div>
			</div>

			<div className="relative z-10 grid grid-cols-12 gap-2 mt-6 md:gap-3">
				<div className="rounded-xl bg-white/15 backdrop-blur-sm px-4 py-3 col-span-6 md:col-span-4">
					<p className="text-3xl font-black text-white">
						{Math.round(current.temperature)}°
					</p>
					<p className="text-xs text-white/70 mt-0.5">Temperature</p>
				</div>
				<div className="rounded-xl bg-white/15 backdrop-blur-sm px-4 py-3 col-span-6 md:col-span-4">
					<p className="flex items-end gap-1 text-3xl font-black text-white">
						{Math.round(current.windSpeed)}
						<span className="text-sm font-semibold pb-1"> km/h</span>
					</p>
					<p className="text-xs text-white/70 mt-0.5">Wind</p>
				</div>
				<div className="rounded-xl bg-white/15 backdrop-blur-sm px-4 py-3 flex flex-col col-span-12 md:col-span-4">
					<p className="text-base font-bold text-white leading-tight pt-1">
						{condition.label}
					</p>
					<p className="text-xs text-white/70 mt-auto">Conditions</p>
				</div>
			</div>
		</div>
	);
}

export function BentoHeaderSkeleton() {
	return (
		<div
			className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${WEATHER_STATE_GRADIENT.loading} p-8 min-h-56 flex flex-col justify-between`}
		>
			<div>
				<div className="flex items-center gap-2 mb-1">
					<div className="h-7 w-36 rounded-lg bg-white/20 animate-pulse" />
					<div className="h-5 w-12 rounded-full bg-white/15 animate-pulse" />
				</div>
				<p className="text-white/50 text-sm mt-1.5">
					Fetching weather details&hellip;
				</p>
			</div>
			<div className="grid grid-cols-3 gap-3 mt-6">
				{[0, 1, 2].map((i) => (
					<div key={i} className="rounded-xl bg-white/15 px-4 py-3">
						<div className="h-8 w-14 rounded bg-white/20 animate-pulse mb-2" />
						<div className="h-3 w-20 rounded bg-white/15 animate-pulse" />
					</div>
				))}
			</div>
		</div>
	);
}
