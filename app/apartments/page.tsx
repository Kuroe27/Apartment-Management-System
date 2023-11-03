import { addApartment, fetchApartment } from "@/utils/actions";
import ApartmentTable from "./ApartmentTable";
import FormInput from "@/components/FormInput";
import { Submit } from "@/components/Buttons";
export default async function Apartment() {
  const apartments = await fetchApartment();

  return (
    <div className="p-8">
      {/* Edit apartments */}

      {/* Add apartments */}
      <form action={addApartment}>
        <h1 className="text-3xl mb-5">Add Data</h1>
        <FormInput
          type={"text"}
          placeholder={"Apartment Name"}
          name={"apartmentName"}
        />

        <FormInput
          type={"text"}
          placeholder={"Apartment Descripiton"}
          name={"apartmentDesc"}
        />

        <Submit pending={false} text={"Add"} pendingText="Adding ..." />
      </form>
      <h1 className="text-2xl font-bold mb-4">Apartment Listings</h1>

      {/* Apartments Table */}
      <ApartmentTable apartments={apartments} />
    </div>
  );
}
