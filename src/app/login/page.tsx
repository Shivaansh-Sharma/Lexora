import { loginAction } from "@/actions/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back
          </h1>

          <p className="text-sm text-muted-foreground">
            Login to Lexora
          </p>
        </div>

        <form action={loginAction} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-lg border bg-background px-4 py-3 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-lg border bg-background px-4 py-3 outline-none"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-foreground py-3 text-background transition-opacity hover:opacity-90"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}