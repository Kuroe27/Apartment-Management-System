"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../database.types";
import { revalidatePath } from "next/cache";

export async function signInWithEmail(formData: FormData) {
  const supabase = await createServerActionClient<Database>({ cookies });

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  revalidatePath("/login");
  return { data, error };
}
