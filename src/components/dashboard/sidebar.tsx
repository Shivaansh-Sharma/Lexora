"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/dashboard",
    label: "Overview",
  },
  {
    href: "/dashboard/analyze",
    label: "Analyze",
  },
  {
    href: "/dashboard/history",
    label: "History",
  },
  {
    href: "/dashboard/compare",
    label: "Compare",
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r bg-background lg:block">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Lexora
        </Link>
      </div>

      <nav className="space-y-2 p-4">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-4 py-3 text-sm transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}