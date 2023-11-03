import { fetchApartment } from "@/utils/actions";

export default async function Dashboard() {
  const apartments = await fetchApartment();

  return <></>;
}
