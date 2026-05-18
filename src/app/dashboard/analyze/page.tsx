import { DashboardShell } from "@/components/dashboard/dashboard-shell";

const modules = [
  "Sentiment Analysis",
  "Emotion Analysis",
  "NER",
  "Summarization",
  "Keywords",
  "Readability",
  "Topic Modeling",
  "AI Detection",
];

export default function AnalyzePage() {
  return (
    <DashboardShell>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">
              Analysis Modules
            </h2>

            <div className="mt-6 space-y-3">
              {modules.map((module) => (
                <button
                  key={module}
                  className="w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors hover:bg-muted"
                >
                  {module}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-2xl font-semibold">
            NLP Workspace
          </h2>

          <p className="mt-2 text-muted-foreground">
            Enter text for advanced AI-powered linguistic analysis.
          </p>

          <textarea
            placeholder="Paste your text here..."
            className="mt-6 min-h-[300px] w-full rounded-xl border bg-background p-4 outline-none"
          />

          <button className="mt-6 rounded-xl bg-primary px-6 py-3 text-primary-foreground transition-opacity hover:opacity-90">
            Analyze Text
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}