import { createClient } from "@/utils/supabase/client";

type Props = {
  params: {
    id: string;
  };
};

export default async function RoomsProfile({ params }: Props) {
  const supabase = createClient();
  let { data: apartment, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", params.id);

  if (!apartment || error) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <p>{params.id}</p>
      <h2>{apartment[0].rent}</h2>
      <p>{apartment[0].status}</p>
    </>
  );
}
