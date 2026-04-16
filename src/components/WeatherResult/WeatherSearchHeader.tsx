import { CitySearch } from "@/components/CitySearch";
import {
	WeatherIllustration,
	WEATHER_STATE_GRADIENT,
} from "./WeatherIllustration";

export function WeatherSearchHeader() {
	return (
		<div
			className={`relative  rounded-2xl bg-gradient-to-br ${WEATHER_STATE_GRADIENT.idle} p-8 mb-4 min-h-56 flex items-center`}
		>
			<WeatherIllustration state="idle" />
			<div className="relative z-10 flex flex-col gap-4">
				<h1 className="text-white text-3xl font-black">
					Search for a location to get started
				</h1>
				<CitySearch />
			</div>
		</div>
	);
}
