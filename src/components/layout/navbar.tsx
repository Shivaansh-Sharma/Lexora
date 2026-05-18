import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="border-b border-border/40">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Lexora
        </Link>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/features">Features</Link>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}