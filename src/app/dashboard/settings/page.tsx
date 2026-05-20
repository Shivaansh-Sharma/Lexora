"use client";

import { useState } from "react";

import { signOut } from "next-auth/react";

import {
  Lock,
  User2,
  LogOut,
  ShieldCheck,
} from "lucide-react";

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

    alert(
      "Name update logic goes here"
    );
  }

  async function handlePasswordUpdate(
    e: React.FormEvent
  ) {

    e.preventDefault();

    alert(
      "Password update logic goes here"
    );
  }

  return (

    <div className="space-y-10">

      <div>

        <h1 className="text-4xl font-black tracking-tight">

          Settings
        </h1>

        <p className="mt-3 text-lg text-muted-foreground">

          Manage your Lexora account preferences and security.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">

        <div className="rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl">

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
            onSubmit={handleNameUpdate}
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
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 outline-none backdrop-blur-xl transition-all focus:border-violet-500/40"
              />
            </div>

            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-[0_0_30px_rgba(124,58,237,0.25)] transition-all duration-300 hover:-translate-y-0.5"
            >

              Save Changes
            </button>
          </form>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-card/70 p-8 backdrop-blur-xl">

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
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 outline-none backdrop-blur-xl transition-all focus:border-violet-500/40"
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
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 outline-none backdrop-blur-xl transition-all focus:border-violet-500/40"
              />
            </div>

            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-medium text-white shadow-[0_0_30px_rgba(99,102,241,0.25)] transition-all duration-300 hover:-translate-y-0.5"
            >

              Update Password
            </button>
          </form>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-red-500/10 to-red-500/5 p-8">

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
            className="inline-flex items-center justify-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-4 font-medium text-red-400 transition-all duration-300 hover:bg-red-500/15"
          >

            <LogOut className="h-5 w-5" />

            Logout
          </button>
        </div>
      </div>
    </div>
  );
}