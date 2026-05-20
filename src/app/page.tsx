import { Navbar } from "@/components/layout/navbar";

import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Brain,
  Languages,
} from "lucide-react";

export default function HomePage() {

  return (

    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-3xl" />

        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-3xl" />

        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <Navbar />

      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-6 pt-20">

        <div className="text-center">

          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium backdrop-blur-xl">

            <Sparkles className="h-4 w-4 text-violet-400" />

            Advanced Multilingual NLP Intelligence
          </div>

          <h1 className="mx-auto mt-10 max-w-6xl text-6xl font-black tracking-tight sm:text-8xl">

            AI-powered
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              {" "}
              semantic intelligence{" "}
            </span>

            for modern text analysis.
          </h1>

          <p className="mx-auto mt-10 max-w-3xl text-xl leading-9 text-muted-foreground">

            Lexora transforms raw text into intelligent insights using advanced transformer-based NLP systems, semantic analysis, multilingual understanding, AI detection, plagiarism analysis, and contextual intelligence.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">

  <a
    href="/login"
    className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-base font-medium text-white shadow-[0_0_40px_rgba(124,58,237,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(124,58,237,0.35)]"
  >

    Get Started

    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
  </a>

  <a
    href="/signup"
    className="rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-base font-medium backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:bg-violet-500/10"
  >

    Create Account
  </a>
</div>
        </div>

        <div className="mt-28 mb-24 grid w-full gap-8 lg:grid-cols-3">

          <div className="group rounded-[2rem] border border-white/10 bg-card/70 p-10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400">

              <Brain className="h-7 w-7" />
            </div>

            <h3 className="mt-10 text-2xl font-bold tracking-tight">

              AI Intelligence
            </h3>

            <p className="mt-4 leading-8 text-muted-foreground">

              Advanced transformer-based semantic analysis powered by enterprise-grade NLP intelligence systems.
            </p>
          </div>

          <div className="group rounded-[2rem] border border-white/10 bg-card/70 p-10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">

              <Languages className="h-7 w-7" />
            </div>

            <h3 className="mt-10 text-2xl font-bold tracking-tight">

              Multilingual NLP
            </h3>

            <p className="mt-4 leading-8 text-muted-foreground">

              Analyze multilingual text with contextual understanding, sentiment analysis, and linguistic intelligence.
            </p>
          </div>

          <div className="group rounded-[2rem] border border-white/10 bg-card/70 p-10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-400">

              <ShieldCheck className="h-7 w-7" />
            </div>

            <h3 className="mt-10 text-2xl font-bold tracking-tight">

              AI Detection
            </h3>

            <p className="mt-4 leading-8 text-muted-foreground">

              Detect plagiarism, AI-generated content, semantic overlap, and contextual similarity with precision.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}