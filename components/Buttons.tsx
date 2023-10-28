"use client";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database.type";
import { useFormStatus } from "react-dom";
import { revalidatePath } from "next/cache";

export default async function SignOutBtn() {
  const router = useRouter();

  async function SignOut() {
    const supabase = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    await supabase.auth.signOut();
    router.push("/auth/signin");
    router.refresh();
  }

  return <button onClick={SignOut}>Sign Out</button>;
}

export function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Signing in ..." : "signin"}
    </button>
  );
}
