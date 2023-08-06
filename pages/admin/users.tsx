import { useAuth, withRequireLogin } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import { AdminLayout } from "@lib/admin/ui/layout/AdminLayout";
import { UserList } from "@lib/user/ui";
import NotFoundPage from "pages/404";

const AdminHome = () => {
  const { user } = useAuth();
  return user?.role !== UserRole.ADMIN ? (
    <NotFoundPage />
  ) : (
    <AdminLayout>
      <UserList />
    </AdminLayout>
  );
};

export default withRequireLogin(AdminHome);
