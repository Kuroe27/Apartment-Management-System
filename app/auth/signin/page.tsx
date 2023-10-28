import Forms from "./form";
import { redirect } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default async function SignIn() {
  const supabase = await createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: session } = await supabase.auth.getSession();

  if (session.session?.user.role == "authenticated") {
    redirect("/dashboard");
  }
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Forms />
      <span>{session.session?.user?.email}</span>
    </div>
  );
}
