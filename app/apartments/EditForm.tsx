import { editAparment } from "@/lib/actions";
const EditForm = ({ apt }: any) => {
  return (
    <form action={editAparment}>
      <h1 className="text-3xl mb-5">Add Data</h1>
      <input type="text" name="apartmentId" value={apt.id} readOnly />
      <input
        type="text"
        placeholder="Apartment Name"
        name="apartmentNames"
        defaultValue={apt.apartment_name}
      />
      <input
        type="text"
        placeholder="Apartment Description"
        name="apartmentDescs"
        defaultValue={apt.apartment_description}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditForm;
