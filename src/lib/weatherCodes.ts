interface WeatherDescription {
  label: string;
  emoji: string;
}

const WEATHER_CODES: Record<number, WeatherDescription> = {
  0:  { label: "Clear sky",              emoji: "☀️" },
  1:  { label: "Mainly clear",           emoji: "🌤️" },
  2:  { label: "Partly cloudy",          emoji: "⛅" },
  3:  { label: "Overcast",               emoji: "☁️" },
  45: { label: "Fog",                    emoji: "🌫️" },
  48: { label: "Icy fog",                emoji: "🌫️" },
  51: { label: "Light drizzle",          emoji: "🌦️" },
  53: { label: "Drizzle",                emoji: "🌦️" },
  55: { label: "Heavy drizzle",          emoji: "🌧️" },
  61: { label: "Light rain",             emoji: "🌧️" },
  63: { label: "Rain",                   emoji: "🌧️" },
  65: { label: "Heavy rain",             emoji: "🌧️" },
  71: { label: "Light snow",             emoji: "🌨️" },
  73: { label: "Snow",                   emoji: "❄️" },
  75: { label: "Heavy snow",             emoji: "❄️" },
  77: { label: "Snow grains",            emoji: "🌨️" },
  80: { label: "Light showers",          emoji: "🌦️" },
  81: { label: "Showers",                emoji: "🌧️" },
  82: { label: "Heavy showers",          emoji: "⛈️" },
  85: { label: "Snow showers",           emoji: "🌨️" },
  86: { label: "Heavy snow showers",     emoji: "❄️" },
  95: { label: "Thunderstorm",           emoji: "⛈️" },
  96: { label: "Thunderstorm with hail", emoji: "⛈️" },
  99: { label: "Thunderstorm with hail", emoji: "⛈️" },
};

export function describeWeatherCode(code: number): WeatherDescription {
  return WEATHER_CODES[code] ?? { label: "Unknown", emoji: "🌡️" };
}

export type WeatherState =
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "fog"
  | "rain"
  | "snow"
  | "storm";

export function getWeatherState(code: number): WeatherState {
  if (code <= 1) return "sunny";
  if (code === 2) return "partly-cloudy";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if (code >= 95) return "storm";
  return "cloudy";
}
