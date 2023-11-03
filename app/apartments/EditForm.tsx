import { Submit } from "@/components/Buttons";
import FormInput from "@/components/FormInput";
import { editAparment } from "@/utils/actions";
const EditForm = ({ apt }: any) => {
  return (
    <form action={editAparment}>
      <h1 className="text-3xl mb-5">Add Data</h1>
      <FormInput
        type={"text"}
        placeholder={"text"}
        name={"apartmentId"}
        value={apt.id}
        readOnly={true}
      />
      <FormInput
        type={"text"}
        placeholder={"Apartment Name"}
        name={"apartmentNames"}
        defaultValue={apt.apartment_name}
      />
      <FormInput
        type={"text"}
        placeholder={"Apartment Description"}
        name={"apartmentDescs"}
        defaultValue={apt.apartment_description}
      />
      <Submit text={"Update"} pendingText="Updating" pending={false} />
    </form>
  );
};

export default EditForm;
