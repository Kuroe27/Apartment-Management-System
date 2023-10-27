import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function Dashboard() {
  const supabase = await createServerComponentClient({ cookies });
  const { data: session } = await supabase.auth.getSession();
  console.log(session.session?.user.role);
  return (
    <>
      <p>asd</p>
      <span>{session.session?.user.email}</span>
    </>
  );
}
