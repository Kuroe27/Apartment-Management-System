"use client";
import { DeleteButton } from "@/components/Buttons";
import { Button, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import EditForm from "./EditForm";
import { Apartment } from "@/types/database.type";
import Link from "next/link";
import DeleteModal from "@/components/DeleteModal";
import FormInput from "@/components/FormInput";
import { Table } from "@/components/Table";

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
    { key: "apartment_name", label: "Apartment Name" },
    { key: "apartment_description", label: "Description" },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={apartments}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        dynamicLink={"apartments"}
      />
      <>
        {isdelete ? (
          <DeleteModal
            id={apt.id}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        ) : (
          <EditForm apt={apt} isOpen={isOpen} onOpenChange={onOpenChange}>
            <FormInput
              type={"number"}
              placeholder={"Id"}
              name={"apartmentId"}
              defaultValue={apt.id.toString()}
            />
            <FormInput
              type={"text"}
              placeholder={"Apartment Name"}
              name={"apartmentNames"}
              defaultValue={apt.apartment_name ?? ""}
            />
            <FormInput
              type={"text"}
              placeholder={"Apartment Description"}
              name={"apartmentDescs"}
              defaultValue={apt.apartment_description ?? ""}
            />
          </EditForm>
        )}
      </>
    </>
  );
};

export default ApartmentTable;
