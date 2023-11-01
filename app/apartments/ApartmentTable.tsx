"use client";
import { DeleteButton } from "@/components/Buttons";
import { useState } from "react";
import EditForm from "./EditForm";
const ApartmentTable = ({ apartments }: any) => {
  const [apt, setApt] = useState({
    id: "",
    apartment_name: "",
    apartment_description: "",
  });
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Apartment ID
            </th>
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
          {apartments?.map((apartment: any) => (
            <tr key={apartment.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{apartment.id}</div>
              </td>
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
                  <button onClick={() => setApt(apartment)}>Edit</button>
                  <button>View</button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditForm apt={apt} />
    </>
  );
};

export default ApartmentTable;
