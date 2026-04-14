import { getWeatherForCity, WeatherError } from "@/lib/weather";
import { describeWeatherCode } from "@/lib/weatherCodes";
import { Card } from "@/components/ui/Card/Card";
import { Badge } from "@/components/ui/Badge/Badge";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatToday() {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface WeatherResultProps {
  city: string;
}

export async function WeatherResult({ city }: WeatherResultProps) {
  let weather;

  try {
    weather = await getWeatherForCity(city);
  } catch (err) {
    const message =
      err instanceof WeatherError && err.code === "CITY_NOT_FOUND"
        ? `No results for "${city}". Try a different city name.`
        : "Failed to load weather data. Please try again.";

    return (
      <Card className="mt-8">
        <p className="text-sm text-foreground-muted text-center py-2">
          {message}
        </p>
      </Card>
    );
  }

  const { location, current, daily } = weather;
  const condition = describeWeatherCode(current.weatherCode);

  return (
    <div className="mt-8 w-full space-y-4">
      {/* Current conditions */}
      <Card accent>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-black text-foreground">
                {location.name}
              </h2>
              <Badge variant="gray">{location.country}</Badge>
            </div>
            <p className="text-xs text-foreground-subtle">{formatToday()}</p>
          </div>
          <span className="text-4xl" role="img" aria-label={condition.label}>
            {condition.emoji}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-surface-raised px-3 py-3 text-center">
            <p className="text-2xl font-black text-foreground">
              {Math.round(current.temperature)}°
            </p>
            <p className="mt-0.5 text-xs text-foreground-subtle">Temperature</p>
          </div>
          <div className="rounded-lg bg-surface-raised px-3 py-3 text-center">
            <p className="text-2xl font-black text-foreground">
              {Math.round(current.windSpeed)}
              <span className="text-sm font-semibold"> km/h</span>
            </p>
            <p className="mt-0.5 text-xs text-foreground-subtle">Wind</p>
          </div>
          <div className="rounded-lg bg-surface-raised px-3 py-3 text-center">
            <p className="text-sm font-bold text-foreground leading-tight pt-1">
              {condition.label}
            </p>
            <p className="mt-0.5 text-xs text-foreground-subtle">Conditions</p>
          </div>
        </div>
      </Card>

      {/* 7-day forecast */}
      <Card>
        <h3 className="text-sm font-bold text-foreground-muted uppercase tracking-wide mb-3">
          7-Day Forecast
        </h3>
        <ul className="divide-y divide-surface-border">
          {daily.map((day) => {
            const dayCondition = describeWeatherCode(day.weatherCode);
            return (
              <li
                key={day.date}
                className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
              >
                <span className="w-24 text-sm font-semibold text-foreground">
                  {formatDate(day.date)}
                </span>
                <span
                  className="text-lg"
                  role="img"
                  aria-label={dayCondition.label}
                >
                  {dayCondition.emoji}
                </span>
                <div className="flex items-center gap-3 text-sm text-foreground-muted">
                  <span className="font-semibold text-foreground">
                    {Math.round(day.maxTemperature)}°
                  </span>
                  <span className="text-foreground-subtle">/</span>
                  <span>{Math.round(day.minTemperature)}°</span>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
