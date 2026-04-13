import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Design System/Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeScale: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <p className="text-xs text-gray-400 mb-1 font-mono">text-5xl · font-800</p>
        <p className="text-5xl font-extrabold text-gray-900 leading-tight">
          Weather at a glance
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-1 font-mono">text-3xl · font-700</p>
        <p className="text-3xl font-bold text-gray-900">Today's Forecast</p>
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-1 font-mono">text-xl · font-600</p>
        <p className="text-xl font-semibold text-gray-800">Sydney, Australia</p>
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-1 font-mono">text-base · font-400</p>
        <p className="text-base text-gray-700 leading-relaxed max-w-prose">
          Mostly sunny skies throughout the day with a pleasant high of 24°C.
          Light northerly winds and low humidity make for ideal outdoor
          conditions.
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-1 font-mono">text-sm · font-500</p>
        <p className="text-sm font-medium text-gray-600">
          Updated 5 minutes ago
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-1 font-mono">text-xs · font-400</p>
        <p className="text-xs text-gray-400">Source: Open-Meteo API</p>
      </div>
    </div>
  ),
};

export const PurpleScale: Story = {
  render: () => (
    <div className="space-y-3 max-w-xl">
      <p className="text-sm font-semibold text-gray-500 mb-4">Purple Accent Palette</p>
      {[
        { shade: "50", bg: "bg-purple-50", text: "text-purple-900" },
        { shade: "100", bg: "bg-purple-100", text: "text-purple-900" },
        { shade: "200", bg: "bg-purple-200", text: "text-purple-900" },
        { shade: "300", bg: "bg-purple-300", text: "text-purple-900" },
        { shade: "400", bg: "bg-purple-400", text: "text-white" },
        { shade: "500", bg: "bg-purple-500", text: "text-white" },
        { shade: "600", bg: "bg-purple-600", text: "text-white" },
        { shade: "700", bg: "bg-purple-700", text: "text-white" },
        { shade: "800", bg: "bg-purple-800", text: "text-white" },
        { shade: "900", bg: "bg-purple-900", text: "text-white" },
        { shade: "950", bg: "bg-purple-950", text: "text-white" },
      ].map(({ shade, bg, text }) => (
        <div
          key={shade}
          className={`${bg} ${text} flex items-center justify-between rounded-lg px-4 py-2.5`}
        >
          <span className="font-semibold">Purple {shade}</span>
          <span className="font-mono text-xs opacity-80">purple-{shade}</span>
        </div>
      ))}
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-3 max-w-lg">
      <p className="text-sm font-semibold text-gray-500 mb-4">Raleway — Font Weights</p>
      {[
        { label: "Light 300", className: "font-light" },
        { label: "Regular 400", className: "font-normal" },
        { label: "Medium 500", className: "font-medium" },
        { label: "SemiBold 600", className: "font-semibold" },
        { label: "Bold 700", className: "font-bold" },
        { label: "ExtraBold 800", className: "font-extrabold" },
        { label: "Black 900", className: "font-black" },
      ].map(({ label, className }) => (
        <div key={label} className="flex items-baseline gap-4">
          <span className="w-32 text-xs text-gray-400 font-mono">{label}</span>
          <p className={`text-2xl text-gray-900 ${className}`}>
            The quick brown fox
          </p>
        </div>
      ))}
    </div>
  ),
};
