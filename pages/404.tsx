import { AppLayout } from "@ui/components/App1Layout";
import { Box, Img, SEO, Stack, Text, useColorModeValue } from "@ui/index";
import NextLink from "next/link";

const NotFoundPage = () => {
  return (
    <AppLayout>
      <SEO title="Error 404: Page not found!" />
      <Stack
        h="full"
        color={useColorModeValue("gray.850", "gray.300")}
        textAlign={"center"}
        alignContent={"center"}
        alignItems={"center"}
        w={"full"}
      >
        <Box my="auto">
          <Img src={`/icon-404.svg`} mx="auto" width="24" alt="Icon of Skull" />
          <Text
            my="auto"
            fontSize={{ base: "6xl", lg: "9xl" }}
            fontWeight="black"
          >
            404
          </Text>
          <Text fontSize={{ base: "md", lg: "lg" }} fontWeight="medium">
            The page you’re looking for doesn’t exist.
          </Text>
          <NextLink href="/">
            <Box color="green.500" _hover={{ textDecoration: "underline" }}>
              Return Home
            </Box>
          </NextLink>
        </Box>
      </Stack>
    </AppLayout>
  );
};

export default NotFoundPage;
