"use client";
import { Database } from "@/types/database.type";
import { createBrowserClient } from "@supabase/ssr";

export default function SignOutBtn() {
  async function SignOut() {
    const supabase = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    await supabase.auth.signOut();
  }

  return <button onClick={SignOut}>SignOut</button>;
}
