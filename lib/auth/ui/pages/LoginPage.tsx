import { MobileAppLayout } from "@ui/components/MobileAppLayout";
import { LoginScreen } from "../screens/LoginScreen";

export const LoginPage = () => {
  return (
    <MobileAppLayout>
      <LoginScreen onClose={() => {}} />
    </MobileAppLayout>
  );
};
