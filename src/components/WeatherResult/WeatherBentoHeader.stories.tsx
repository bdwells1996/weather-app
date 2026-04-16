import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WeatherBentoHeader, BentoHeaderSkeleton } from "./WeatherBentoHeader";
import { MOCK_WEATHER } from "@/lib/mockData";

const meta: Meta<typeof WeatherBentoHeader> = {
  title: "Weather/WeatherBentoHeader",
  component: WeatherBentoHeader,
  parameters: {
    layout: "padded",
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Clear: Story = {
  args: {
    weather: MOCK_WEATHER,
    error: null,
  },
};

export const Rainy: Story = {
  args: {
    weather: {
      ...MOCK_WEATHER,
      current: { ...MOCK_WEATHER.current, weatherCode: 63, temperature: 18.5 },
    },
    error: null,
  },
};

export const Stormy: Story = {
  args: {
    weather: {
      ...MOCK_WEATHER,
      current: { ...MOCK_WEATHER.current, weatherCode: 95, temperature: 21.0 },
    },
    error: null,
  },
};

export const ErrorState: Story = {
  args: {
    weather: null,
    error: "Failed to load weather data. Please try again.",
  },
};

export const Skeleton: StoryObj = {
  render: () => <BentoHeaderSkeleton />,
};
