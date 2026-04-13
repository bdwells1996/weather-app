import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Design System/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["purple", "gray", "green", "red", "yellow", "blue"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Purple: Story = {
  args: { variant: "purple", children: "Favourite" },
};

export const Gray: Story = {
  args: { variant: "gray", children: "Archived" },
};

export const Green: Story = {
  args: { variant: "green", children: "Clear" },
};

export const Red: Story = {
  args: { variant: "red", children: "Storm Warning" },
};

export const Yellow: Story = {
  args: { variant: "yellow", children: "Partly Cloudy" },
};

export const Blue: Story = {
  args: { variant: "blue", children: "Rainy" },
};

export const AllVariants: Story = {
  args: { variant: "purple", children: "Favourite" },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="purple">Favourite</Badge>
      <Badge variant="gray">Archived</Badge>
      <Badge variant="green">Clear</Badge>
      <Badge variant="red">Storm Warning</Badge>
      <Badge variant="yellow">Partly Cloudy</Badge>
      <Badge variant="blue">Rainy</Badge>
    </div>
  ),
};
