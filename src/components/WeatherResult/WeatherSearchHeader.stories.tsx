import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WeatherSearchHeader } from "./WeatherSearchHeader";

const meta: Meta<typeof WeatherSearchHeader> = {
  title: "Weather/WeatherSearchHeader",
  component: WeatherSearchHeader,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
