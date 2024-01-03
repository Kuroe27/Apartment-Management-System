import { Submit } from "@/components/Buttons";
import FormInput from "@/components/FormInput";
import Search from "@/components/Search";
import {
  addApartment,
  fetchApartment,
  getApartmentImages,
} from "@/utils/actions";
import ApartmentTable from "./ApartmentTable";
import PaginationComponent from "./PaginationComponent";

export default async function Apartment({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: number;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const { apartments = [], count = 0 } = await fetchApartment(
    query,
    currentPage
  );

  const id = 43;
  const { images, error } = await getApartmentImages();

  return (
    <div className="p-8">
      <Search placeholder="Search apartments..." />
      <form action={addApartment}>
        <h1 className="text-3xl mb-5">Add Data</h1>
        <FormInput
          type={"text"}
          placeholder={"Apartment Name"}
          name={"apartmentName"}
        />
        <FormInput
          type={"text"}
          placeholder={"Apartment Description"}
          name={"apartmentDesc"}
        />
        <input type="file" name="file" multiple />

        <Submit text={"Add"} pendingText="Adding ..." />
      </form>
      <div>
        {images?.map((image: any) => (
          <p>{image.name}</p>
        ))}
      </div>

      <h1 className="text-2xl font-bold mb-4">Apartment Listings</h1>
      <ApartmentTable apartments={apartments || []} />
      <PaginationComponent count={count || 0} currentPage={currentPage ?? 1} />
    </div>
  );
}
