import { Submit } from "@/components/Buttons";
import FormInput from "@/components/FormInput";
import { addApartment } from "@/utils/actions";
const AddApartment = () => {
  return (
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
      <Submit text={"Add"} pendingText="Adding ..." />
    </form>
  );
};

export default AddApartment;
