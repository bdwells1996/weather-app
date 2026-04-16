import type { WeatherData } from "./weather";

export const MOCK_WEATHER: WeatherData = {
  location: {
    name: "Sydney",
    country: "Australia",
    region: "New South Wales",
    latitude: -33.8688,
    longitude: 151.2093,
    timezone: "Australia/Sydney",
  },
  current: {
    temperature: 24.5,
    weatherCode: 0,
    windSpeed: 12.4,
  },
  daily: [
    { date: "2026-04-15", maxTemperature: 25, minTemperature: 18, weatherCode: 0 },
    { date: "2026-04-16", maxTemperature: 26, minTemperature: 19, weatherCode: 1 },
    { date: "2026-04-17", maxTemperature: 24, minTemperature: 17, weatherCode: 2 },
    { date: "2026-04-18", maxTemperature: 22, minTemperature: 16, weatherCode: 3 },
    { date: "2026-04-19", maxTemperature: 23, minTemperature: 17, weatherCode: 51 },
    { date: "2026-04-20", maxTemperature: 25, minTemperature: 18, weatherCode: 0 },
    { date: "2026-04-21", maxTemperature: 27, minTemperature: 20, weatherCode: 1 },
  ],
};
