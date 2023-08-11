import { Box } from "@chakra-ui/react";
import { useEmailConfirmation } from "@lib/auth/data/authHooks";
import { MobileAppLayout } from "@ui/components/MobileAppLayout";
import { ActionPanel } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { ConfirmSignUpScreen } from "../screens/ConfirmSignUpScreen";

export const ConfirmSignUpPage = () => {
  const router = useRouter();
  const { link } = router.query;

  return (
    <MobileAppLayout>
      {link && <ConfirmSignUpScreen link={link as string} />}
    </MobileAppLayout>
  );
};
