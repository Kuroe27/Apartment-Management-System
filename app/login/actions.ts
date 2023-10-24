"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Database } from "../database.types";

export async function signInWithEmail(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies });
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
    return { data, error };
    // Return data or error here
  } catch (error) {
    // Return an error object here
    console.log(error);
  }
}
