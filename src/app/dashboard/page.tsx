import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { auth } from "@/lib/auth/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">
            Welcome back
          </h2>

          <p className="mt-2 text-muted-foreground">
            Logged in as {session?.user?.email}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border p-6">
            <p className="text-sm text-muted-foreground">
              Analyses
            </p>

            <h3 className="mt-4 text-3xl font-bold">
              0
            </h3>
          </div>

          <div className="rounded-2xl border p-6">
            <p className="text-sm text-muted-foreground">
              NLP Modules
            </p>

            <h3 className="mt-4 text-3xl font-bold">
              10+
            </h3>
          </div>

          <div className="rounded-2xl border p-6">
            <p className="text-sm text-muted-foreground">
              Languages
            </p>

            <h3 className="mt-4 text-3xl font-bold">
              5
            </h3>
          </div>

          <div className="rounded-2xl border p-6">
            <p className="text-sm text-muted-foreground">
              AI Engine
            </p>

            <h3 className="mt-4 text-3xl font-bold">
              Active
            </h3>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}