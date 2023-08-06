import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { FaTrashAlt } from "react-icons/fa";
import { register } from "ts-node";

export const DeletNoteConfirmation = ({
  onDelete,
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onDelete: () => void;
  onClose: () => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {" "}
          {t(`delete-confirmation-question`, { title: "" })}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}></ModalBody>
        <ModalFooter>
          <Button
            leftIcon={<FaTrashAlt />}
            variant={"delete"}
            onClick={onDelete}
          >
            {t(`delete-confirm-yes`)}
          </Button>
          <Button variant={"outlined"} onClick={onClose}>
            {t(`delete-confirm-no`)}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
