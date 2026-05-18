import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">
          Lexora Dashboard
        </h1>
      </div>

      <ThemeToggle />
    </header>
  );
}