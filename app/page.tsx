import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);
console.log(supabaseUrl, supabaseKey);
export default async function Home() {
  const { data: tenants } = await supabase.from("Tenants").select();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <ul className=" ">
        {tenants?.map((tenant) => (
          <li key={tenant.id}>{tenant.id}</li>
        ))}
      </ul>
    </main>
  );
}
