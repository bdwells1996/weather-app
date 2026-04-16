import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FavouritesList } from "./FavouritesList";

const meta: Meta<typeof FavouritesList> = {
  title: "Weather/FavouritesList",
  component: FavouritesList,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Your Favourites",
  },
};

export const WithoutTitle: Story = {
  args: {},
};
