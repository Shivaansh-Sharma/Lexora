import AnalysisCard from "@/components/dashboard/analysis-card";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

export default async function HistoryPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
  });

  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <DashboardShell>
      <div>
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Analysis History
            </h1>

            <p className="mt-2 text-muted-foreground">
              Your previous AI-powered NLP analyses.
            </p>
          </div>

          <div className="rounded-2xl border px-6 py-4">
            <p className="text-sm text-muted-foreground">
              Total Analyses
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {analyses.length}
            </h2>
          </div>
        </div>

        {analyses.length === 0 ? (
          <div className="rounded-2xl border p-10 text-center">
            <p className="text-muted-foreground">
              No analyses yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {analyses.map((analysis) => {
              const result = analysis.result as {
                label: string;
                score: number;
              };

              return (
                <AnalysisCard
                  key={analysis.id}
                  type={analysis.type}
                  inputText={analysis.inputText}
                  label={result.label}
                  score={result.score}
                  createdAt={analysis.createdAt}
                />
              );
            })}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}