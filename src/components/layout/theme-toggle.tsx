"use client";

import {
  Moon,
  Sun,
} from "lucide-react";

import {
  useTheme,
} from "next-themes";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

export function ThemeToggle() {

  const [
    mounted,
    setMounted,
  ] = useState(false);

  const {
    theme,
    setTheme,
  } = useTheme();

  useEffect(() => {

    setMounted(true);

  }, []);

  if (!mounted) {

    return (

      <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">

        <div className="h-4 w-4" />
      </button>
    );
  }

  const isDark =
    theme === "dark";

  return (

    <button
      onClick={() =>
        setTheme(
          isDark
            ? "light"
            : "dark"
        )
      }
      className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/20 hover:bg-violet-500/10"
    >

      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">

        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/10" />
      </div>

      <AnimatePresence
        mode="wait"
        initial={false}
      >

        <motion.div
          key={theme}

          initial={{
            opacity: 0,
            rotate: -90,
            scale: 0.7,
          }}

          animate={{
            opacity: 1,
            rotate: 0,
            scale: 1,
          }}

          exit={{
            opacity: 0,
            rotate: 90,
            scale: 0.7,
          }}

          transition={{
            duration: 0.2,
          }}

          className="relative z-10"
        >

          {isDark ? (

            <Sun className="h-5 w-5 text-amber-300" />

          ) : (

            <Moon className="h-5 w-5 text-violet-400" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}