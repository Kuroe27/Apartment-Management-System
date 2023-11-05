import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Apartment } from "@/types/database.type";
import { editAparment } from "@/utils/actions";
import FormInput from "@/components/FormInput";
import { Submit } from "@/components/Buttons";
type Props = {
  apt: Apartment;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const EditForm = ({ apt, isOpen, onOpenChange }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <form action={editAparment}>
                  <h1 className="text-3xl mb-5">Add Data</h1>
                  <FormInput
                    type={"number"}
                    placeholder={"Id"}
                    name={"apartmentId"}
                    defaultValue={apt.id.toString()}
                    readOnly={true}
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
                  <Submit text={"Update"} pendingText="Updating ..." />

                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit" onPress={onClose}>
                      Save
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditForm;
