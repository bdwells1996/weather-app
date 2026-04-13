import Link from "next/link";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="mb-2 text-5xl font-black tracking-tight text-foreground">
          Weather<span className="text-purple-500">.</span>
        </h1>
        <p className="mb-8 text-foreground-muted">
          Search any city to get the current forecast.
        </p>

        <form className="flex flex-col gap-3" method="get">
          <Input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="City name — e.g. Tokyo, Sydney…"
          />
          <Button type="submit" size="lg" fullWidth>
            Search
          </Button>
        </form>

        {q && (
          <p className="mt-6 text-sm text-foreground-muted">
            Showing results for{" "}
            <span className="font-semibold text-foreground">&ldquo;{q}&rdquo;</span>
            {" — "}
            <Link
              href={`/weather/${encodeURIComponent(q)}`}
              className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
            >
              View weather &rarr;
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
