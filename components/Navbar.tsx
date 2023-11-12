import Link from "next/link";
import SignOutBtn from "./Buttons";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex justify-between h-16 w-full px-5 items-center">
      <p>Logo</p>
      {user ? (
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
