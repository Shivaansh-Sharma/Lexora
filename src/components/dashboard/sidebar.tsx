"use client";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Settings,
  Sparkles,
} from "lucide-react";

const links = [

  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },

  {
    href: "/dashboard/analyze",
    label: "Analyze",
    icon: Sparkles,
  },

  {
    href: "/dashboard/reports",
    label: "Reports",
    icon: FileText,
  },

  {
    href: "/dashboard/compare",
    label: "Compare",
    icon: BarChart3,
  },

  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function Sidebar({
  mobile = false,
}: {
  mobile?: boolean;
}) {

  const pathname =
    usePathname();

  return (

    <aside
  className={`${
    mobile
      ? "flex w-full"
      : "hidden lg:flex w-80"
  } flex-col p-4`}
>

  <div className="flex flex-1 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-sidebar/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(124,58,237,0.08)]">
      <div className="flex h-20 items-center border-b border-white/10 px-8">

        <Link
          href="/"
          className="flex items-center gap-4"
        >

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_0_30px_rgba(124,58,237,0.35)]">

            <Sparkles className="h-5 w-5 text-white" />
          </div>

          <div>

            <h1 className="text-xl font-bold tracking-tight">

              Lexora
            </h1>

            <p className="text-xs text-muted-foreground">

              AI Intelligence Suite
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-3 p-5">

        {links.map(
          (link) => {

            const active =
              pathname ===
              link.href;

            const Icon =
              link.icon;

            return (

              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-medium transition-all duration-200 ${
                  active

                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_30px_rgba(124,58,237,0.25)]"

                    : "text-muted-foreground hover:bg-violet-500/10 hover:text-foreground hover:shadow-[0_0_20px_rgba(124,58,237,0.08)]"
                }`}
              >

                <Icon
                  className={`h-5 w-5 transition-transform duration-200 ${
                    active
                      ? "scale-110"
                      : "group-hover:scale-105"
                  }`}
                />

                <span>
                  {link.label}
                </span>
              </Link>
            );
          }
        )}
      </nav>

      <div className="border-t border-white/10 p-5">

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">

          <p className="text-sm font-medium">
            Lexora AI
          </p>

          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">

            Premium AI analysis workspace with intelligent reporting.
          </p>
        </div>
      </div>
       </div>
    </aside>

  );
}