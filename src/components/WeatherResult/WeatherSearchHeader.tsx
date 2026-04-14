import { WeatherIllustration, WEATHER_STATE_GRADIENT } from "./WeatherIllustration";

export function WeatherSearchHeader() {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${WEATHER_STATE_GRADIENT.idle} p-8 min-h-56 flex items-end`}
    >
      <WeatherIllustration state="idle" />
      <div className="relative z-10">
        <h2 className="text-white text-2xl font-black mb-2">
          Search for a location to get started
        </h2>
        <p className="text-white/70 text-sm">
          Enter a city name in the search bar below.
        </p>
      </div>
    </div>
  );
}
