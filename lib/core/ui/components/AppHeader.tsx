import { useAuth } from "@lib/auth/ui";
import { LoginButton } from "@lib/auth/ui/components/LoginButton";
import { Flex, HStack, Text } from "@ui/index";
import NextLink from "next/link";
import { ProfileMenu } from "./navigation/ProfileMenu";

export const AppHeader = ({ titleText = "" }: { titleText?: string }) => {
  const { isLoggedIn } = useAuth();
  return (
    <Flex as="header" align="center" backgroundColor={"#5f5aed"}>
      <Flex
        mx={"auto"}
        maxW={"800px"}
        justify="space-between"
        align="center"
        w="full"
        h={"auto"}
        p={2}
      >
        <NextLink href="/">
          <Text
            cursor={"pointer"}
            w={"full"}
            lineHeight="29px"
            fontWeight={"900"}
            fontSize="24px"
            color="white"
          >
            {titleText}
          </Text>
        </NextLink>
        <HStack spacing="2">
          {isLoggedIn ? (
            <ProfileMenu />
          ) : (
            <>
              <LoginButton />
            </>
          )}
        </HStack>
      </Flex>
    </Flex>
  );
};
