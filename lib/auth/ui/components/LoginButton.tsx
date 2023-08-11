import { Button, useDisclosure } from "@chakra-ui/react";
import router from "next/router";

export const LoginButton = ({ redirectTo = "/" }: { redirectTo?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Button
      onClick={() => {
        const currentQuery = { ...router.query };
        currentQuery.login = "true";
        currentQuery.redirectTo = redirectTo;

        router.push({
          pathname: router.pathname,
          query: currentQuery,
        });
      }}
    >
      Login
    </Button>
  );
};
