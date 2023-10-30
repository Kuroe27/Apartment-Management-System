import { Database } from "@/types/database.type";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import SignOutBtn from "./Buttons";
import Link from "next/link";
export default async function Navbar() {
  const cookieStore = cookies();
  const supabase = await createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  const { data: user } = await supabase.auth.getUser();
  return (
    <nav className="flex justify-between h-16 w-full px-5 items-center">
      <p>Logo</p>
      {user.user ? (
        <ul>
          <li>
            <SignOutBtn />
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/apartments">Apartment</Link>
          </li>
        </ul>
      ) : (
        <></>
      )}
    </nav>
  );
}
