"use client";

import { useState } from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { analyzeText } from "@/lib/api/ai";
import { saveAnalysis } from "@/lib/api/analysis";

const modules = [
  {
    key: "sentiment",
    label: "Sentiment Analysis",
  },
  {
    key: "emotion",
    label: "Emotion Analysis",
  },
];

type SentimentResult = {
  label: string;
  score: number;
};

type EmotionResult = {
  label: string;
  score: number;
};

export default function AnalyzePage() {
  const [selectedModule, setSelectedModule] =
    useState("sentiment");

  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  async function handleAnalyze() {
    try {
      setLoading(true);

      const response = await analyzeText(
        selectedModule,
        text
      );

      setResult(response.data);

      await saveAnalysis({
        type: selectedModule.toUpperCase(),
        inputText: text,
        result: response.data,
        language: "English",
      });
    } catch (error) {
      console.error(error);

      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  }

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
                  key={module.key}
                  onClick={() =>
                    setSelectedModule(module.key)
                  }
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    selectedModule === module.key
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {module.label}
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
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            className="mt-6 min-h-[300px] w-full rounded-xl border bg-background p-4 outline-none"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-6 rounded-xl bg-primary px-6 py-3 text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Text"}
          </button>

          {selectedModule === "sentiment" &&
            result &&
            !Array.isArray(result) && (
              <div className="mt-8 rounded-2xl border p-6">
                <h3 className="text-xl font-semibold">
                  Sentiment Result
                </h3>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">
                      Label
                    </p>

                    <h4 className="mt-2 text-2xl font-bold">
                      {result.label}
                    </h4>
                  </div>

                  <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">
                      Confidence
                    </p>

                    <h4 className="mt-2 text-2xl font-bold">
                      {(result.score * 100).toFixed(2)}%
                    </h4>
                  </div>
                </div>
              </div>
            )}

          {selectedModule === "emotion" &&
            Array.isArray(result) && (
              <div className="mt-8 rounded-2xl border p-6">
                <h3 className="text-xl font-semibold">
                  Emotion Analysis
                </h3>

                <div className="mt-6 space-y-4">
                  {result.map(
                    (emotion: EmotionResult) => (
                      <div
                        key={emotion.label}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium capitalize">
                            {emotion.label}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            {(
                              emotion.score * 100
                            ).toFixed(2)}
                            %
                          </p>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{
                              width: `${
                                emotion.score * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
    </DashboardShell>
  );
}