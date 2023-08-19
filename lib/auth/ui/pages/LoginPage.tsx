import { AppLayout } from "@ui/index";
import { LoginScreen } from "../screens/LoginScreen";

export const LoginPage = () => {
  return (
    <AppLayout>
      <LoginScreen onClose={() => {}} />
    </AppLayout>
  );
};
