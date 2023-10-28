"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Database } from "@/types/database.type";

import { CookieOptions, createServerClient } from "@supabase/ssr";
export async function signInWithEmail(formData: FormData) {
  const cookieStore = cookies();
  const supabase = await createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete({ name, ...options });
        },
      },
    }
  );

  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email as string,
    password: password as string,
  });

  revalidatePath("/dashboard");

  return { data, error };
}
