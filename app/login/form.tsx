import {
  createClientComponentClient,
  createMiddlewareClient,
  createServerActionClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Database } from "../database.types";
import { createClient } from "@supabase/supabase-js";

export default async function () {
  async function signInWithEmail(formData: FormData) {
    "use server";
    const supabase = createServerActionClient<Database>({ cookies });

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
    revalidatePath("/");
  }

  async function signInWithGoogle() {
    "use server";
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log(data, error);
  }
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signInWithEmail}
      >
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">signIn</button>
        <button formAction={signInWithGoogle}>Sign in with google</button>
      </form>
    </div>
  );
}
