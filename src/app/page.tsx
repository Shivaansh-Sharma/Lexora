"use client";
import { Navbar } from "@/components/layout/navbar";

import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Brain,
  Languages,
  Bot,
  ScanSearch,
} from "lucide-react";

import {
  FloatingOrb,
} from "@/components/ui/floating-orb";

import {
  MotionCard,
} from "@/components/ui/motion-card";

import {
  StaggerContainer,
} from "@/components/ui/stagger-container";

import {
  StaggerItem,
} from "@/components/ui/stagger-item";

import {
  MotionButton,
} from "@/components/ui/motion-button";

export default function HomePage() {

  return (

    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">

      <div className="absolute inset-0 -z-10 overflow-hidden">

        <FloatingOrb
          className="absolute left-[-10%] top-[-10%] h-[550px] w-[550px] rounded-full bg-violet-600/20 blur-3xl"
        />

        <FloatingOrb
          className="absolute bottom-[-10%] right-[-10%] h-[550px] w-[550px] rounded-full bg-indigo-600/20 blur-3xl"
        />

        <FloatingOrb
          className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl"
        />
      </div>

      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-20">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          <StaggerContainer>

            <StaggerItem>

              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium backdrop-blur-xl">

                <Sparkles className="h-4 w-4 text-violet-400" />

                Enterprise Multilingual NLP Intelligence
              </div>
            </StaggerItem>

            <StaggerItem>

              <h1 className="mt-10 max-w-5xl text-6xl font-black tracking-tight sm:text-7xl xl:text-8xl">

                AI-powered
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                  {" "}
                  semantic intelligence{" "}
                </span>

                for modern text workflows.
              </h1>
            </StaggerItem>

            <StaggerItem>

              <p className="mt-10 max-w-2xl text-xl leading-9 text-muted-foreground">

                Lexora transforms raw text into intelligent insights using transformer-powered NLP systems, multilingual understanding, AI detection, semantic comparison, plagiarism intelligence, and contextual analytics.
              </p>
            </StaggerItem>

            <StaggerItem>

              <div className="mt-12 flex flex-wrap gap-5">

                <MotionButton
                  onClick={() => {
                    window.location.href =
                      "/login";
                  }}
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,0.25)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(124,58,237,0.35)]"
                >

                  Get Started

                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </MotionButton>

                <MotionButton
                  onClick={() => {
                    window.location.href =
                      "/features";
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-base font-medium backdrop-blur-xl transition-all duration-300 hover:border-violet-500/20 hover:bg-violet-500/10"
                >

                  Explore Features
                </MotionButton>
              </div>
            </StaggerItem>

            <StaggerItem>

              <div className="mt-16 flex flex-wrap gap-12">

                <div>

                  <h3 className="text-4xl font-black">
                    10+
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    AI NLP Modules
                  </p>
                </div>

                <div>

                  <h3 className="text-4xl font-black">
                    Enterprise
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    AI Intelligence
                  </p>
                </div>

                <div>

                  <h3 className="text-4xl font-black">
                    Multi
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Language Support
                  </p>
                </div>
              </div>
            </StaggerItem>

          </StaggerContainer>

          <StaggerContainer>

            <StaggerItem>

              <div className="relative">

                <FloatingOrb
                  className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl"
                />

                <FloatingOrb
                  className="absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"
                />

                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-card/70 p-8 backdrop-blur-2xl shadow-[0_0_60px_rgba(124,58,237,0.12)]">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-muted-foreground">
                        Intelligence Workspace
                      </p>

                      <h2 className="mt-2 text-3xl font-black tracking-tight">

                        Semantic Analysis
                      </h2>
                    </div>

                    <div className="rounded-2xl bg-green-500/15 px-4 py-2 text-sm font-medium text-green-400">

                      Active
                    </div>
                  </div>

                  <div className="mt-10 space-y-5">

                    <MotionCard
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/20 hover:bg-violet-500/[0.08]"
                    >

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">

                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400">

                            <Brain className="h-6 w-6" />
                          </div>

                          <div>

                            <h3 className="font-semibold">
                              Sentiment Intelligence
                            </h3>

                            <p className="text-sm text-muted-foreground">
                              Transformer-powered semantic analysis
                            </p>
                          </div>
                        </div>

                        <div className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">

                          NLP
                        </div>
                      </div>
                    </MotionCard>

                    <MotionCard
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/20 hover:bg-indigo-500/[0.08]"
                    >

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">

                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">

                            <Bot className="h-6 w-6" />
                          </div>

                          <div>

                            <h3 className="font-semibold">
                              AI Detection
                            </h3>

                            <p className="text-sm text-muted-foreground">
                              Contextual probability engine
                            </p>
                          </div>
                        </div>

                        <div className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">

                          Live
                        </div>
                      </div>
                    </MotionCard>

                    <MotionCard
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-500/20 hover:bg-fuchsia-500/[0.08]"
                    >

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">

                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-400">

                            <ScanSearch className="h-6 w-6" />
                          </div>

                          <div>

                            <h3 className="font-semibold">
                              Semantic Comparison
                            </h3>

                            <p className="text-sm text-muted-foreground">
                              Contextual overlap analysis
                            </p>
                          </div>
                        </div>

                        <div className="rounded-full bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-300">

                          Ready
                        </div>
                      </div>
                    </MotionCard>
                  </div>

                  <div className="mt-10 grid gap-4 sm:grid-cols-3">

                    <MotionCard
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/20"
                    >

                      <p className="text-sm text-muted-foreground">
                        NLP Modules
                      </p>

                      <h3 className="mt-3 text-3xl font-black">
                        10+
                      </h3>
                    </MotionCard>

                    <MotionCard
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/20"
                    >

                      <p className="text-sm text-muted-foreground">
                        AI Detection
                      </p>

                      <h3 className="mt-3 text-3xl font-black">
                        Active
                      </h3>
                    </MotionCard>

                    <MotionCard
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-500/20"
                    >

                      <p className="text-sm text-muted-foreground">
                        Semantic Engine
                      </p>

                      <h3 className="mt-3 text-3xl font-black">
                        Online
                      </h3>
                    </MotionCard>
                  </div>
                </div>
              </div>
            </StaggerItem>

          </StaggerContainer>
        </div>

        <StaggerContainer
          className="mt-32 grid gap-8 lg:grid-cols-3"
        >

          <StaggerItem>

            <MotionCard
              className="group rounded-[2rem] border border-white/10 bg-card/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400">

                <Brain className="h-7 w-7" />
              </div>

              <h3 className="mt-10 text-2xl font-bold tracking-tight">

                AI Intelligence
              </h3>

              <p className="mt-5 leading-8 text-muted-foreground">

                Advanced transformer-powered semantic analysis with contextual understanding and intelligent NLP processing.
              </p>
            </MotionCard>
          </StaggerItem>

          <StaggerItem>

            <MotionCard
              className="group rounded-[2rem] border border-white/10 bg-card/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">

                <Languages className="h-7 w-7" />
              </div>

              <h3 className="mt-10 text-2xl font-bold tracking-tight">

                Multilingual NLP
              </h3>

              <p className="mt-5 leading-8 text-muted-foreground">

                Analyze multilingual text with semantic understanding, contextual insights, and enterprise NLP intelligence.
              </p>
            </MotionCard>
          </StaggerItem>

          <StaggerItem>

            <MotionCard
              className="group rounded-[2rem] border border-white/10 bg-card/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-400">

                <ShieldCheck className="h-7 w-7" />
              </div>

              <h3 className="mt-10 text-2xl font-bold tracking-tight">

                AI Detection
              </h3>

              <p className="mt-5 leading-8 text-muted-foreground">

                Detect AI-generated content, plagiarism, semantic duplication, and contextual overlap with precision.
              </p>
            </MotionCard>
          </StaggerItem>
        </StaggerContainer>

        <StaggerContainer className="mt-32">

          <StaggerItem>

            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-violet-600/15 via-background to-indigo-600/10 p-12 shadow-[0_0_60px_rgba(124,58,237,0.12)]">

              <div className="max-w-4xl">

                <div className="inline-flex items-center rounded-full border border-violet-200/40 bg-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-violet-300 backdrop-blur-xl">

                  Premium AI Workspace
                </div>

                <h2 className="mt-8 text-5xl font-black tracking-tight">

                  Build intelligent semantic workflows with Lexora.
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-9 text-muted-foreground">

                  Unlock enterprise-grade NLP intelligence, semantic AI analysis, multilingual understanding, and premium reporting workflows in one platform.
                </p>

                <div className="mt-10 flex flex-wrap gap-5">

                  <MotionButton
                    onClick={() => {
                      window.location.href =
                        "/signup";
                    }}
                    className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,0.25)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(124,58,237,0.35)]"
                  >

                    Get Started

                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </MotionButton>

                  <MotionButton
                    onClick={() => {
                      window.location.href =
                        "/features";
                    }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-base font-medium backdrop-blur-xl transition-all duration-300 hover:border-violet-500/20 hover:bg-violet-500/10"
                  >

                    Explore Features
                  </MotionButton>
                </div>
              </div>
            </div>

          </StaggerItem>

        </StaggerContainer>
      </section>
    </main>
  );
} 