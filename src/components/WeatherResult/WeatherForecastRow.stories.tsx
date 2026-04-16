import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WeatherForecastRow, ForecastRowSkeleton } from "./WeatherForecastRow";
import { MOCK_WEATHER } from "@/lib/mockData";

const meta: Meta<typeof WeatherForecastRow> = {
  title: "Weather/WeatherForecastRow",
  component: WeatherForecastRow,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    weather: MOCK_WEATHER,
  },
};

export const MixedWeather: Story = {
  args: {
    weather: {
      ...MOCK_WEATHER,
      daily: [
        { date: "2026-04-15", maxTemperature: 25, minTemperature: 18, weatherCode: 0 },
        { date: "2026-04-16", maxTemperature: 22, minTemperature: 16, weatherCode: 61 },
        { date: "2026-04-17", maxTemperature: 19, minTemperature: 14, weatherCode: 80 },
        { date: "2026-04-18", maxTemperature: 21, minTemperature: 15, weatherCode: 2 },
        { date: "2026-04-19", maxTemperature: 24, minTemperature: 17, weatherCode: 0 },
        { date: "2026-04-20", maxTemperature: 18, minTemperature: 12, weatherCode: 71 },
        { date: "2026-04-21", maxTemperature: 20, minTemperature: 14, weatherCode: 95 },
      ],
    },
  },
};

export const Skeleton: StoryObj = {
  render: () => <ForecastRowSkeleton />,
};
