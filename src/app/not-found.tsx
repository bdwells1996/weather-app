import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex flex-1 flex-col items-center justify-center px-4 py-8 gap-4 text-center">
			<p className="text-6xl font-bold text-foreground-muted">404</p>
			<h1 className="text-2xl font-semibold">Page not found</h1>
			<p className="text-foreground-muted max-w-sm">
				The page you&apos;re looking for doesn&apos;t exist or has been moved.
			</p>
			<Link
				href="/"
				className="mt-2 px-5 py-2.5 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
			>
				Back to home
			</Link>
		</main>
	);
}
