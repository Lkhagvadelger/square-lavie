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
    <Box as="main" bg={"white"} w={"full"} h="100vh" overflowY={"hidden"}>
      <AppHeader titleText={"TheLavie"} />
      <Box mx={"auto"}>{children}</Box>
      <LoginModal />
    </Box>
  );
};
