"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { refreshWeather } from "@/app/weather/[city]/actions";
import { Button } from "@/components/ui/Button/Button";

export function RefreshButton({
	latitude,
	longitude,
}: {
	latitude: number;
	longitude: number;
}) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	function handleClick() {
		startTransition(async () => {
			await refreshWeather(latitude, longitude);
			router.refresh();
		});
	}

	return (
		<Button
			onClick={handleClick}
			disabled={isPending}
			type="button"
			variant="ghost"
			aria-label="Refresh the current weather result"
			className="p-0 focus-visible:ring-white/50"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
				className={`w-5 h-5 text-white transition-transform duration-500 ${isPending ? "animate-spin" : ""}`}
			>
				<title>Refresh the current weather result</title>
				<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
				<path d="M21 3v5h-5" />
				<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
				<path d="M8 16H3v5" />
			</svg>
		</Button>
	);
}
