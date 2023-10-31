import { createSupabaseServerClient } from "@/lib/supabase-server";
import Link from "next/link";
import SignOutBtn from "./Buttons";
export default async function Navbar() {
  const supabase = await createSupabaseServerClient();
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
