import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { FadeIn }
from "@/components/ui/fade-in";

export default async function DashboardPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
    include: {
      analyses: true,
    },
  });

  const totalAnalyses = user?.analyses.length || 0;

  const positiveAnalyses =
    user?.analyses.filter(
      (analysis) =>
        (analysis.result as { label?: string }).label ===
        "POSITIVE"
    ).length || 0;

return (
  <DashboardShell>

    <div className="space-y-10">
      <FadeIn>
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-600/20 via-background to-indigo-600/10 p-10 shadow-[0_0_60px_rgba(124,58,237,0.15)]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.18),transparent_35%)]" />

        <div className="relative z-10">

          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-xl">

            <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />

            AI Engine Active
          </div>

          <h1 className="mt-8 max-w-4xl text-6xl font-black tracking-tight">

            AI-powered
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              {" "}
              intelligence{" "}
            </span>

            workspace for modern text analysis.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">

            Lexora transforms raw text into intelligent insights using advanced transformer-based NLP systems, semantic analysis, AI detection, and multilingual understanding.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">

              <p className="text-sm text-muted-foreground">
                Logged in as
              </p>

              <p className="mt-1 font-medium">
                {session?.user?.email}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">

              <p className="text-sm text-muted-foreground">
                NLP Modules
              </p>

              <p className="mt-1 font-medium">
                10+ Active
              </p>
            </div>
          </div>
        </div>
      </div>
      </FadeIn>
      <FadeIn delay={0.1}>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="group rounded-[2rem] border border-white/10 bg-card/70 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]">

          <div className="flex items-center justify-between">

            <p className="text-sm font-medium text-muted-foreground">

              Total Analyses
            </p>

            <div className="rounded-2xl bg-violet-500/15 p-3 text-violet-400">

              ✦
            </div>
          </div>

          <h2 className="mt-8 text-5xl font-black tracking-tight">

            {totalAnalyses}
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">

            Intelligent NLP reports generated
          </p>
        </div>

        <div className="group rounded-[2rem] border border-white/10 bg-card/70 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(59,130,246,0.12)]">

          <div className="flex items-center justify-between">

            <p className="text-sm font-medium text-muted-foreground">

              Positive Results
            </p>

            <div className="rounded-2xl bg-blue-500/15 p-3 text-blue-400">

              ↗
            </div>
          </div>

          <h2 className="mt-8 text-5xl font-black tracking-tight">

            {positiveAnalyses}
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">

            Positive sentiment detections
          </p>
        </div>

        <div className="group rounded-[2rem] border border-white/10 bg-card/70 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(34,197,94,0.12)]">

          <div className="flex items-center justify-between">

            <p className="text-sm font-medium text-muted-foreground">

              AI Modules
            </p>

            <div className="rounded-2xl bg-green-500/15 p-3 text-green-400">

              ⚡
            </div>
          </div>

          <h2 className="mt-8 text-5xl font-black tracking-tight">

            10+
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">

            Transformer-powered pipelines
          </p>
        </div>

        <div className="group rounded-[2rem] border border-white/10 bg-card/70 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(168,85,247,0.12)]">

          <div className="flex items-center justify-between">

            <p className="text-sm font-medium text-muted-foreground">

              System Status
            </p>

            <div className="rounded-2xl bg-purple-500/15 p-3 text-purple-400">

              ●
            </div>
          </div>

          <h2 className="mt-8 text-4xl font-black tracking-tight">

            Active
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">

            All intelligence systems operational
          </p>
        </div>
      </div>
      </FadeIn>
      <FadeIn delay={0.2}>
      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2 rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl">

          <h2 className="text-2xl font-bold tracking-tight">

            Lexora Intelligence Platform
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">

            Advanced multilingual NLP intelligence system powered by transformer-based AI models for sentiment analysis, summarization, entity recognition, readability analysis, plagiarism detection, AI detection, and semantic understanding.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            {[
              "Sentiment",
              "NER",
              "AI Detection",
              "Plagiarism",
              "Summarization",
              "Keywords",
            ].map((item) => (

              <div
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-xl"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-600/15 to-indigo-600/10 p-8 shadow-[0_0_40px_rgba(124,58,237,0.12)]">

          <p className="text-sm font-medium text-violet-300">

            Intelligence Overview
          </p>

          <h3 className="mt-5 text-4xl font-black tracking-tight">

            Premium AI
            <br />
            Workspace
          </h3>

          <p className="mt-5 leading-7 text-muted-foreground">

            Enterprise-grade NLP intelligence suite with advanced AI analysis, semantic comparison, and multilingual understanding.
          </p>

          <div className="mt-8 space-y-4">

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3">

              <span className="text-sm">
                Analysis Engine
              </span>

              <span className="text-sm text-green-400">
                Online
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3">

              <span className="text-sm">
                NLP Processing
              </span>

              <span className="text-sm text-green-400">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3">

              <span className="text-sm">
                Semantic AI
              </span>

              <span className="text-sm text-green-400">
                Running
              </span>
            </div>
          </div>
        </div>
      </div>
      </FadeIn>
    </div>
  </DashboardShell>
);
}