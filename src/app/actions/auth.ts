"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function signIn(prevState: any, formData: FormData) {
  const usernameOrEmail = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!usernameOrEmail || !password) {
    return { error: "Please enter your username and password" };
  }

  // Format student index numbers or usernames to emails in the background
  let email = usernameOrEmail;
  if (!usernameOrEmail.includes("@")) {
    email = `${usernameOrEmail.toLowerCase()}@susilodaya.lk`;
  }

  const supabase = await createClient();
  let role: "admin" | "teacher" | "student" | null = null;
  let redirectUrl = "";

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    if (!data.user) {
      return { error: "Login failed. Please try again." };
    }

    // Fetch user role from database
    const userRecord = await db.query.users.findFirst({
      where: eq(users.id, data.user.id),
    });

    if (!userRecord) {
      return { error: "User profile not found. Please contact the administrator." };
    }

    role = userRecord.role;
    redirectUrl = `/${role}`;
  } catch (err: any) {
    return { error: err.message || "An unexpected error occurred." };
  }

  if (redirectUrl) {
    redirect(redirectUrl);
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
