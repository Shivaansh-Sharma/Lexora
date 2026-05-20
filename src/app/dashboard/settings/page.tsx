"use client";

import { useState } from "react";

import { signOut } from "next-auth/react";

import {
  Lock,
  User2,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { toast }
from "sonner";

import { DashboardShell }
from "@/components/dashboard/dashboard-shell";

export default function SettingsPage() {

  const [name, setName] =
    useState("");

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

async function handleNameUpdate(
  e: React.FormEvent
) {

  e.preventDefault();

  try {

    const response =
      await fetch(
        "/api/settings/profile",
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      toast.error(
        data.error
      );

      return;
    }

    toast.success(
      "Profile updated"
    );

  } catch {

    toast.error(
      "Something went wrong"
    );
  }
}

  async function handlePasswordUpdate(
  e: React.FormEvent
) {

  e.preventDefault();

  try {

    const response =
      await fetch(
        "/api/settings/password",
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      toast.error(
        data.error
      );

      return;
    }

    toast.success(
      "Password updated"
    );

    setCurrentPassword(
      ""
    );

    setNewPassword(
      ""
    );

  } catch {

    toast.error(
      "Something went wrong"
    );
  }
}

  return (

    <DashboardShell>

      <div className="space-y-10">

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-600/15 via-background to-indigo-600/10 p-10 shadow-[0_0_60px_rgba(124,58,237,0.12)]">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.15),transparent_35%)]" />

          <div className="relative z-10">

            <div className="inline-flex items-center rounded-full border border-violet-200/40 bg-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-violet-300 backdrop-blur-xl">

              Account & Security
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight">

              Settings
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">

              Manage your Lexora account preferences, profile settings, and security controls.
            </p>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-2">

          <div className="rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.06)]">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400">

                <User2 className="h-7 w-7" />
              </div>

              <div>

                <h2 className="text-2xl font-bold">

                  Profile
                </h2>

                <p className="text-muted-foreground">

                  Update your account identity
                </p>
              </div>
            </div>

            <form
              onSubmit={
                handleNameUpdate
              }
              className="mt-8 space-y-5"
            >

              <div className="space-y-2">

                <label className="text-sm font-medium">

                  Display Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  placeholder="Enter your name"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-black/10 px-5 outline-none backdrop-blur-xl transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                />
              </div>

              <button
                type="submit"
                className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-[0_0_30px_rgba(124,58,237,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(124,58,237,0.35)]"
              >

                Save Changes
              </button>
            </form>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(124,58,237,0.06)]">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">

                <Lock className="h-7 w-7" />
              </div>

              <div>

                <h2 className="text-2xl font-bold">

                  Security
                </h2>

                <p className="text-muted-foreground">

                  Change your password securely
                </p>
              </div>
            </div>

            <form
              onSubmit={
                handlePasswordUpdate
              }
              className="mt-8 space-y-5"
            >

              <div className="space-y-2">

                <label className="text-sm font-medium">

                  Current Password
                </label>

                <input
                  type="password"
                  value={
                    currentPassword
                  }
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                  placeholder="Current password"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-black/10 px-5 outline-none backdrop-blur-xl transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                />
              </div>

              <div className="space-y-2">

                <label className="text-sm font-medium">

                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  placeholder="New password"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-black/10 px-5 outline-none backdrop-blur-xl transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                />
              </div>

              <button
                type="submit"
                className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-medium text-white shadow-[0_0_30px_rgba(99,102,241,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(99,102,241,0.35)]"
              >

                Update Password
              </button>
            </form>
          </div>
        </div>

        <div className="rounded-[2rem] border border-red-500/10 bg-gradient-to-br from-red-500/10 to-red-500/5 p-8 shadow-[0_0_40px_rgba(239,68,68,0.08)]">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 text-red-400">

                <ShieldCheck className="h-7 w-7" />
              </div>

              <div>

                <h2 className="text-2xl font-bold">

                  Session Management
                </h2>

                <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">

                  Securely sign out from your current Lexora session across this device.
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-4 font-medium text-red-400 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500/20"
            >

              <LogOut className="h-5 w-5" />

              Logout
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}