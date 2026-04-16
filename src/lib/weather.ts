import { cacheLife, cacheTag } from 'next/cache';

export interface GeoLocation {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  region?: string;
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
  weatherCode: number;
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

// Geocoding results are stable — city coordinates rarely change.
// 'hours' profile: revalidates in the background every 1h, expires after 1d.
// Tagged so a specific city's entry can be force-invalidated via revalidateTag().
async function geocodeCity(city: string): Promise<GeoLocation> {
  'use cache'
  cacheLife('hours')
  cacheTag(`geocode:${city.toLowerCase()}`)
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const res = await fetch(url);

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
    region: result.admin1 ?? undefined,
    timezone: result.timezone,
  };
}

// Forecast data changes frequently — 'minutes' profile revalidates every 1m
// in the background (stale-while-revalidate), hard expires after 1h.
// Tagged by coordinates so per-city cache entries can be invalidated independently.
async function fetchForecast(
  latitude: number,
  longitude: number,
  timezone: string
): Promise<{ current: CurrentWeather; daily: DailyForecast[] }> {
  'use cache'
  cacheLife('minutes')
  cacheTag(`forecast:${latitude},${longitude}`)
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,weathercode,wind_speed_10m",
    daily: "temperature_2m_max,temperature_2m_min,weathercode",
    timezone,
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params}`;
  const res = await fetch(url);

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
      weatherCode: data.daily.weathercode[i],
    })
  );

  return { current, daily };
}

/**
 * Returns up to `count` geocoding results for a partial city name.
 * Intended for autocomplete / search suggestions.
 *
 * 'hours' profile: same rationale as geocodeCity — search results are stable.
 * Tagged by query so individual autocomplete results can be invalidated if needed.
 */
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

/**
 * Fetches weather using known coordinates, bypassing geocoding.
 * Use this when lat/lon are already known (e.g. from search results) to
 * avoid ambiguity when multiple cities share the same name.
 */
export async function getWeatherByCoords(
  name: string,
  country: string,
  latitude: number,
  longitude: number,
  timezone: string,
  region?: string
): Promise<WeatherData> {
  const location: GeoLocation = { name, country, latitude, longitude, timezone, region };
  const { current, daily } = await fetchForecast(latitude, longitude, timezone);
  return { location, current, daily };
}
