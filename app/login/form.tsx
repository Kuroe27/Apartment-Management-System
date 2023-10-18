import {
  createClientComponentClient,
  createServerActionClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Database } from "../database.types";
import { error } from "console";
// import { createClient } from "@supabase/supabase-js";
// import { redirect } from "next/dist/server/api-utils";

export default async function () {
  async function signInWithEmail(formData: FormData) {
    "use server";
    const supabase = createServerActionClient<Database>({ cookies });

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
    console.log({ data, error });
    revalidatePath("/");
  }

  // async function signInWithGoogle() {
  //   "use server";

  //   const supabase = createClient(
  //     "https://mkkhvdqfcshfzvzulyms.supabase.co",
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ra2h2ZHFmY3NoZnp2enVseW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0OTY0ODEsImV4cCI6MjAxMjA3MjQ4MX0.hxzl6PIgOYmi5-L57f6o20Zq1sk33-wbzldidEUeGYU"
  //   );
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo:
  //         "https://mkkhvdqfcshfzvzulyms.supabase.co/auth/v1/authorize?provider=google",
  //     },
  //   });
  //   console.log({ data });
  // }
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signInWithEmail}
      >
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">signIn</button>
        {/* <button formAction={signInWithGoogle}>Sign in with google</button> */}
      </form>
    </div>
  );
}
