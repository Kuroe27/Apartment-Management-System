import { addApartment } from "@/lib/actions";
import { Database } from "@/types/database.type";
import { createBrowserClient } from "@supabase/ssr";

import { DeleteButton } from "@/components/Buttons";
export default async function Apartment() {
  const supabase = await createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: apartments, error } = await supabase
    .from("apartment")
    .select("*");

  return (
    <div className="p-8">
      <form action={addApartment}>
        <input type="text" placeholder="Apartment Name" name="apartmentName" />
        <input
          type="text"
          placeholder="Apartment Descripiton"
          name="apartmentDesc"
        />
        <button type="submit">Add</button>
      </form>
      <h1 className="text-2xl font-bold mb-4">Apartment Listings</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Apartment Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {apartments?.map((apartment) => (
            <tr key={apartment.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {apartment.apartment_name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {apartment.apartment_description}
              </td>
              <td>
                <>
                  <DeleteButton id={apartment.id} />
                  <button>Update</button>
                  <button>View</button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
