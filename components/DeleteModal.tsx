import { deleteApartment } from "@/utils/actions";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
type Props = {
  id: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const EditForm = ({ id, isOpen, onOpenChange, onDelete }: Props) => {
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
                <form>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>

                    <Button
                      onPress={() => {
                        onDelete({ id });
                        onClose();
                      }}
                    >
                      Delete
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
