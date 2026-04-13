"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navLinks } from "./nav-links";

export default function Nav() {
	const pathname = usePathname();

	return (
		<nav className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface">
			<Link
				href="/"
				className="text-xl font-bold tracking-tight text-foreground"
			>
				Weather<span className="text-purple-500">App</span>
			</Link>
			<ul className="flex items-center gap-1">
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
										? "bg-purple-600/15 text-purple-400"
										: "text-foreground-muted hover:bg-surface-raised hover:text-foreground",
								)}
							>
								<Icon size={15} aria-hidden="true" />
								<span>{label}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
