"use client";

import Link from "next/link";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { signIn }
from "next-auth/react";

import { toast }
from "sonner";

export default function LoginPage() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const result =
        await signIn(
          "credentials",
          {
            email,
            password,
            redirect: false,
          }
        );

      if (
        result?.error
      ) {

        toast.error(
          "Invalid email or password"
        );

        return;
      }

      toast.success(
        "Login successful"
      );

      router.push(
        "/dashboard"
      );

      router.refresh();

    } catch {

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <main className="relative flex min-h-screen overflow-hidden bg-background text-foreground">

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-3xl" />

        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-3xl" />

        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="hidden flex-1 border-r border-white/10 lg:flex">

        <div className="flex w-full flex-col justify-between p-14">

          <div>

            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium backdrop-blur-xl">

              <Sparkles className="h-4 w-4 text-violet-400" />

              AI-powered NLP Intelligence
            </div>

            <h1 className="mt-10 max-w-2xl text-6xl font-black tracking-tight">

              Semantic intelligence for modern AI workflows.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-9 text-muted-foreground">

              Analyze sentiment, detect AI-generated content, compare semantic similarity, and unlock multilingual NLP insights with Lexora Intelligence Suite.
            </p>
          </div>

          <div className="grid gap-5">

            <div className="rounded-[2rem] border border-white/10 bg-card/70 p-6 backdrop-blur-xl">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400">

                  <ShieldCheck className="h-6 w-6" />
                </div>

                <div>

                  <h3 className="text-lg font-bold">

                    Enterprise-grade AI analysis
                  </h3>

                  <p className="mt-2 leading-7 text-muted-foreground">

                    Advanced transformer-powered intelligence pipelines with semantic analysis and multilingual understanding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-16">

        <div className="w-full max-w-md">

          <div className="rounded-[2.5rem] border border-white/10 bg-card/70 p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(124,58,237,0.12)]">

            <div className="mb-10 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-violet-600 to-indigo-600 shadow-[0_0_40px_rgba(124,58,237,0.3)]">

                <Sparkles className="h-7 w-7 text-white" />
              </div>

              <h1 className="mt-8 text-4xl font-black tracking-tight">

                Welcome back
              </h1>

              <p className="mt-3 text-muted-foreground">

                Login to continue your AI intelligence workflow.
              </p>
            </div>

            <form
              onSubmit={
                handleLogin
              }
              className="space-y-5"
            >

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-black/5 bg-white/70 px-5 py-4 text-base outline-none backdrop-blur-xl transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-black/10"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-black/5 bg-white/70 px-5 py-4 text-base outline-none backdrop-blur-xl transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-black/10"
              />

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-base font-medium text-white shadow-[0_0_40px_rgba(124,58,237,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(124,58,237,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading
                  ? "Signing in..."
                  : "Login"}

                {!loading && (

                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">

              Don&apos;t have an account?{" "}

              <Link
                href="/signup"
                className="font-medium text-violet-400 transition-colors hover:text-violet-300"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}