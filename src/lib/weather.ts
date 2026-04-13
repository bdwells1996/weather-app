export interface GeoLocation {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  timezone: string;
}

export interface CurrentWeather {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
}

export interface DailyForecast {
  date: string;
  maxTemperature: number;
  minTemperature: number;
}

export interface WeatherData {
  location: GeoLocation;
  current: CurrentWeather;
  daily: DailyForecast[];
}

export class WeatherError extends Error {
  constructor(
    message: string,
    public readonly code: "CITY_NOT_FOUND" | "FETCH_FAILED"
  ) {
    super(message);
    this.name = "WeatherError";
  }
}

async function geocodeCity(city: string): Promise<GeoLocation> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new WeatherError(`Geocoding request failed: ${res.status}`, "FETCH_FAILED");
  }

  const data = await res.json();

  if (!data.results?.length) {
    throw new WeatherError(`City not found: ${city}`, "CITY_NOT_FOUND");
  }

  const result = data.results[0];
  return {
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country,
    timezone: result.timezone,
  };
}

async function fetchForecast(
  latitude: number,
  longitude: number,
  timezone: string
): Promise<{ current: CurrentWeather; daily: DailyForecast[] }> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,weathercode,wind_speed_10m",
    daily: "temperature_2m_max,temperature_2m_min",
    timezone,
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params}`;
  const res = await fetch(url, { next: { revalidate: 900 } });

  if (!res.ok) {
    throw new WeatherError(`Forecast request failed: ${res.status}`, "FETCH_FAILED");
  }

  const data = await res.json();

  const current: CurrentWeather = {
    temperature: data.current.temperature_2m,
    weatherCode: data.current.weathercode,
    windSpeed: data.current.wind_speed_10m,
  };

  const daily: DailyForecast[] = data.daily.time.map(
    (date: string, i: number) => ({
      date,
      maxTemperature: data.daily.temperature_2m_max[i],
      minTemperature: data.daily.temperature_2m_min[i],
    })
  );

  return { current, daily };
}

/**
 * Geocodes a city name then fetches current conditions and a 7-day forecast.
 * Safe to call from Server Components, Route Handlers, or any async context.
 */
export async function getWeatherForCity(city: string): Promise<WeatherData> {
  const location = await geocodeCity(city);
  const { current, daily } = await fetchForecast(
    location.latitude,
    location.longitude,
    location.timezone
  );

  return { location, current, daily };
}
