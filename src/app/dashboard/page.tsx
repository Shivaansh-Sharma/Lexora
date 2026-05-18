import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

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
        <div>
          <h1 className="text-5xl font-bold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-3 text-lg text-muted-foreground">
            Logged in as {session?.user?.email}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border p-6">
            <p className="text-sm text-muted-foreground">
              Total Analyses
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              {totalAnalyses}
            </h2>
          </div>

          <div className="rounded-2xl border p-6">
            <p className="text-sm text-muted-foreground">
              Positive Results
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              {positiveAnalyses}
            </h2>
          </div>

          <div className="rounded-2xl border p-6">
            <p className="text-sm text-muted-foreground">
              NLP Modules
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              10+
            </h2>
          </div>

          <div className="rounded-2xl border p-6">
            <p className="text-sm text-muted-foreground">
              AI Engine
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              Active
            </h2>
          </div>
        </div>

        <div className="rounded-2xl border p-8">
          <h2 className="text-2xl font-semibold">
            Lexora Intelligence Platform
          </h2>

          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            Advanced multilingual NLP intelligence system powered by
            transformer-based AI models for sentiment analysis,
            summarization, entity recognition, readability analysis,
            and semantic understanding.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}