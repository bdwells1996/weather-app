import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FavouriteButton } from "./FavouriteButton";
import { MOCK_WEATHER } from "@/lib/mockData";

const meta: Meta<typeof FavouriteButton> = {
  title: "Weather/FavouriteButton",
  component: FavouriteButton,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="bg-purple-600 p-8 rounded-xl flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    city: MOCK_WEATHER.location,
  },
};
