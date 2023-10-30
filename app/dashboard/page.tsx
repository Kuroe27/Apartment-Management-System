export const revalidate = 10;
import { Database } from "@/types/database.type";
import { createBrowserClient } from "@supabase/ssr";
export default async function Dashboard() {
  const supabase = await createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: apartments, error } = await supabase
    .from("apartment")
    .select("*");

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
