import {
	BentoHeaderSkeleton,
	ForecastRowSkeleton,
} from "@/components/WeatherResult";

export default function Loading() {
	return (
		<main className="flex flex-1 flex-col items-center px-4 py-8 gap-6">
			<div className="w-full max-w-4xl">
				<div className="mb-4 h-5 w-24" />
				<BentoHeaderSkeleton />
			</div>
			<div className="w-full max-w-4xl">
				<ForecastRowSkeleton />
			</div>
		</main>
	);
}
