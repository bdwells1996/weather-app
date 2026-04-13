import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from "./Card";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";

const meta = {
  title: "Design System/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    accent: { control: "boolean" },
    elevated: { control: "boolean" },
    interactive: { control: "boolean" },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const args = { children: null as unknown as React.ReactNode };

export const Default: Story = {
  args,
  render: (storyArgs) => (
    <Card accent={storyArgs.accent} elevated={storyArgs.elevated} interactive={storyArgs.interactive}>
      <CardHeader>
        <CardTitle>Sydney, AU</CardTitle>
        <Badge variant="green">Clear</Badge>
      </CardHeader>
      <CardBody>
        Sunny skies throughout the day with a high of 24°C and light northerly
        winds.
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="primary">View Forecast</Button>
        <Button size="sm" variant="ghost">Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const Accented: Story = {
  args,
  render: () => (
    <Card accent>
      <CardHeader>
        <CardTitle>Tokyo, JP</CardTitle>
        <Badge variant="blue">Rainy</Badge>
      </CardHeader>
      <CardBody>
        Expect heavy rainfall through the morning with clearing skies in the
        afternoon. High of 18°C.
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="primary">View Forecast</Button>
      </CardFooter>
    </Card>
  ),
};

export const Elevated: Story = {
  args,
  render: () => (
    <Card elevated>
      <CardHeader>
        <CardTitle>New York, US</CardTitle>
        <Badge variant="yellow">Partly Cloudy</Badge>
      </CardHeader>
      <CardBody>
        A mix of sun and clouds with temperatures reaching 21°C. Light winds
        from the southwest.
      </CardBody>
    </Card>
  ),
};

export const Interactive: Story = {
  args,
  render: () => (
    <Card interactive elevated>
      <CardHeader>
        <CardTitle>London, UK</CardTitle>
        <Badge variant="gray">Overcast</Badge>
      </CardHeader>
      <CardBody>Click this card to view the full weekly forecast.</CardBody>
    </Card>
  ),
};

export const WeatherGrid: Story = {
  args,
  parameters: { layout: "padded" },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {[
        { city: "Sydney, AU", condition: "Clear", variant: "green" as const, desc: "Sunny, 24°C" },
        { city: "Tokyo, JP", condition: "Rainy", variant: "blue" as const, desc: "Heavy rain, 18°C" },
        { city: "London, UK", condition: "Overcast", variant: "gray" as const, desc: "Cloudy, 13°C" },
        { city: "New York, US", condition: "Partly Cloudy", variant: "yellow" as const, desc: "Mixed, 21°C" },
      ].map(({ city, condition, variant, desc }) => (
        <Card key={city} interactive elevated>
          <CardHeader>
            <CardTitle>{city}</CardTitle>
            <Badge variant={variant}>{condition}</Badge>
          </CardHeader>
          <CardBody>{desc}</CardBody>
        </Card>
      ))}
    </div>
  ),
};
