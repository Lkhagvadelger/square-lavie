import { useRouter } from "next/router";
import { useAuth, withRequireLogin } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import { AdminLayout } from "@lib/admin/ui/layout/AdminLayout";
import NotFoundPage from "pages/404";

const AdminUserDetailPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const userId = router.query && (router.query.id as string);
  return user?.role !== UserRole.ADMIN ? (
    <NotFoundPage />
  ) : (
    <AdminLayout>
    </AdminLayout>
  );
};

export default withRequireLogin(AdminUserDetailPage);
