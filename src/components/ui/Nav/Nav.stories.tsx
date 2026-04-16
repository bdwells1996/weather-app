import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Nav from "./Nav";

const meta: Meta<typeof Nav> = {
  title: "Design System/Nav",
  component: Nav,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
