"use client";
import { DeleteButton } from "@/components/Buttons";
import { Button, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { Apartment } from "@/types/database.type";
import Link from "next/link";
import DeleteModal from "@/components/DeleteModal";
import FormInput from "@/components/FormInput";
import { Table } from "@/components/Table";
import EditForm from "../apartments/EditForm";
import { editRoom } from "@/utils/actions";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

type ApartmentTableProps = {
  apartments: Apartment[];
};
const status = [
  { label: "Available", value: "Available" },
  { label: "Occupied", value: "Occupied" },
];

const ApartmentTable = ({ apartments }: ApartmentTableProps) => {
  const [isdelete, setIsdelete] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [apt, setApt] = useState<Apartment>({
    id: 0,
    rent: "",
    apartment_description: "",
  });

  const handleEdit = (apartment: Apartment) => {
    onOpen();
    ``;
    setApt(apartment);
    setIsdelete(false);
  };
  const handleDelete = (apartment: Apartment) => {
    onOpen();
    setIsdelete(true);
    setApt(apartment);
  };

  const columns = [
    { key: "id", label: "Apartment ID" },
    { key: "rent", label: "Rent" },
    { key: "status", label: "Status" },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={apartments}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      <>
        {isdelete ? (
          <DeleteModal
            id={apt.id}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        ) : (
          <EditForm
            apt={apt}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            action={editRoom}
          >
            <FormInput
              type={"number"}
              placeholder={"Id"}
              name={"roomId"}
              defaultValue={apt.id.toString()}
            />
            <FormInput
              type={"text"}
              placeholder={"Apartment Name"}
              name={"roomRent"}
              defaultValue={apt.rent ?? ""}
            />

            <Autocomplete
              label="Select a status"
              name="status"
              className="max-w-xs"
              defaultSelectedKey={apt.status}
            >
              {status.map((status) => (
                <AutocompleteItem key={status.value} value={status.value}>
                  {status.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </EditForm>
        )}
      </>
    </>
  );
};

export default ApartmentTable;
