import { getApartmentImages } from "@/utils/actions";
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

  if (!apartment || error) {
    return <div>Loading...</div>;
  }

  const id = parseInt(params.id, 10);
  const { images, error: imagesError } = await getApartmentImages({
    id: parseInt(params.id, 10),
  });

  if (imagesError) {
    console.error(imagesError);
  }

  return (
    <>
      <p>{params.id}</p>
      <h2>{apartment[0].apartment_name}</h2>
      <p>{apartment[0].apartment_description}</p>
      <div>
        {images?.map((image: any) => (
          <img
            key={image.id}
            src={`http://localhost:54321/storage/v1/object/public/room/${image.name}`}
            alt=""
          />
        ))}
      </div>
    </>
  );
}
