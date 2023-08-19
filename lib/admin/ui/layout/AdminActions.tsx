import { useAuth } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import {
  Box,
  Text,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@ui/index";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

export const AdminActions = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ButtonGroup size="sm" variant="outline" w="full" p="4">
      <Button
        iconSpacing="1"
        leftIcon={<FaUserPlus fontSize="1.25em" />}
        onClick={() => setIsOpen(true)}
      >
        Invite a user
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent maxW={700} bg={useColorModeValue("white", "gray.900")}>
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
    </ButtonGroup>
  );
};
