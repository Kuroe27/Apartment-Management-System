import { editAparment } from "@/lib/actions";
import { useEffect, useState } from "react";
const EditForm = ({ apt }: any) => {
  const [apts, setApt] = useState({
    id: apt.id,
    apartment_name: apt.apartment_name,
    apartment_description: apt.apartment_description,
  });

  useEffect(() => {
    setApt(apt);
  }, [apt]);
  return (
    <form action={editAparment}>
      <h1 className="text-3xl mb-5">Add Data</h1>
      <input type="text" name="apartmentId" value={apts.id} readOnly />
      <input
        type="text"
        placeholder="Apartment Name"
        name="apartmentNames"
        value={apts.apartment_name}
        onChange={(e) => setApt({ ...apts, apartment_name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Apartment Description"
        name="apartmentDescs"
        value={apts.apartment_description}
        onChange={(e) =>
          setApt({ ...apts, apartment_description: e.target.value })
        }
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditForm;
