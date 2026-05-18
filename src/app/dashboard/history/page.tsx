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
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Analysis History
          </h1>

          <p className="mt-2 text-muted-foreground">
            Your previous NLP analyses.
          </p>
        </div>

        <div className="space-y-4">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className="rounded-2xl border p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {analysis.type}
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    {analysis.inputText.slice(0, 120)}
                  </h2>
                </div>

                <p className="text-sm text-muted-foreground">
                  {new Date(
                    analysis.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-6 rounded-xl bg-muted p-4">
                <pre className="overflow-x-auto text-sm">
                  {JSON.stringify(analysis.result, null, 2)}
                </pre>
              </div>
            </div>
          ))}

          {analyses.length === 0 && (
            <div className="rounded-2xl border p-10 text-center">
              <p className="text-muted-foreground">
                No analyses yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}