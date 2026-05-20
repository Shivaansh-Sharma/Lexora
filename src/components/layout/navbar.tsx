import Link from "next/link";

import { ThemeToggle }
from "@/components/layout/theme-toggle";

export function Navbar() {

  return (

    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-2xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="group flex items-center gap-3"
        >

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-lg font-black text-white shadow-[0_0_30px_rgba(124,58,237,0.3)]">

            L
          </div>

          <div>

            <p className="text-lg font-black tracking-tight">

              Lexora
            </p>

            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">

              AI Intelligence
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-4">

          <nav className="hidden items-center gap-2 md:flex">

            <Link
              href="/features"
              className="rounded-2xl px-5 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-white/[0.03] hover:text-foreground"
            >
              Features
            </Link>

            <Link
              href="/login"
              className="rounded-2xl px-5 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-white/[0.03] hover:text-foreground"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(124,58,237,0.35)]"
            >
              Get Started
            </Link>
          </nav>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-xl">

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}