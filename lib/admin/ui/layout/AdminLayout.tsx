import { ReactNode } from "react";
import { useAuth } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import NotFoundPage from "pages/404";
import RootLayout from "@lib/core/components/layout";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return user?.role !== UserRole.ADMIN ? (
    <NotFoundPage />
  ) : (
    <RootLayout>{children}</RootLayout>
  );
};
