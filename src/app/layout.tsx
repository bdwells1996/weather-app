import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/Nav/Nav";

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
		<html lang="en" className={`${raleway.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col bg-background text-foreground">
				<Nav />
				{children}
			</body>
		</html>
	);
}
