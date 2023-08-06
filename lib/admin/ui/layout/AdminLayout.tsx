import { ReactNode } from "react";
import { useAuth } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import { AppLayout, Flex } from "@ui/index";
import { AdminSidebar } from "./AdminSidebar";
import NotFoundPage from "pages/404";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return user?.role !== UserRole.ADMIN ? (
    <NotFoundPage />
  ) : (
    <AppLayout>
      <Flex
        h="full"
        mt={4}
        flexDirection="column"
        borderTop="1px"
        borderColor="gray.200"
      >
        <Flex flex="1" fontSize="sm">
          <AdminSidebar />
          <Flex p="4" width="full" direction="column" overflowY="auto">
            {children}
          </Flex>
        </Flex>
      </Flex>
    </AppLayout>
  );
};
