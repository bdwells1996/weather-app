"use client";

import Link from "next/link";
import { Card, CardBody } from "@/components/ui/Card/Card";
import { useFavourites } from "@/hooks/useFavourites";

export default function FavouritesPage() {
	const { favourites } = useFavourites();

	return (
		<main className="flex flex-1 flex-col items-center px-4 py-16">
			<div className="w-full max-w-[896px]">
				<Link
					href="/"
					className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-foreground-muted transition-colors"
				>
					&larr; Back to search
				</Link>

				<h1 className="text-3xl font-black text-foreground">Favourites</h1>
				<p className="mt-1.5 text-foreground-muted">Your saved cities</p>

				<div className="mt-8">
					{favourites.length === 0 ? (
						<Card className="bg-surface border-surface-border">
							<CardBody>
								<p className="text-foreground-subtle text-center py-4">
									No favourites saved yet.
								</p>
							</CardBody>
						</Card>
					) : (
						<div className="flex flex-col gap-3">
							{favourites.map((city) => (
								<Link
									key={city.name}
									href={`/weather/${encodeURIComponent(city.name)}`}
									className="block"
								>
									<Card className="bg-surface border-surface-border hover:border-purple-400 transition-colors cursor-pointer">
										<CardBody>
											<div className="flex items-center justify-between">
												<div>
													<p className="font-bold text-foreground">
														{city.name}
													</p>
													<p className="text-sm text-foreground-muted">
														{city.country}
													</p>
												</div>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth={2}
													strokeLinecap="round"
													strokeLinejoin="round"
													className="w-4 h-4 text-foreground-subtle"
												>
													<path d="M9 18l6-6-6-6" />
												</svg>
											</div>
										</CardBody>
									</Card>
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
