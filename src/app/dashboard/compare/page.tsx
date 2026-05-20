"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import jsPDF from "jspdf";

import { toPng } from "html-to-image";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
 Bar,
  XAxis,
  YAxis,
} from "recharts";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";

import {
  saveComparison,
  getComparisons,
  deleteComparison,
  getComparisonById,
} from "@/lib/comparison";

import {
  useSearchParams,
} from "next/navigation";

import { toast }
from "sonner";

const API_URL =
  "http://127.0.0.1:8000/compare/";

type MatchingSentence = {
  keyword: string;

  text1_match: string;

  text2_match: string;
};

type CompareResult = {
  similarity_score: number;

  tone_difference: string;

  keyword_overlap: string[];

  keyword_overlap_score: number;

  plagiarism_risk: string;

  matching_sentences?: MatchingSentence[];

  text1_sentiment: {
    label: string;
    score: number;
  };

  text2_sentiment: {
    label: string;
    score: number;
  };
};

type ComparisonHistoryItem = {
  id: string;

  text1: string;

  text2: string;

  result: CompareResult;

  createdAt: string;
};

export default function ComparePage() {

  const reportRef =
    useRef<HTMLDivElement>(null);

  const searchParams =
    useSearchParams();

  const [text1, setText1] =
    useState("");

  const [text2, setText2] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<CompareResult | null>(
      null
    );

  const [
  comparisonHistory,
  setComparisonHistory,
] = useState<
  ComparisonHistoryItem[]
>([]);

  const similarityData = result
    ? [
        {
          name: "Similarity",
          value: result.similarity_score,
        },
        {
          name: "Difference",
          value:
            100 -
            result.similarity_score,
        },
      ]
    : [];

  const sentimentData = result
    ? [
        {
          name: "Text 1",
          score:
            result.text1_sentiment.score *
            100,
        },
        {
          name: "Text 2",
          score:
            result.text2_sentiment.score *
            100,
        },
      ]
    : [];

  const plagiarismColor =
    result?.plagiarism_risk === "High"
      ? "text-red-500"
      : result?.plagiarism_risk ===
        "Moderate"
      ? "text-yellow-500"
      : "text-green-500";

  const similarityColor =
    result &&
    result.similarity_score > 80
      ? "bg-gradient-to-r from-red-500 to-orange-500"
      : result &&
        result.similarity_score > 60
      ? "bg-gradient-to-r from-yellow-500 to-amber-500"
      : "bg-gradient-to-r from-emerald-500 to-green-500";

  async function handleCompare() {
      const toastId = toast.loading("Comparing texts...");
    try {

      setLoading(true);

      const response = await fetch(
        API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            text1,
            text2,
          }),
        }
      );

      const data =
        await response.json();

      setResult(data.data);

      await saveComparison({
  text1,
  text2,
  result: data.data,
});

await loadHistory();

