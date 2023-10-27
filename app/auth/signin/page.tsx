import Forms from "./form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function SignIn() {
  const supabase = await createServerComponentClient({ cookies });

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
