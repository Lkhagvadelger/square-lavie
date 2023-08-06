import { ReactNode } from "react";
import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
} from "@ui/index";

export const DataEntryModal = ({
  isOpen,
  onOpen,
  onClose,
  title,
  titleLabel,
  children,
  closeOnOverlayClick = true,
  ...props
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  title: string;
  titleLabel?: string;
  children: ReactNode | ReactNode[];
}) => {
  return (
    <Modal
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      {...props}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent
        overflowY="auto"
        maxW="70rem"
        bg={useColorModeValue("offWhite", "gray.900")}
        px="2"
        pt="3"
        mt="1"
        mb="0"
        maxH="90%"
      >
        <ModalHeader>
          <Heading color="blue.700" fontWeight="900" fontSize="lg">
            {title}
          </Heading>
          <Text mt="5" fontSize="md">
            {titleLabel}
          </Text>
        </ModalHeader>
        <ModalCloseButton mt="2" mr="1" />
        <ModalBody minW={["720px", "360px"]}>{children}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
