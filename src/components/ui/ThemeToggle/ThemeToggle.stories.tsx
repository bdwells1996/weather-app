import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider } from "@/components/ThemeProvider";

const meta: Meta<typeof ThemeToggle> = {
  title: "Design System/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="bg-surface p-8 rounded-xl flex items-center justify-center">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
