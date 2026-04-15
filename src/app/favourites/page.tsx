import Link from "next/link";
import { FavouritesList } from "@/components/FavouritesList/FavouritesList";

export default function FavouritesPage() {
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
					<FavouritesList />
				</div>
			</div>
		</main>
	);
}