toast.success(
  "Comparison completed",
  {
    id: toastId,
  }
);

    } catch (error) {

      console.error(error);

      toast.error(
  "Comparison failed",
  {
    id: toastId,
  }
);

    } finally {

      setLoading(false);
    }
  }

  async function handleDownloadPDF() {

    if (!reportRef.current) return;

    try {

      const dataUrl =
        await toPng(
          reportRef.current,
          {
            cacheBust: true,
            pixelRatio: 2,
            backgroundColor:
              "#ffffff",
          }
        );

      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );

      const imgProps =
        pdf.getImageProperties(
          dataUrl
        );

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const pdfHeight =
        (imgProps.height *
          pdfWidth) /
        imgProps.width;

      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      pdf.save(
        "comparison-report.pdf"
      );

    } catch (error) {

      console.error(
        "PDF Export Error:",
        error
      );
    }
  }

  function handleDownloadJSON() {

  if (!result) return;

  const dataStr =
    JSON.stringify(
      result,
      null,
      2
    );

  const blob =
    new Blob(
      [dataStr],
      {
        type:
          "application/json",
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href = url;

  link.download =
    "comparison-report.json";

  link.click();

  URL.revokeObjectURL(
    url
  );
}

function handleDownloadCSV() {

  if (!result) return;

  const rows = [

    [
      "Metric",
      "Value",
    ],

    [
      "Similarity Score",
      result.similarity_score,
    ],

    [
      "Tone Difference",
      result.tone_difference,
    ],

    [
      "Keyword Overlap Score",
      result.keyword_overlap_score,
    ],

    [
      "Plagiarism Risk",
      result.plagiarism_risk,
    ],

    [
      "Text 1 Sentiment",
      result.text1_sentiment.label,
    ],

    [
      "Text 2 Sentiment",
      result.text2_sentiment.label,
    ],
  ];

  const csvContent =
    rows
      .map((row) =>
        row.join(",")
      )
      .join("\n");

  const blob =
    new Blob(
      [csvContent],
      {
        type:
          "text/csv",
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href = url;

  link.download =
    "comparison-report.csv";

  link.click();

  URL.revokeObjectURL(
    url
  );
}

  async function loadHistory() {

  try {

    const data =
      await getComparisons();

    setComparisonHistory(
      data.comparisons
    );

  } catch (error) {

    console.error(error);
  }
}

useEffect(() => {

  loadHistory();

  async function loadComparison() {

    const id =
      searchParams.get(
        "id"
      );

    if (!id) return;

    try {

      const data =
        await getComparisonById(
          id
        );

      const comparison =
        data.comparison;

      setText1(
        comparison.text1
      );

      setText2(
        comparison.text2
      );

      setResult(
        comparison.result
      );

    } catch (error) {

      console.error(
        error
      );
    }
  }

  loadComparison();

}, [searchParams]);

  return (
    <DashboardShell>
      <div className="space-y-8">

<div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-600/15 via-background to-indigo-600/10 p-10 shadow-[0_0_60px_rgba(124,58,237,0.12)]">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.15),transparent_35%)]" />

  <div className="relative z-10">

    <div className="inline-flex items-center rounded-full border border-violet-200/40 bg-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-violet-300 backdrop-blur-xl">

      Semantic Intelligence Engine
    </div>

    <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight">

      Compare documents with
      <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
        {" "}
        AI-powered{" "}
      </span>

      semantic intelligence.
    </h1>

    <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">

      Detect similarity patterns, plagiarism risk, contextual overlap, tone differences, and semantic relationships using advanced NLP comparison pipelines.
    </p>
  </div>
</div>

        <div className="grid gap-8 xl:grid-cols-2">

          <div className="glass-card rounded-[2rem] border border-white/10 p-7 shadow-[0_0_40px_rgba(124,58,237,0.08)]">
            <h2 className="text-2xl font-bold tracking-tight">
              Text 1
            </h2>

            <textarea
              value={text1}
              onChange={(e) =>
                setText1(e.target.value)
              }
              placeholder="Paste first document..."
              className="mt-8 min-h-[340px] w-full rounded-[2rem] border border-black/5 bg-white/70 p-6 text-base leading-8 shadow-sm backdrop-blur-xl outline-none transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-black/10"
            />
          </div>

          <div className="glass-card rounded-[2rem] border border-white/10 p-7 shadow-[0_0_40px_rgba(124,58,237,0.08)]">
            <h2 className="text-2xl font-bold tracking-tight">
              Text 2
            </h2>

            <textarea
              value={text2}
              onChange={(e) =>
                setText2(e.target.value)
              }
              placeholder="Paste second document..."
              className="mt-8 min-h-[340px] w-full rounded-[2rem] border border-black/5 bg-white/70 p-6 text-base leading-8 shadow-sm backdrop-blur-xl outline-none transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-black/10"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">

          <button
            onClick={handleCompare}
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 font-medium text-white shadow-[0_0_30px_rgba(124,58,237,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] disabled:opacity-50"
          >
            {loading
              ? "Comparing..."
              : "Compare Documents"}
          </button>

          {result && (
  <>
    <button
      onClick={handleDownloadPDF}
      className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/20 hover:bg-violet-500/10 hover:text-violet-300"
    >
      Download PDF Report
    </button>

    <button
      onClick={handleDownloadJSON}
      className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/20 hover:bg-violet-500/10 hover:text-violet-300"
    >
      Download JSON
    </button>
    <button
  onClick={
    handleDownloadCSV
  }
  className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/20 hover:bg-violet-500/10 hover:text-violet-300"
>
  Download CSV
</button>
  </>
)}
        </div>

        {!result && !loading && (
          <div className="rounded-2xl border border-dashed p-16 text-center">

            <h2 className="text-2xl font-semibold">
              Ready to Compare
            </h2>

            <p className="mt-3 text-muted-foreground">
              Paste two documents and run
              semantic comparison analysis.
            </p>
          </div>
        )}

        {loading && (
          <div className="rounded-2xl border p-12 text-center">

            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />

            <h2 className="mt-6 text-2xl font-semibold">
              Comparing Documents
            </h2>

            <p className="mt-2 text-muted-foreground">
              Running semantic analysis...
            </p>
          </div>
        )}

        {result && (

          <div
            ref={reportRef}
            className="space-y-8 rounded-[2rem] border border-white/10 bg-card/70 p-8 text-foreground backdrop-blur-xl shadow-[0_0_50px_rgba(124,58,237,0.08)]"
          >

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              <div className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]">

                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Similarity Score
                </p>

                <h3 className="mt-5 text-5xl font-black tracking-tight">
                  {result.similarity_score}%
                </h3>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">

                  <div
                    className={`h-full rounded-full transition-all duration-700 ${similarityColor}`}
                    style={{
                      width: `${result.similarity_score}%`,
                    }}
                  />
                </div>
              </div>

              <div className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]">

                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tone Difference
                </p>

                <h3 className="mt-3 text-2xl font-bold">
                  {
                    result.tone_difference
                  }
                </h3>
              </div>

              <div className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]">

                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Keyword Overlap
                </p>

                <h3 className="mt-5 text-5xl font-black tracking-tight">
                  {
                    result
                      .keyword_overlap_score
                  }
                  %
                </h3>
              </div>

              <div className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]">

                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Plagiarism Risk
                </p>

                <h3
                  className={`mt-3 text-2xl font-bold ${plagiarismColor}`}
                >
                  {result.plagiarism_risk}
                </h3>
              </div>
            </div>

            <div className="rounded-2xl border p-6">

              <h2 className="text-xl font-semibold">
                Shared Keywords
              </h2>

              <div className="mt-6 flex flex-wrap gap-3">

                {result.keyword_overlap.map(
                  (keyword) => (
                    <div
                      key={keyword}
                      className="rounded-full border bg-indigo-100 px-4 py-3 text-sm font-medium text-indigo-600"
                    >
                      {keyword}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.06)]">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-3xl font-black tracking-tight">
                    Semantic Match Highlights
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Shared contextual matches detected
                    across both documents.
                  </p>
                </div>

                <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-violet-300 backdrop-blur-xl">
                  {
                    result.matching_sentences?.length || 0
                  }{" "}
                  Matches
                </div>
              </div>

              <div className="mt-8 space-y-6">

                {(!result.matching_sentences ||
                  result.matching_sentences.length === 0) && (

                  <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] p-10 text-center text-muted-foreground backdrop-blur-xl">
                    No strong semantic overlap snippets found.
                  </div>
                )}

                {(result.matching_sentences || []).map(
                  (match, index) => (

                    <div
                      key={`${match.keyword}-${index}`}
                      className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/20 hover:bg-white/[0.05]"
                    >

                      <div className="flex items-center gap-3">

                        <div className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(124,58,237,0.25)]">
                          {match.keyword}
                        </div>

                        <div className="text-sm text-gray-500">
                          Semantic overlap detected
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 lg:grid-cols-2">

                        <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/10 p-6 backdrop-blur-xl">

                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Text 1 Match
                          </p>

                          <p className="mt-4 leading-relaxed">
                            {match.text1_match}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/10 p-6 backdrop-blur-xl">

                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Text 2 Match
                          </p>

                          <p className="mt-4 leading-relaxed">
                            {match.text2_match}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">

              <div className="rounded-2xl border p-6">

                <h2 className="text-xl font-semibold">
                  Similarity Distribution
                </h2>

                <div className="mt-8 flex h-[380px] items-center justify-center">

                  <PieChart
                    width={400}
                    height={320}
                  >

                    <Pie
  data={similarityData}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={120}
  innerRadius={70}
  isAnimationActive={false}
label={({ percent }) =>
  `${Math.round(
    (percent || 0) * 100
  )}%`
}
labelStyle={{
  fill: "#e4e4e7",
  fontSize: 18,
  fontWeight: 600,
}}
fill="#e4e4e7"
  labelLine={false}
>

                      <Cell fill="#8b5cf6" />

                      <Cell fill="#a1a1aa" />

                    </Pie>

                    <Tooltip />

                  </PieChart>
                </div>
              </div>

              <div className="rounded-2xl border p-6">

                <h2 className="text-xl font-semibold">
                  Sentiment Comparison
                </h2>

                <div className="mt-6 w-full overflow-hidden">

                  <ResponsiveContainer
                    width="100%"
                    height={320}
                  >

                    <BarChart
                      data={sentimentData}
                    >

                      <XAxis dataKey="name" />

                      <YAxis />

                      <Tooltip />

                      <Bar
                        dataKey="score"
                        fill="#6366f1"
                        radius={[8, 8, 0, 0]}
                        isAnimationActive={false}
                      />

                    </BarChart>

                  </ResponsiveContainer>
                </div>
              </div>
            </div>
{comparisonHistory.length > 0 && (

  <div className="space-y-8">

    <div className="flex items-center justify-between">

      <div>

        <h2 className="text-4xl font-black tracking-tight">
          Comparison History
        </h2>

        <p className="text-muted-foreground">
          Previously saved comparison reports
        </p>
      </div>
    </div>

    <div className="grid gap-4">

      {comparisonHistory.map(
        (item) => (

          <div
            key={item.id}
            className="rounded-[2rem] border border-white/10 bg-card/70 p-7 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.08)]"
          >

            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

              <div className="space-y-4 flex-1">

                <div className="flex items-center gap-3 flex-wrap">

                  <div className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(124,58,237,0.25)]">

                    {
                      item.result
                        .similarity_score
                    }
                    % Similar
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs font-semibold uppercase tracking-wider backdrop-blur-xl">

                    {
                      item.result
                        .plagiarism_risk
                    }{" "}
                    Risk
                  </div>

                  <div className="text-sm text-muted-foreground">

                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">

                  <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/10 p-5 backdrop-blur-xl">

                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Text 1
                    </p>

                    <p className="mt-3 line-clamp-4 text-sm leading-relaxed">

                      {item.text1}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/10 p-5 backdrop-blur-xl">

                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Text 2
                    </p>

                    <p className="mt-3 line-clamp-4 text-sm leading-relaxed">

                      {item.text2}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => {

                    setText1(
                      item.text1
                    );

                    setText2(
                      item.text2
                    );

                    setResult(
                      item.result
                    );
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-2 text-sm font-medium backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/20 hover:bg-violet-500/10 hover:text-violet-300"
                >
                  Open
                </button>

                <button
                  onClick={async () => {

                    try {

                      await deleteComparison(
                        item.id
                      );

                      await loadHistory();

                    } catch (error) {

                      console.error(
                        error
                      );
                    }
                  }}
                  className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-2 text-sm font-medium text-red-400 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  </div>
)}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}