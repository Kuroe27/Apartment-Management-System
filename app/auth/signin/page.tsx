import Forms from "./form";
import { redirect } from "next/navigation";
import { Database } from "@/types/database.type";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
export default async function SignIn() {
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

  const { data: session } = await supabase.auth.getSession();

  if (session.session?.user.role === "authenticated") {
    redirect("/dashboard");
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Forms />
      <span>{session.session?.user?.email}</span>
    </div>
  );
}
