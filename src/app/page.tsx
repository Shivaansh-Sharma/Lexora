import { Navbar } from "@/components/layout/navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-6">
        <div className="space-y-6 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Advanced Multilingual NLP Intelligence
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Lexora
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            AI-powered text intelligence platform for sentiment analysis,
            multilingual NLP, summarization, entity recognition, and advanced
            linguistic analytics.
          </p>
        </div>
      </section>
    </main>
  );
}