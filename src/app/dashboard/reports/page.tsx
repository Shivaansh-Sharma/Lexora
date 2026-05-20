"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  deleteAnalysis,
  deleteComparisonReport,
  getReports,
} from "@/lib/reports";

import { DashboardShell }
from "@/components/dashboard/dashboard-shell";

import { useRouter }
from "next/navigation";

import { toast }
from "sonner";

import {
  Skeleton,
} from "@/components/ui/skeleton";

type Report = {

  id: string;

  category: string;

  type: string;

  createdAt: string;

  preview: string;

  data: any;
};

const FILTERS = [

  "ALL",

  "SENTIMENT",

  "EMOTION",

  "NER",

  "SUMMARY",

  "KEYWORDS",

  "TOPIC",

  "READABILITY",

  "GRAMMAR",

  "AI_DETECTION",

  "PLAGIARISM",

  "COMPARISON",
];

export default function ReportsPage() {

  const [
    reports,
    setReports,
  ] = useState<
    Report[]
  >([]);

  const router =
  useRouter();

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    activeFilter,
    setActiveFilter,
  ] = useState("ALL");

  async function loadReports() {

    try {

      const data =
        await getReports();

      setReports(
        data.reports
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    loadReports();

  }, []);

  const filteredReports =
    useMemo(() => {

      return reports.filter(
        (report) => {

          const matchesFilter =

            activeFilter ===
            "ALL"

              ? true

              : report.type ===
                activeFilter;

          const matchesSearch =

            report.preview
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            JSON.stringify(
              report.data
            )
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          return (
            matchesFilter &&
            matchesSearch
          );
        }
      );
    }, [
      reports,
      search,
      activeFilter,
    ]);

  return (

  <DashboardShell>

    <div className="space-y-10">

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-600/15 via-background to-indigo-600/10 p-10 shadow-[0_0_60px_rgba(124,58,237,0.12)]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.15),transparent_35%)]" />

        <div className="relative z-10">

          <div className="inline-flex items-center rounded-full border border-violet-200/40 bg-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-violet-300 backdrop-blur-xl">

            Unified Intelligence Reports
          </div>

          <h1 className="mt-6 text-5xl font-black tracking-tight">

            Reports Center
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">

            Unified semantic analysis, AI detection, multilingual NLP insights, and comparison intelligence across your entire workflow.
          </p>
        </div>
      </div>

      <div className="space-y-6 rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.06)]">

        <input
          type="text"
          placeholder="Search reports, semantic insights, AI detections..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full rounded-2xl border border-white/10 bg-black/10 px-5 py-4 text-base outline-none backdrop-blur-xl transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
        />

        <div className="flex flex-wrap gap-3">

          {FILTERS.map(
            (filter) => (

              <button
                key={filter}
                onClick={() =>
                  setActiveFilter(
                    filter
                  )
                }
                className={`rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeFilter ===
                  filter

                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_25px_rgba(124,58,237,0.25)]"

                    : "border border-white/10 bg-white/[0.03] text-muted-foreground backdrop-blur-xl hover:border-violet-500/20 hover:bg-violet-500/10 hover:text-violet-300"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>
      </div>

{loading && (

  <div className="grid gap-6">

    {Array.from({
      length: 5,
    }).map((_, i) => (

      <div
        key={i}
        className="rounded-[2rem] border border-white/10 bg-card/70 p-7 backdrop-blur-xl"
      >

        <div className="space-y-5">

          <div className="flex gap-3">

            <Skeleton className="h-8 w-28 rounded-full" />

            <Skeleton className="h-8 w-24 rounded-full" />
          </div>

          <Skeleton className="h-5 w-full rounded-xl" />

          <Skeleton className="h-5 w-4/5 rounded-xl" />

          <Skeleton className="h-5 w-2/3 rounded-xl" />

          <div className="flex gap-3 pt-4">

            <Skeleton className="h-11 w-24 rounded-2xl" />

            <Skeleton className="h-11 w-24 rounded-2xl" />
          </div>
        </div>
      </div>
    ))}
  </div>
)}

      {!loading &&
        filteredReports.length ===
          0 && (

          <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] p-20 text-center backdrop-blur-xl">

            <h2 className="text-3xl font-black tracking-tight">

              No Reports Found
            </h2>

            <p className="mt-4 text-muted-foreground">

              Try adjusting your filters or semantic search query.
            </p>
          </div>
        )}

      <div className="grid gap-6">

        {filteredReports.map(
          (report) => (

            <div
              key={report.id}
              className="group rounded-[2rem] border border-white/10 bg-card/70 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.08)]"
            >

              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                <div className="flex-1 space-y-5">

                  <div className="flex flex-wrap items-center gap-3">

                    <div className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(124,58,237,0.25)]">

                      {report.type}
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs font-semibold uppercase tracking-wider backdrop-blur-xl">

                      {report.category}
                    </div>

                    <div className="text-sm text-muted-foreground">

                      {new Date(
                        report.createdAt
                      ).toLocaleString()}
                    </div>
                  </div>

                  <p className="max-w-4xl leading-8 text-muted-foreground">

                    {report.preview}
                  </p>
                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => {

  toast.loading(
    "Opening report..."
  );

                      if (
                        report.category ===
                        "comparison"
                      ) {

                        router.push(
                          `/dashboard/compare?id=${report.id}`
                        );

                      } else {

                        router.push(
                          `/dashboard/analyze?id=${report.id}`
                        );
                      }
                    }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/20 hover:bg-violet-500/10 hover:text-violet-300"
                  >
                    Open
                  </button>

                  <button
                    onClick={async () => {

                      try {

                        if (
                          report.category ===
                          "analysis"
                        ) {

                          await deleteAnalysis(
                            report.id
                          );

                        } else {

                          await deleteComparisonReport(
                            report.id
                          );
                        }

                        await loadReports();

                        toast.success(
  "Report deleted successfully"
);

                      } catch (error) {

  console.error(
    error
  );

  toast.error(
    "Failed to delete report"
  );
}
                    }}
                    className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-400 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-500/20"
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
  </DashboardShell>
);
}