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

  let { data: apartments, error } = await supabase
    .from("apartment")
    .select("*");

  console.log(apartments);

  const { data: session } = await supabase.auth.getSession();
  console.log(session.session?.user.role);
  return (
    <>
      <span>{session.session?.user.role}</span>
      {apartments?.map((apartment) => (
        <div className="text-black" key={apartment.id}>
          <h2>{apartment.apartment_name}</h2>
          <p>{apartment.apartment_description}</p>
        </div>
      ))}
    </>
  );
}
