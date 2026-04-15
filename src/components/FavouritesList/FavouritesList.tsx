"use client";

import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card/Card";
import { useFavourites } from "@/hooks/useFavourites";
import { ChevronRight } from "lucide-react";

interface FavouritesListProps {
	title?: string;
}

export function FavouritesList({ title }: FavouritesListProps) {
	const { favourites } = useFavourites();

	if (favourites.length === 0) {
		return (
			<>
				{title && (
					<h2 className="text-lg font-semibold text-foreground mb-4">
						{title}
					</h2>
				)}
				<Card className="bg-surface border-surface-border">
					<CardBody>
						<p className="text-foreground-subtle text-center py-4">
							No favourites saved yet.
						</p>
					</CardBody>
				</Card>
			</>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			{title && (
				<h2 className="text-lg font-semibold text-foreground">{title}</h2>
			)}
			{favourites.map((city) => (
				<Link
					key={`${city.latitude}-${city.longitude}`}
					href={`/weather/${encodeURIComponent(city.name)}?lat=${city.latitude}&lon=${city.longitude}&tz=${encodeURIComponent(city.timezone)}&country=${encodeURIComponent(city.country)}${city.region ? `&region=${encodeURIComponent(city.region)}` : ""}`}
					className="block"
				>
					<Card className="bg-surface border-surface-border hover:border-purple-400 transition-colors cursor-pointer">
						<CardBody>
							<div className="flex items-center justify-between">
								<div className="mr-auto">
									<p className="font-bold text-foreground">{city.name}</p>
									<p className="text-sm text-foreground-muted">
										{city.country}
									</p>
								</div>
								<ChevronRight size={18} className="text-foreground ml-4" />
							</div>
						</CardBody>
					</Card>
				</Link>
			))}
		</div>
	);
}
