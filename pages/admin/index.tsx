import { withRequireLogin } from "@lib/auth/ui";
import { AdminLayout, AdminHome } from "@lib/admin/ui";

const AdminHomePage = () => (
  <AdminLayout>
    <AdminHome />
  </AdminLayout>
);

export default withRequireLogin(AdminHomePage);
