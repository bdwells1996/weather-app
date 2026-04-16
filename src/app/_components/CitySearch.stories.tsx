import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CitySearch } from "./CitySearch";

const meta: Meta<typeof CitySearch> = {
  title: "Weather/CitySearch",
  component: CitySearch,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
