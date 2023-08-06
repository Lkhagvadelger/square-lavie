import { AppError } from "@util/errors";
import { AppLayout, Box, NavContentLayout, SEO, Stack } from "..";
import useTranslation from "next-translate/useTranslation";

export const ErrorCard = ({ error }: { error: AppError }) => {
  const { t } = useTranslation("common");
  const title = `${error.statusCode} - ${error.message}`;

  return (
    <AppLayout contentWidth="container.xl">
      <SEO title={title} />
      <Stack h="full" align="top" spacing={0}>
        <NavContentLayout>
          <Box
            display="flex"
            h="full"
            w="full"
            alignItems="center"
            justifyContent="center"
          >
            {error.statusCode} | {t(`errors.${error.translationKey}`)}
          </Box>
        </NavContentLayout>
      </Stack>
    </AppLayout>
  );
};
