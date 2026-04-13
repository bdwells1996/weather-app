import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./Input";

const meta = {
  title: "Design System/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Search city",
    placeholder: "e.g. Sydney, Tokyo…",
  },
};

export const WithHint: Story = {
  args: {
    label: "City",
    placeholder: "Enter a city name",
    hint: "We'll look up the current weather for this city.",
  },
};

export const WithError: Story = {
  args: {
    label: "City",
    placeholder: "Enter a city name",
    defaultValue: "??",
    error: "City not found. Please try again.",
  },
};

export const Disabled: Story = {
  args: {
    label: "API Key",
    value: "sk-••••••••",
    disabled: true,
  },
};

export const NoLabel: Story = {
  args: {
    placeholder: "Search for a city…",
  },
};
