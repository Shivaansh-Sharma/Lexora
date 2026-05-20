"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { analyzeText } from "@/lib/api/ai";
import {
  saveAnalysis,
  getAnalysisById,
} from "@/lib/api/analysis";

import jsPDF
from "jspdf";

import { toPng }
from "html-to-image";

import {
  useSearchParams,
} from "next/navigation";

const modules = [
  {
    key: "sentiment",
    label: "Sentiment Analysis",
  },
  {
    key: "emotion",
    label: "Emotion Analysis",
  },
  {
    key: "ner",
    label: "Named Entity Recognition",
  },
  {
    key: "summarize",
    label: "Text Summarization",
  },
  {
    key: "readability",
    label: "Readability Analysis",
  },
  {
    key: "keywords",
    label: "Keyword Extraction",
  },
  {
    key: "language",
    label: "Language Detection",
  },
  {
    key: "topic",
    label: "Topic Modeling",
  },
  {
    key: "grammar",
    label: "Grammar & Writing Analysis",
  },
  {
  key: "ai-detection",
  label: "AI Writing Detection",
  },
  {
  key: "internet-plagiarism",
  label: "Internet Plagiarism Detection",
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

type EntityResult = {
  text: string;
  label: string;
};

type SummaryResult = {
  summary: string;
};

type ReadabilityResult = {
  flesch_reading_ease: number;
  flesch_kincaid_grade: number;
  gunning_fog: number;
  smog_index: number;
  automated_readability_index: number;
  coleman_liau_index: number;
  sentence_count: number;
  word_count: number;
  difficult_words: number;
};

type KeywordResult = {
  keyword: string;
  score: number;
};

type LanguageResult = {
  language_code: string;
  language: string;
  confidence: number;
};

type TopicItem = {
  topic: string;
  score: number;
};

type CategoryItem = {
  category: string;
  score: number;
};

type GrammarIssue = {
  type: string;
  original: string;
  suggestion: string;
};

type GrammarResult = {
  corrected_text: string;

  issues_found: number;

  grammar_issues: number;

  spelling_issues: number;

  issues: GrammarIssue[];

  average_sentence_length: number;

  word_count: number;

  writing_level: string;

  tone: string;

  passive_voice_estimate: number;

  reading_ease: number;

  grade_level: number;
};

type TopicResult = {
  main_category: string;
  category_confidence: number;
  categories: CategoryItem[];
  topics: TopicItem[];
};

type AIDetectionResult = {
  ai_writing_likelihood: number;

  human_writing_likelihood: number;

  prediction: string;

  confidence: number;

  sentence_count: number;

  word_count: number;

  average_sentence_length: number;

  reading_ease: number;

  grade_level: number;

  lexical_diversity: number;

  repetition_score: number;

  formal_word_matches: number;

  ai_pattern_matches: number;

  transition_word_matches: number;

  long_word_ratio: number;

  perplexity_indicator: string;

  analysis_breakdown: {
    structure_score: number;

    vocabulary_score: number;

    readability_score: number;

    uniformity_score: number;

    pattern_score: number;
  };

  disclaimer: string;
};

type MatchedSource = {
  url: string;

  matched_text: string;

  source_snippet: string;

  similarity_score: number;
};

type InternetPlagiarismResult = {
  internet_plagiarism_score: number;

  plagiarism_risk: string;

  matched_sources: MatchedSource[];
};

export default function AnalyzePage() {
  const [selectedModule, setSelectedModule] =
    useState("sentiment");

  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  const [plagiarismResult, setPlagiarismResult] = useState<InternetPlagiarismResult | null>(null);

  const reportRef = useRef<HTMLDivElement>(null);

  const searchParams =
  useSearchParams();

async function handleAnalyze() {

  try {

    setLoading(true);

    setPlagiarismResult(null);

    const response =
      await analyzeText(
        selectedModule,
        text
      );

    setResult(response.data);

    if (
  selectedModule ===
  "internet-plagiarism"
) {

  setPlagiarismResult(
    response.data
  );
}

    if (
      selectedModule !==
      "ai-detection"
    ) {


    await saveAnalysis({
type:
  selectedModule ===
  "internet-plagiarism"
    ? "PLAGIARISM"
    : selectedModule ===
      "summarize"
    ? "SUMMARY"
    : selectedModule ===
      "readability"
    ? "READABILITY"
    : selectedModule ===
      "keywords"
    ? "KEYWORDS"
    : selectedModule ===
      "language"
    ? "LANGUAGE"
    : selectedModule ===
      "topic"
    ? "TOPIC"
    : selectedModule ===
      "grammar"
    ? "GRAMMAR"
    : selectedModule ===
      "ai-detection"
    ? "AI_DETECTION"
    : selectedModule.toUpperCase(),

      inputText: text,

      result: {
        analysis: response.data,

        internet_plagiarism:
          plagiarismResult,
      },

      language: "English",
    });
  }
  } catch (error) {

    console.error(error);

    alert("Analysis failed");

  } finally {

    setLoading(false);
  }
}

async function handleDownloadPDF() {

  if (!reportRef.current)
    return;

  try {

    const isDark =
  document.documentElement.classList.contains(
    "dark"
  );

const dataUrl =
  await toPng(
    reportRef.current,
    {
      cacheBust: true,

      pixelRatio: 2,

      backgroundColor:
        isDark
          ? "#000000"
          : "#ffffff",
    }
  );

    const pdf =
      new jsPDF(
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
      "analysis-report.pdf"
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
    "analysis-report.json";

  link.click();

  URL.revokeObjectURL(
    url
  );
}

function handleDownloadCSV() {

  if (!result) return;

  const rows = Object.entries(
    result
  ).map(
    ([key, value]) => [
      key,
      typeof value ===
      "object"
        ? JSON.stringify(
            value
          )
        : value,
    ]
  );

  const csvContent = [
    ["Field", "Value"],
    ...rows,
  ]
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
    "analysis-report.csv";

  link.click();

  URL.revokeObjectURL(
    url
  );
}

useEffect(() => {

  async function loadAnalysis() {

    const id =
      searchParams.get(
        "id"
      );

    if (!id) return;

    try {

      const data =
        await getAnalysisById(
          id
        );

      const analysis =
        data.analysis;

      setText(
        analysis.inputText
      );

      setSelectedModule(
        analysis.type
          .toLowerCase()
          .replaceAll(
            "_",
            "-"
          )
      );

      setResult(
        analysis.result
          .analysis ||
          analysis.result
      );

    } catch (error) {

      console.error(
        error
      );
    }
  }

  loadAnalysis();

}, [searchParams]);

  return (
    <DashboardShell>
      <div className="grid gap-8 xl:grid-cols-[340px_1fr]">
        <div className="space-y-6">
          <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-[0_0_40px_rgba(124,58,237,0.08)]">
           <div>

  <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-violet-400 backdrop-blur-xl">

    AI Modules
  </div>

  <h2 className="mt-5 text-3xl font-bold tracking-tight">

    Intelligence Workspace
  </h2>

  <p className="mt-3 leading-7 text-muted-foreground">

    Choose an advanced NLP pipeline to analyze semantic structure, readability, AI patterns, and multilingual intelligence.
  </p>
</div>

            <div className="mt-6 space-y-3">
              {modules.map((module) => (
                <button
                  key={module.key}
onClick={() => {

  setSelectedModule(
    module.key
  );

  setResult(null);
}}
                  className={`group w-full rounded-2xl border border-white/10 px-5 py-4 text-left text-sm font-medium transition-all duration-200 ${
                    selectedModule === module.key
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_30px_rgba(124,58,237,0.2)]"
                    : "bg-white/5 text-muted-foreground hover:-translate-y-0.5 hover:bg-white/10 hover:text-foreground"
                  }`}
                >
                  {module.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div ref={reportRef} className="glass-card h-fit rounded-[2rem] border border-white/10 p-8 shadow-[0_0_50px_rgba(124,58,237,0.08)]">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

  <div>

    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-violet-400 backdrop-blur-xl">

      AI Analysis Engine
    </div>

    <h2 className="mt-5 text-4xl font-black tracking-tight">

      NLP Workspace
    </h2>

    <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">

      Analyze sentiment, detect AI-written content, identify entities, generate summaries, and extract semantic intelligence using transformer-based NLP systems.
    </p>
  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">

    <p className="text-sm text-muted-foreground">

      Active Module
    </p>

    <p className="mt-2 font-semibold">

      {
        modules.find(
          (m) =>
            m.key ===
            selectedModule
        )?.label
      }
    </p>
  </div>
</div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            className="mt-8 min-h-[340px] w-full rounded-[2rem] border border-white/10 bg-black/10 p-6 text-base leading-8 outline-none backdrop-blur-xl transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-8 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 font-medium text-white shadow-[0_0_30px_rgba(124,58,237,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] disabled:opacity-50"
          >
{
  loading ? (

    <div className="flex items-center gap-3">

      <div className="flex gap-1">

        <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]" />

        <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]" />

        <span className="h-2 w-2 animate-bounce rounded-full bg-white" />
      </div>

      <span>
        Processing Intelligence
      </span>
    </div>

  ) : (

    "Analyze Text"
  )
}
          </button>

          {result && (

  <div className="mt-8 flex flex-wrap items-center gap-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">

    <button
      onClick={
        handleDownloadPDF
      }
      className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/20 hover:bg-violet-500/10 hover:text-violet-300"
    >
      Export PDF
    </button>

    <button
      onClick={
        handleDownloadJSON
      }
      className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/20 hover:bg-violet-500/10 hover:text-violet-300"
    >
      Export JSON
    </button>

    <button
      onClick={
        handleDownloadCSV
      }
      className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/20 hover:bg-violet-500/10 hover:text-violet-300"
    >
      Export CSV
    </button>
  </div>
)}

          {selectedModule === "sentiment" &&
            result &&
            !Array.isArray(result) &&
            result.label && (
              <div className="mt-10 rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.06)]">
                <h3 className="text-2xl font-bold tracking-tight">
                  Sentiment Result
                </h3>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Label
                    </p>

                    <h4 className="mt-2 text-2xl font-bold">
                      {result.label}
                    </h4>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
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
              <div className="mt-10 rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.06)]">
                <h3 className="text-2xl font-bold tracking-tight">
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

          {selectedModule === "ner" &&
            Array.isArray(result) && (
              <div className="mt-10 rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.06)]">
                <h3 className="text-2xl font-bold tracking-tight">
                  Named Entities
                </h3>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {result.map((entity: EntityResult) => (
                    <div
                      key={`${entity.text}-${entity.label}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold">
                            {entity.text}
                          </p>

                          <p className="mt-2 text-sm text-muted-foreground">
                            Extracted entity
                          </p>
                        </div>

                        <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-300 backdrop-blur-xl">
                          {entity.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {selectedModule === "summarize" &&
            result &&
            !Array.isArray(result) &&
            result.summary && (
              <div className="mt-10 rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.06)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Generated Summary
                  </h3>

                  <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-300 backdrop-blur-xl">
                    AI Summary
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-muted/50 p-6">
                  <p className="leading-relaxed text-muted-foreground">
                    {result.summary}
                  </p>
                </div>
              </div>
            )}

          {selectedModule === "readability" &&
            result &&
            !Array.isArray(result) &&
            result.flesch_reading_ease !== undefined && (
              <div className="mt-10 rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.06)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Readability Analysis
                  </h3>

                  <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-300 backdrop-blur-xl">
                    Academic Metrics
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Reading Ease
                    </p>

                    <h4 className="mt-3 text-3xl font-bold">
                      {result.flesch_reading_ease}
                    </h4>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Grade Level
                    </p>

                    <h4 className="mt-3 text-3xl font-bold">
                      {result.flesch_kincaid_grade}
                    </h4>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Gunning Fog
                    </p>

                    <h4 className="mt-3 text-3xl font-bold">
                      {result.gunning_fog}
                    </h4>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Sentence Count
                    </p>

                    <h4 className="mt-3 text-3xl font-bold">
                      {result.sentence_count}
                    </h4>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Word Count
                    </p>

                    <h4 className="mt-3 text-3xl font-bold">
                      {result.word_count}
                    </h4>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Difficult Words
                    </p>

                    <h4 className="mt-3 text-3xl font-bold">
                      {result.difficult_words}
                    </h4>
                  </div>
                </div>
              </div>
            )}

          {selectedModule === "keywords" &&
            Array.isArray(result) && (
              <div className="mt-10 rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.06)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Extracted Keywords
                  </h3>

                  <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-300 backdrop-blur-xl">
                    Semantic Keywords
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {result.map((keyword: KeywordResult) => (
                    <div
                      key={keyword.keyword}
                      className="rounded-full border px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium">
                          {keyword.keyword}
                        </span>

                        <span className="text-xs text-muted-foreground">
                          {(keyword.score * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {selectedModule === "language" &&
            result &&
            !Array.isArray(result) &&
            result.language && (
              <div className="mt-10 rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.06)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Language Detection
                  </h3>

                  <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-300 backdrop-blur-xl">
                    Multilingual AI
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Detected Language
                    </p>

                    <h4 className="mt-3 text-3xl font-bold">
                      {result.language}
                    </h4>

                    <p className="mt-2 text-sm text-muted-foreground uppercase">
                      {result.language_code}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Confidence
                    </p>

                    <h4 className="mt-3 text-3xl font-bold">
                      {(result.confidence * 100).toFixed(2)}%
                    </h4>
                  </div>
                </div>
              </div>
            )}

          {selectedModule === "topic" &&
            result &&
            !Array.isArray(result) &&
            result.main_category && (
              <div className="mt-10 rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.06)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Topic Modeling
                  </h3>

                  <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-300 backdrop-blur-xl">
                    Semantic Analysis
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Main Category
                    </p>

                    <h4 className="mt-3 text-3xl font-bold">
                      {result.main_category}
                    </h4>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Confidence:{" "}
                      {(
                        result.category_confidence * 100
                      ).toFixed(2)}
                      %
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Related Categories
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {result.categories.map(
                        (category: CategoryItem) => (
                          <div
                            key={category.category}
                            className="rounded-full border px-3 py-2 text-sm"
                          >
                            {category.category}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold">
                    Extracted Topics
                  </h4>

                  <div className="mt-8 flex flex-wrap items-center gap-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
                    {result.topics.map(
                      (topic: TopicItem) => (
                        <div
                          key={topic.topic}
                          className="rounded-full border px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium">
                              {topic.topic}
                            </span>

                            <span className="text-xs text-muted-foreground">
                              {(topic.score * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

          {selectedModule === "grammar" &&
            result &&
            !Array.isArray(result) &&
            result.corrected_text && (
              <div className="mt-10 rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.06)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Grammar & Writing Analysis
                  </h3>

                  <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-300 backdrop-blur-xl">
                    AI Writing Assistant
                  </div>
                </div>

                <div className="mt-6 rounded-xl border p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Corrected Text
                  </p>

                  <p className="mt-4 leading-8">
                    {result.corrected_text}
                  </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Total Issues
                    </p>

                    <h4 className="mt-3 text-3xl font-bold">
                      {result.issues_found}
                    </h4>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Grammar Issues
                    </p>

                    <h4 className="mt-3 text-3xl font-bold">
                      {result.grammar_issues}
                    </h4>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Spelling Issues
                    </p>

                    <h4 className="mt-3 text-3xl font-bold">
                      {result.spelling_issues}
                    </h4>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Tone
                    </p>

                    <h4 className="mt-3 text-3xl font-bold">
                      {result.tone}
                    </h4>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Writing Level
                    </p>

                    <h4 className="mt-3 text-2xl font-bold">
                      {result.writing_level}
                    </h4>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Reading Ease
                    </p>

                    <h4 className="mt-3 text-2xl font-bold">
                      {result.reading_ease}
                    </h4>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Grade Level
                    </p>

                    <h4 className="mt-3 text-2xl font-bold">
                      {result.grade_level}
                    </h4>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Avg Sentence Length
                    </p>

                    <h4 className="mt-3 text-2xl font-bold">
                      {
                        result.average_sentence_length
                      }
                    </h4>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold">
                    Detected Issues
                  </h4>

                  <div className="mt-4 space-y-4">
                    {result.issues.map(
                      (
                        issue: GrammarIssue,
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                              {issue.type}
                            </span>
                          </div>

                          <div className="mt-4 grid gap-4 md:grid-cols-2">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Original
                              </p>

                              <p className="mt-2 font-medium">
                                {issue.original || "-"}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm text-muted-foreground">
                                Suggestion
                              </p>

                              <p className="mt-2 font-medium">
                                {issue.suggestion || "-"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
            {selectedModule === "ai-detection" &&
  result &&
  !Array.isArray(result) &&
  result.prediction && (
    <div className="mt-10 rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.06)]">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">
          AI Writing Detection
        </h3>

        <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-300 backdrop-blur-xl">
          Experimental Analysis
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        {result.disclaimer}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Prediction
          </p>

          <h4 className="mt-3 text-2xl font-bold">
            {result.prediction}
          </h4>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Confidence
          </p>

          <h4 className="mt-3 text-2xl font-bold">
            {result.confidence}%
          </h4>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            AI Likelihood
          </p>

          <h4 className="mt-3 text-2xl font-bold">
            {result.ai_writing_likelihood}%
          </h4>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Human Likelihood
          </p>

          <h4 className="mt-3 text-2xl font-bold">
            {result.human_writing_likelihood}%
          </h4>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Sentence Count
          </p>

          <h4 className="mt-3 text-2xl font-bold">
            {result.sentence_count}
          </h4>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Word Count
          </p>

          <h4 className="mt-3 text-2xl font-bold">
            {result.word_count}
          </h4>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Reading Ease
          </p>

          <h4 className="mt-3 text-2xl font-bold">
            {result.reading_ease}
          </h4>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Grade Level
          </p>

          <h4 className="mt-3 text-2xl font-bold">
            {result.grade_level}
          </h4>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Lexical Diversity
          </p>

          <h4 className="mt-3 text-2xl font-bold">
            {(
              result.lexical_diversity * 100
            ).toFixed(1)}
            %
          </h4>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Repetition Score
          </p>

          <h4 className="mt-3 text-2xl font-bold">
            {(
              result.repetition_score * 100
            ).toFixed(1)}
            %
          </h4>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Long Word Ratio
          </p>

          <h4 className="mt-3 text-2xl font-bold">
            {result.long_word_ratio}%
          </h4>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Perplexity Indicator
          </p>

          <h4 className="mt-3 text-lg font-bold">
            {result.perplexity_indicator}
          </h4>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-semibold">
          Linguistic Pattern Analysis
        </h4>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Structure
            </p>

            <h4 className="mt-3 text-2xl font-bold">
              {
                result.analysis_breakdown
                  .structure_score
              }
            </h4>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Vocabulary
            </p>

            <h4 className="mt-3 text-2xl font-bold">
              {
                result.analysis_breakdown
                  .vocabulary_score
              }
            </h4>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Readability
            </p>

            <h4 className="mt-3 text-2xl font-bold">
              {
                result.analysis_breakdown
                  .readability_score
              }
            </h4>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Uniformity
            </p>

            <h4 className="mt-3 text-2xl font-bold">
              {
                result.analysis_breakdown
                  .uniformity_score
              }
            </h4>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05]">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Pattern Score
            </p>

            <h4 className="mt-3 text-2xl font-bold">
              {
                result.analysis_breakdown
                  .pattern_score
              }
            </h4>
          </div>
        </div>
      </div>
    </div>
)}
{plagiarismResult && (

  <div className="mt-10 rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.06)]">

    <div className="flex items-center justify-between">

      <div>

        <h3 className="text-2xl font-semibold">
          Internet Plagiarism Detection
        </h3>

        <p className="mt-2 text-muted-foreground">
          External web similarity analysis.
        </p>
      </div>

      <div className="text-right">

        <div className="text-4xl font-bold">
          {
            plagiarismResult.internet_plagiarism_score
          }
          %
        </div>

        <div className="text-sm text-muted-foreground">
          {
            plagiarismResult.plagiarism_risk
          }{" "}
          Risk
        </div>
      </div>
    </div>

    <div className="mt-8 space-y-6">

      {plagiarismResult
        .matched_sources.length === 0 && (

        <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
          No strong internet matches found.
        </div>
      )}

      {plagiarismResult
        .matched_sources.map(
          (
            source,
            index
          ) => (

            <div
              key={index}
              className="rounded-2xl border p-6"
            >

              <div className="flex items-center justify-between gap-4">

                <div className="flex-1">

                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="line-clamp-1 text-sm font-medium text-primary underline"
                  >
                    {source.url}
                  </a>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {
                      source.source_snippet
                    }
                  </p>
                </div>

                <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  {
                    source.similarity_score
                  }
                  %
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-muted/50 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Matched Input
                </p>

                <p className="mt-2 text-sm leading-relaxed">
                  {
                    source.matched_text
                  }
                </p>
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