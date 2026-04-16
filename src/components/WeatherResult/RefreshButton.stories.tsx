import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RefreshButton } from "./RefreshButton";
import { MOCK_WEATHER } from "@/lib/mockData";

const meta: Meta<typeof RefreshButton> = {
  title: "Weather/RefreshButton",
  component: RefreshButton,
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
    latitude: MOCK_WEATHER.location.latitude,
    longitude: MOCK_WEATHER.location.longitude,
  },
};
