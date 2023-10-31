import { fetchApartment } from "@/lib/supabase-server";

export default async function Dashboard() {
  const apartments = await fetchApartment();

  return <></>;
}
