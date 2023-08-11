import {
  SEO,
  AppLayout,
  Box,
  Card,
  Heading,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@ui/index";
import useTranslation from "next-translate/useTranslation";

const TermsOfService = () => {
  const { t: to } = useTranslation("common");

  return (
    <AppLayout title={to(`privacy-policy`)} contentWidth={"container.xl"}>
      <SEO title={to(`privacy-policy`)} />
      <Card my={6}>
        <Box></Box>
      </Card>
    </AppLayout>
  );
};

export default TermsOfService;
