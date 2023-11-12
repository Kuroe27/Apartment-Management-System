import { redirect } from "next/navigation";
import Forms from "./form";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
export default async function SignIn() {
  const supabase = await createSupabaseServerClient(cookies());

  const { data: session } = await supabase.auth.getSession();

  if (session.session?.user.role === "authenticated") {
    redirect("/dashboard");
  }
  const { data: user } = await supabase.auth.getUser();

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      {user.user?.email ? "" : "Please Sign In"}
      <Forms />
      <span>{session.session?.user?.email}</span>
    </div>
  );
}
