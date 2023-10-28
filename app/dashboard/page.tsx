import { Database } from "@/types/database.type";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
export default async function Dashboard() {
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
  return (
    <>
      <span>{session.session?.user.role}</span>
    </>
  );
}
