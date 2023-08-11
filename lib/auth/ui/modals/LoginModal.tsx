import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { LoginScreen } from "../screens";

const useLoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [redirectTo, setRedirectTo] = useState("/");

  useEffect(() => {
    router.query.login && setLogin(router.query.login as string);
    router.query.redirectTo && setRedirectTo(router.query.redirectTo as string);
  }, [router]);

  useEffect(() => {
    login && login == "true" && onOpen();
  }, [login, onOpen]);

  const onCloseLogin = () => {
    const currentQuery = { ...router.query };
    console.log(currentQuery);
    delete currentQuery.login;
    delete currentQuery.redirectTo;
    currentQuery;
    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });

    setLogin("false");
    onClose();
  };

  return {
    isOpen,
    finalRef,
    redirectTo,
    onCloseLogin,
    onClose,
  };
};

export const LoginModal = () => {
  const { isOpen, finalRef, redirectTo, onCloseLogin, onClose } =
    useLoginModal();

  return (
    <Modal isOpen={isOpen} onClose={onCloseLogin} finalFocusRef={finalRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <LoginScreen redirectTo={redirectTo} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
