"use client";

import { Search } from "lucide-react";

import { ThemeToggle }
from "@/components/layout/theme-toggle";

export function Topbar() {

  return (

    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/70 backdrop-blur-2xl">

      <div className="flex h-20 items-center justify-between px-8 xl:px-10">

        <div className="flex items-center gap-6">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">

              AI Workspace
            </p>

            <h1 className="mt-1 text-2xl font-black tracking-tight">

              Lexora Dashboard
            </h1>
          </div>

          
        </div>

        <div className="flex items-center gap-4">

          <div className="hidden md:flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl">

            <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.7)]" />

            <span className="text-sm font-medium">

              Systems Operational
            </span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-xl">

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}