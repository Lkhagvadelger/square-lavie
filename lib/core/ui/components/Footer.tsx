import { Box, Text, TextProps } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";

export const Footer = (props: TextProps) => {
  const { t: to } = useTranslation("common");

  return (
    <Box
      {...props}
      w="full"
      fontSize={{ base: 10, md: "xs" }}
      px={0}
      py={{ base: 4, md: 6 }}
      mb={{ base: 3.5, md: 1 }}
      textAlign={{ base: "center", md: "initial" }}
    >
      <Text as="span">
        {to("footer-text", { year: new Date().getFullYear() })}
      </Text>
      <Box display={{ base: "block", md: "inline-block" }}>
        <NextLink href="/privacy-policy">
          <Box as="span" mx={1} textDecoration="underline">
            {to("privacy-policy")}
          </Box>
        </NextLink>
        •
        <NextLink href="/terms-of-service">
          <Box as="span" mx={1} textDecoration="underline">
            {to("terms-of-service")}
          </Box>
        </NextLink>
      </Box>
    </Box>
  );
};
