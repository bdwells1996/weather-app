import { describeWeatherCode } from "@/lib/weatherCodes";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import type { WeatherData } from "@/lib/weather";

function formatDate(dateStr: string) {
	const date = new Date(dateStr);
	return {
		day: date.toLocaleDateString("en-GB", { weekday: "short" }),
		date: date.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
	};
}

export function WeatherForecastRow({ weather }: { weather: WeatherData }) {
	const { daily } = weather;

	return (
		<section>
			<h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
				7-Day Forecast
			</h3>
			<div className="grid grid-cols-1 gap-2 md:grid-cols-7">
				{daily.map((day, i) => {
					const condition = describeWeatherCode(day.weatherCode);
					const { day: dayName, date } = formatDate(day.date);
					const isToday = i === 0;
					return (
						<div
							key={day.date}
							className={`rounded-xl border p-3 text-center flex flex-col items-center gap-1 ${
								isToday
									? "border-purple-300 bg-purple-50 dark:bg-surface dark:border-purple-500"
									: "border-surface-border bg-surface"
							}`}
						>
							<p
								className={`text-xs font-bold uppercase tracking-wide ${
									isToday
										? "text-purple-600"
										: "text-foreground-muted dark:text-foreground"
								}`}
							>
								{isToday ? `Today (${dayName})` : dayName}
							</p>
							<p
								className={`text-xs ${
									isToday
										? "text-purple-500"
										: "text-foreground-subtle dark:text-foreground"
								}`}
							>
								{date}
							</p>
							<span
								className="text-2xl my-1"
								role="img"
								aria-label={condition.label}
							>
								{condition.emoji}
							</span>
							<p className="text-sm font-bold text-foreground">
								{Math.round(day.maxTemperature)}°
							</p>
							<p className="text-xs text-foreground-subtle dark:text-foreground">
								{Math.round(day.minTemperature)}°
							</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}

export function ForecastRowSkeleton() {
	return (
		<section>
			<Skeleton className="h-4 w-28 mb-3" />
			<div className="grid grid-cols-7 gap-2">
				{Array.from({ length: 7 }).map((_, i) => (
					<div
						key={i}
						className="rounded-xl border border-surface-border bg-surface p-3 flex flex-col items-center gap-1"
					>
						<Skeleton className="h-3 w-full" />
						<Skeleton className="h-3 w-3/4" />
						<Skeleton className="h-8 w-8 rounded-full my-1" />
						<Skeleton className="h-4 w-8" />
						<Skeleton className="h-3 w-6" />
					</div>
				))}
			</div>
		</section>
	);
}
