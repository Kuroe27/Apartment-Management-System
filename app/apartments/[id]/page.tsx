import { createClient } from "@/utils/supabase/client";

type Props = {
  params: {
    id: string;
  };
};
export default async function ApartmentProfile({ params }: Props) {
  const supabase = createClient();
  let { data: apartment, error } = await supabase
    .from("apartment")
    .select("*")
    .eq("id", params.id);

  if (!apartment) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>{apartment[0].apartment_name}</h2>
      <p>{apartment[0].apartment_description}</p>
    </>
  );
}
