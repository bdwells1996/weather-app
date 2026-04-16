"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { navLinks } from "./nav-links";
import { Button } from "@/components/ui/Button/Button";

const ThemeToggle = dynamic(
	() =>
		import("@/components/ui/ThemeToggle/ThemeToggle").then(
			(mod) => mod.ThemeToggle,
		),
	{
		ssr: false,
		loading: () => (
			<div className="h-7 w-13 shrink-0 rounded-full border border-surface-border bg-surface-raised" />
		),
	},
);

export default function Nav() {
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav className="border-b border-surface-border bg-surface">
			<div className="flex items-center justify-between px-6 py-4 max-w-6xl my-0 mx-auto">
				<Link
					href="/"
					className="text-xl font-bold tracking-tight text-foreground"
					onClick={() => setMenuOpen(false)}
				>
					Weather<span className="text-purple-500">App</span>
				</Link>
				<div className="flex items-center gap-1 md:gap-2">
					{/* Desktop links */}
					<ul className="hidden sm:flex items-center gap-1">
						{navLinks.map(({ label, href, icon: Icon }) => {
							const isActive = pathname === href;

							return (
								<li key={href}>
									<Link
										href={href}
										aria-current={isActive ? "page" : undefined}
										className={clsx(
											"flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
											isActive
												? "bg-surface text-purple-500 border border-purple-500 pointer-events-none"
												: "text-foreground-muted border border-transparent hover:bg-surface-raised hover:text-foreground",
										)}
									>
										<Icon size={15} aria-hidden="true" />
										<span>{label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
					<ThemeToggle />
					{/* Hamburger button */}
					<Button
						type="button"
						className="sm:hidden text-foreground-muted"
						aria-label={menuOpen ? "Close menu" : "Open menu"}
						aria-expanded={menuOpen}
						onClick={() => setMenuOpen((v) => !v)}
					>
						{menuOpen ? (
							<X size={20} aria-hidden="true" />
						) : (
							<Menu size={20} aria-hidden="true" />
						)}
					</Button>
				</div>
			</div>

			{/* Mobile menu */}
			<div
				className={clsx(
					"sm:hidden overflow-hidden transition-[opacity,max-height] duration-200 ease-in-out",
					menuOpen
						? "opacity-100 max-h-64"
						: "opacity-0 max-h-0 pointer-events-none",
				)}
			>
				<ul className="flex flex-col px-4 pb-4 gap-1">
					{navLinks.map(({ label, href, icon: Icon }) => {
						const isActive = pathname === href;

						return (
							<li key={href}>
								<Link
									href={href}
									aria-current={isActive ? "page" : undefined}
									onClick={() => setMenuOpen(false)}
									className={clsx(
										"flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-semibold transition-colors",
										isActive
											? "bg-surface text-purple-400 border border-purple-500/50"
											: "text-foreground-muted border border-transparent hover:bg-surface-raised hover:text-foreground",
									)}
								>
									<Icon size={18} aria-hidden="true" />
									<span>{label}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}
