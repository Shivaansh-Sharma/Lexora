"use server";

import { signIn, signOut } from "@/lib/auth/auth";

export async function loginAction(formData: FormData) {
  await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/dashboard",
  });
}

export async function logoutAction() {
  await signOut({
    redirectTo: "/",
  });
}