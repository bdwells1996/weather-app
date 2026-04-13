import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card/Card";

export default async function CityWeatherPage(
  props: PageProps<"/weather/[city]">
) {
  const { city } = await props.params;
  const cityName = decodeURIComponent(city);

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-16">
      <div className="w-full max-w-lg">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground-muted hover:text-foreground transition-colors"
        >
          &larr; Back to search
        </Link>

        <h1 className="text-3xl font-black capitalize text-foreground">
          {cityName}
        </h1>
        <p className="mt-1.5 text-foreground-muted">
          Weather details for {cityName}
        </p>

        <div className="mt-8">
          <Card className="bg-surface border-surface-border">
            <CardBody>
              <p className="text-foreground-subtle text-center py-4">
                Weather data coming soon.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
