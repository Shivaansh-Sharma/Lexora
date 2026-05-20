"use client";


import { ThemeToggle }
from "@/components/layout/theme-toggle";

import {
  Menu,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Sidebar }
from "./sidebar";

export function Topbar() {

  return (

    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/10 bg-background/70 px-6 backdrop-blur-2xl">

  <div className="flex items-center gap-4">

    <div className="lg:hidden">

      <Sheet>

        <SheetTrigger asChild>

          <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all hover:bg-white/10">

            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[300px] border-white/10 bg-background/95 p-0 backdrop-blur-2xl"
        >

          <Sidebar mobile />
        </SheetContent>
      </Sheet>
    </div>

    <div>

      <h1 className="text-lg font-bold tracking-tight">

        Lexora Dashboard
      </h1>

      <p className="text-xs text-muted-foreground">

        AI Intelligence Workspace
      </p>
    </div>
  </div>

  <ThemeToggle />
</header>
  );
}