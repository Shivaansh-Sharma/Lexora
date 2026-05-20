import Link from "next/link";

import {
  ArrowRight,
  Brain,
  Sparkles,
  ShieldCheck,
  Languages,
  FileSearch,
  ScanText,
  FileText,
  Tags,
  BarChart3,
  CheckCircle2,
  Bot,
} from "lucide-react";

import { Navbar }
from "@/components/layout/navbar";

const features = [

  {
    title: "Sentiment Analysis",
    description:
      "Detect positive, negative, and neutral sentiment using transformer-powered NLP pipelines.",
    icon: Brain,
  },

  {
    title: "Emotion Detection",
    description:
      "Identify emotional tone including joy, anger, sadness, fear, and contextual emotional states.",
    icon: Sparkles,
  },

  {
    title: "Named Entity Recognition",
    description:
      "Extract people, locations, organizations, dates, and structured semantic entities.",
    icon: FileSearch,
  },

  {
    title: "AI Content Detection",
    description:
      "Detect AI-generated content with advanced linguistic intelligence and semantic analysis.",
    icon: Bot,
  },

  {
    title: "Plagiarism Intelligence",
    description:
      "Analyze semantic overlap, contextual duplication, and plagiarism probability.",
    icon: ShieldCheck,
  },

  {
    title: "Semantic Comparison",
    description:
      "Compare documents with AI-powered similarity analysis and contextual intelligence.",
    icon: ScanText,
  },

  {
    title: "Text Summarization",
    description:
      "Generate concise semantic summaries from long-form documents and reports.",
    icon: FileText,
  },

  {
    title: "Keyword Extraction",
    description:
      "Extract meaningful keywords and semantic concepts from multilingual text.",
    icon: Tags,
  },

  {
    title: "Topic Classification",
    description:
      "Automatically classify text into contextual categories and semantic domains.",
    icon: BarChart3,
  },

  {
    title: "Grammar Intelligence",
    description:
      "Analyze grammar quality, sentence structure, and linguistic consistency.",
    icon: CheckCircle2,
  },

  {
    title: "Readability Analysis",
    description:
      "Measure readability, complexity, and comprehension quality using NLP metrics.",
    icon: Brain,
  },

  {
    title: "Multilingual NLP",
    description:
      "Process and analyze multilingual content with contextual understanding.",
    icon: Languages,
  },
];

export default function FeaturesPage() {

  return (

    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-3xl" />

        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-3xl" />

        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-20">

        <div className="text-center">

          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium backdrop-blur-xl">

            <Sparkles className="h-4 w-4 text-violet-400" />

            Enterprise AI Intelligence Suite
          </div>

          <h1 className="mx-auto mt-10 max-w-5xl text-6xl font-black tracking-tight sm:text-7xl">

            Advanced NLP capabilities for
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              {" "}
              intelligent workflows
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-muted-foreground">

            Lexora combines transformer-powered semantic intelligence, multilingual NLP, AI detection, and contextual analysis into one premium AI platform.
          </p>
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map(
            (feature) => {

              const Icon =
                feature.icon;

              return (

                <div
                  key={feature.title}
                  className="group rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/15 to-indigo-600/15 text-violet-400">

                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold tracking-tight">

                    {feature.title}
                  </h3>

                  <p className="mt-5 leading-8 text-muted-foreground">

                    {feature.description}
                  </p>
                </div>
              );
            }
          )}
        </div>

        <div className="mt-28 overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-violet-600/15 via-background to-indigo-600/10 p-12 shadow-[0_0_60px_rgba(124,58,237,0.12)]">

          <div className="max-w-4xl">

            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-300 backdrop-blur-xl">

              Premium AI Workspace
            </div>

            <h2 className="mt-8 text-5xl font-black tracking-tight">

              Build intelligent semantic workflows with Lexora.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-9 text-muted-foreground">

              Unlock enterprise-grade AI intelligence, multilingual NLP analysis, semantic comparison, AI detection, and advanced reporting in one premium platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                href="/signup"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-base font-medium text-white shadow-[0_0_40px_rgba(124,58,237,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(124,58,237,0.35)]"
              >

                Get Started

                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/login"
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-base font-medium backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:bg-violet-500/10"
              >

                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}