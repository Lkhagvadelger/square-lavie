import { AppFooter } from "@ui/components/AppFooter";
import { AppHeader } from "@ui/components/AppHeader";
import { Box, Card, Icon, SEO, Text, useColorModeValue } from "@ui/index";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { ReactNode } from "react";
import { IoArrowBack } from "react-icons/io5";

export const AuthLayout = ({
  title,
  caption = "",
  backAction,
  actions,
  contentWidth,
  children,
}: {
  title: string;
  caption: string;
  backAction?: { text: string; onClick: () => void };
  actions?: ReactNode;
  contentWidth: string;
  children: ReactNode;
}) => {
  const { t: ta } = useTranslation("auth");

  return (
    <>
      <SEO title={title} />
      <AppHeader />
      <Box
        as="main"
        display="flex"
        px="6"
        bg={useColorModeValue("main.500", "black")}
      >
        <Box w="full" mx="auto">
          <Text
            mt="12"
            mb="4"
            //mx={{ base: 6, md: 0 }}
            textAlign="center"
            color={useColorModeValue("gray.50", "gray.400")}
            fontSize="22px"
            fontWeight="bold"
            lineHeight={1.212}
          >
            {caption}
          </Text>
          <Card
            w="full"
            maxW={contentWidth}
            px={{ base: 6, md: 12 }}
            py={{ base: 6, md: 12 }}
            mx="auto"
            pos="relative"
          >
            {backAction && (
              <Box
                pos="absolute"
                top={{ base: -10, md: 4 }}
                left={{ base: 0, md: -14 }}
                mt={{ base: -1, md: 0 }}
                color="offWhite"
                textAlign="center"
                cursor="pointer"
                onClick={backAction.onClick}
              >
                <Icon as={IoArrowBack} fontSize="2xl" />
                <Box
                  display={{ base: "none", md: "block" }}
                  fontSize="10"
                  fontWeight="medium"
                  textTransform="uppercase"
                >
                  {backAction.text}
                </Box>
              </Box>
            )}
            {children}
            {actions ? (
              <Box w="full" pt="8" textAlign="right">
                {actions}
              </Box>
            ) : (
              <Text pt={10} textAlign="center" color="gray.500" fontSize="xs">
                <Trans
                  i18nKey={`auth:sign-in.need-help`}
                  components={[
                    <Text
                      key="0"
                      as="a"
                      color="green.600"
                      fontWeight="medium"
                      _hover={{
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      href={ta(`support-phone-link`)}
                    >
                      {ta(`support-phone`)}
                    </Text>,
                    <Text
                      key="1"
                      as="a"
                      color="green.600"
                      fontWeight="medium"
                      _hover={{
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      href={ta(`support-email-link`)}
                    >
                      {ta(`support-email`)}
                    </Text>,
                  ]}
                />
              </Text>
            )}
          </Card>
        </Box>
      </Box>
      <AppFooter
        bg={useColorModeValue("main.500", "black")}
        color={useColorModeValue("main.200", "gray.600")}
        border={useColorModeValue("main.400", "gray.850")}
      />
    </>
  );
};
