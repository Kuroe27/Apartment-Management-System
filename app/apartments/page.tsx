import { Database } from "@/types/database.type";
import { createBrowserClient } from "@supabase/ssr";
export default async function apartment() {
  const supabase = await createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  let { data: apartments, error } = await supabase
    .from("apartment")
    .select("*");
  return (
    <>
      {apartments?.map((apartment) => (
        <div className="text-black" key={apartment.id}>
          <h2>{apartment.apartment_name}</h2>
          <p>{apartment.apartment_description}</p>
        </div>
      ))}
    </>
  );
}
