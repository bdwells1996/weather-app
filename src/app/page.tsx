import { Suspense } from "react";
import {
	WeatherSearchHeader,
	BentoHeaderSkeleton,
} from "@/components/WeatherResult";
import { FavouritesList } from "@/components/FavouritesList/FavouritesList";

export default function Home() {
	return (
		<main className="flex flex-1 flex-col items-center px-4 py-8 gap-6">
			{/* Bento header — always shows idle state */}
			<div className="w-full max-w-4xl">
				<Suspense fallback={<BentoHeaderSkeleton />}>
					<WeatherSearchHeader />
					<FavouritesList title="Your Favourites" />
				</Suspense>
			</div>
		</main>
	);
}
