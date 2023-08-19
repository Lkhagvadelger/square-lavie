import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@ui/index";
import { useState } from "react";
import { useLocalStorage } from "../data/hooks";

export const AdditionalService = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [total, setTotal] = useState({ totalPrice: 0, totalItems: 0 });

  const [selectedVariantIds, setSelectedVariantIds] = useState<any[]>([]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={700}>
        <ModalHeader color={"blue.700"} fontWeight={700}>
          Invite a user to MH
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight={600}>
            This form will create new user with Selected role
          </Text>
          <Box my={7}></Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
