'use client'

import { useWeather } from "../_context/WeatherContext";
import { WeatherBentoHeader } from "@/components/WeatherResult/WeatherBentoHeader";
import { WeatherForecastRow } from "@/components/WeatherResult/WeatherForecastRow";

export function WeatherDisplay() {
	const { weather, error } = useWeather();

	return (
		<div className="flex flex-col gap-6">
			<WeatherBentoHeader weather={weather} error={error} />
			{weather && <WeatherForecastRow weather={weather} />}
		</div>
	);
}
