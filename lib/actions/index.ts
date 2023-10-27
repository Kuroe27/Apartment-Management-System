"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Database } from "@/types/database.type";

export async function signInWithEmail(formData: FormData) {
  const supabase = await createServerActionClient<Database>({ cookies });

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  revalidatePath("/signin");

  return { data, error };
}
