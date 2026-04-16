import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WeatherIllustration, WEATHER_STATE_GRADIENT } from "./WeatherIllustration";

const meta: Meta<typeof WeatherIllustration> = {
  title: "Weather/WeatherIllustration",
  component: WeatherIllustration,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story, context) => {
      const state = context.args.state as keyof typeof WEATHER_STATE_GRADIENT;
      const gradient = WEATHER_STATE_GRADIENT[state] || WEATHER_STATE_GRADIENT.idle;
      return (
        <div className={`relative w-96 h-64 rounded-2xl bg-gradient-to-br ${gradient} p-8 overflow-hidden`}>
          <Story />
          <div className="relative z-10 text-white font-bold text-xl uppercase opacity-50">
            {state}
          </div>
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Sunny: Story = {
  args: {
    state: "sunny",
  },
};

export const PartlyCloudy: Story = {
  args: {
    state: "partly-cloudy",
  },
};

export const Cloudy: Story = {
  args: {
    state: "cloudy",
  },
};

export const Rain: Story = {
  args: {
    state: "rain",
  },
};

export const Snow: Story = {
  args: {
    state: "snow",
  },
};

export const Storm: Story = {
  args: {
    state: "storm",
  },
};

export const Fog: Story = {
  args: {
    state: "fog",
  },
};

export const Idle: Story = {
  args: {
    state: "idle",
  },
};

export const Loading: Story = {
  args: {
    state: "loading",
  },
};
