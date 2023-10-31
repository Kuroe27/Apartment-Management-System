import { addApartment } from "@/lib/actions";
import { fetchApartment } from "@/lib/supabase-server";
import ApartmentTable from "./ApartmentTable";
export default async function Apartment() {
  const apartments = await fetchApartment();

  return (
    <div className="p-8">
      {/* Edit apartments */}

      {/* Add apartments */}
      <form action={addApartment}>
        <h1 className="text-3xl mb-5">Add Data</h1>
        <input type="text" placeholder="Apartment Name" name="apartmentName" />
        <input
          type="text"
          placeholder="Apartment Descripiton"
          name="apartmentDesc"
        />
        <button type="submit">Add</button>
      </form>
      <h1 className="text-2xl font-bold mb-4">Apartment Listings</h1>

      {/* Apartments Table */}
      <ApartmentTable apartments={apartments} />
    </div>
  );
}
