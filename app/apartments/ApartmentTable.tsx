"use client";
import { DeleteButton } from "@/components/Buttons";
import { Button, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import EditForm from "./EditForm";
import { Apartment } from "@/types/database.type";
import Link from "next/link";
import DeleteModal from "@/components/DeleteModal";

type ApartmentTableProps = {
  apartments: Apartment[];
};

const ApartmentTable = ({ apartments }: ApartmentTableProps) => {
  const [isdelete, setIsdelete] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [apt, setApt] = useState<Apartment>({
    id: 0,
    apartment_name: "",
    apartment_description: "",
  });

  const handleEdit = (apartment: Apartment) => {
    onOpen();
    setApt(apartment);
    setIsdelete(false);
  };
  const handleDelete = (apartment: Apartment) => {
    onOpen();
    setApt(apartment);
    setIsdelete(true);
  };
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
                <div className="text-sm ">{apartment.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm ">{apartment.apartment_name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm ">
                {apartment.apartment_description}
              </td>
              <td>
                <>
                  <Button onPress={() => handleDelete(apartment)}>
                    Delete
                  </Button>
                  <Button onPress={() => handleEdit(apartment)}>Edit</Button>
                  <Link href={`/apartments/${apartment.id}`}>View</Link>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <>
        {isdelete ? (
          <DeleteModal
            id={apt.id}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        ) : (
          <EditForm apt={apt} isOpen={isOpen} onOpenChange={onOpenChange} />
        )}
      </>
    </>
  );
};

export default ApartmentTable;
