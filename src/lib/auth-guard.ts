import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function checkRole(allowedRole: "admin" | "teacher" | "student") {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userProfile = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  });

  if (!userProfile) {
    redirect("/login");
  }

  if (userProfile.role !== allowedRole) {
    redirect(`/${userProfile.role}`);
  }

  return userProfile;
}
