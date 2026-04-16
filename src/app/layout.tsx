import { Suspense } from "react";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/Nav/Nav";
import { ThemeProvider } from "@/components/ThemeProvider";

const raleway = Raleway({
	subsets: ["latin"],
	variable: "--font-raleway",
	display: "swap",
});

export const metadata: Metadata = {
	title: "WeatherApp",
	description: "Search and save weather for your favourite cities",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${raleway.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<head>
				{/* Inline script runs synchronously before paint to prevent flash */}
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
					}}
				/>
			</head>
			<body className="min-h-full flex flex-col bg-background text-foreground">
				<ThemeProvider>
					<Suspense
						fallback={
							<nav className="h-[57px] border-b border-surface-border bg-surface" />
						}
					>
						<Nav />
					</Suspense>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
