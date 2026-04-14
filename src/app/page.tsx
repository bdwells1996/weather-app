import { Suspense } from "react";
import { CitySearch } from "./_components/CitySearch";
import { WeatherSearchHeader, BentoHeaderSkeleton } from "@/components/WeatherResult";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 py-8 gap-6">
      {/* Bento header — always shows idle state */}
      <div className="w-full max-w-4xl">
        <Suspense fallback={<BentoHeaderSkeleton />}>
          <WeatherSearchHeader />
        </Suspense>
      </div>

      {/* Search with dropdown */}
      <div className="w-full max-w-md">
        <Suspense>
          <CitySearch />
        </Suspense>
      </div>
    </main>
  );
}
