"use client";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database.type";
import { useFormStatus } from "react-dom";

export default function SignOutBtn() {
  const router = useRouter();

  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/signin");
    router.refresh();
  };

  return <button onClick={handleSignOut}>SignOut</button>;
}

export function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Signing in ..." : "signin"}
    </button>
  );
}
