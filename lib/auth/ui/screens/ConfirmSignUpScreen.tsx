import { Box, Spinner } from "@chakra-ui/react";
import { useEmailConfirmation } from "@lib/auth/data/authHooks";
import { ActionPanel } from "@ui/index";
import useTranslation from "next-translate/useTranslation";

export const ConfirmSignUpScreen = ({ link }: { link: string }) => {
  const { data, isLoading } = useEmailConfirmation(link);
  const { t } = useTranslation("app");

  return (
    <>
      {isLoading ? (
        <Box>
          <Spinner />
        </Box>
      ) : (
        data && (
          <ActionPanel
            title={t(data.result)}
            link={"/auth/login"}
            description="Бүртгэл баталгаажуулах"
            actionText="Нэвтрэх"
          />
        )
      )}
    </>
  );
};
