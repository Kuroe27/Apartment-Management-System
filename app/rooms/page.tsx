import { Table } from "@/components/Table";
import {
  addRoom,
  fetchApartment,
  getApartment,
  getRooms,
} from "@/utils/actions";
import RoomTable from "./RoomTable";
import FormInput from "@/components/FormInput";
import { Submit } from "@/components/Buttons";
import Dropdown from "@/components/Dropdown";

export default async function Rooms() {
  const { data = [] } = await getRooms();
  const { apartments = [] } = await getApartment();

  const columns = [
    {
      Header: "ID",
    },
    {
      Header: "rent",
    },
    {
      Header: "actions",
    },
  ];
  const status = [
    { label: "Available", value: "Available" },
    { label: "Occupied", value: "Occupied" },
  ];
  return (
    <>
      <p>Rooms</p>
      <form action={addRoom}>
        <h1 className="text-3xl mb-5">Add Data</h1>
        <FormInput type={"number"} placeholder={"Room Rent"} name={"rent"} />
        <Dropdown
          items={status}
          name={"status"}
          value={"value"}
          label={"label"}
        />
        <Dropdown items={apartments} name={"aptId"} value={"id"} label={"id"} />

        <Submit text={"Add"} pendingText="Adding ..." />
      </form>

      <RoomTable apartments={data} />
    </>
  );
}
