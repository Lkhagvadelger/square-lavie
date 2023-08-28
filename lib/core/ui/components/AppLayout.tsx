import useTranslation from "next-translate/useTranslation";
import { ReactNode } from "react";
import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";
import { Box } from "@chakra-ui/react";
import { LoginModal } from "@lib/auth/ui/modals/LoginModal";

export const AppLayout = ({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) => {
  const { t: to } = useTranslation("common");

  return (
    <Box
      as="main"
      bg={"red"}
      w={"full"}
      h="100vh"
      overflowY={"hidden"}
      display="flex"
      flexDirection="column"
    >
      {/* <AppHeader /> */}
      <Box mx={"auto"} w="full" h="full" flex="1">
        {children}
      </Box>
      <LoginModal />
    </Box>
  );
};
