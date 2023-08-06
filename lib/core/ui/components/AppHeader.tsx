import { useAuth } from "@lib/auth/ui";
import {
  Box,
  Text,
  Flex,
  HStack,
  Icon,
  LinkBox,
  useColorModeValue,
} from "@ui/index";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { Logo } from "./Logo";
import { LanguageDropdown } from "./navigation/LanguageDropdown";
import { ProfileMenu } from "./navigation/ProfileMenu";
import { ThemeToggler } from "./navigation/ThemeToggler";

export const AppHeader = ({
  showProfileMenu,
  showThemeSwitch = true,
  titleText = "",
}: {
  showProfileMenu: boolean;
  // showThemeSwitch is acting as a flag for Mobile Widget Layout settings toggler
  showThemeSwitch?: boolean;
  titleText?: string;
}) => {
  const { isLoggedIn } = useAuth();
  const logoColor = useColorModeValue("white", "gray.500");
  return (
    <Flex
      as="header"
      align="center"
      mb={0}
      pt={{ base: 4, lg: 0 }}
      // pb={{ base: showThemeSwitch ? 2 : 2, lg: 10 }}
      px={6}
      backgroundColor={useColorModeValue("main.500", "black")}
      h="24"
    >
      <Flex
        justify="space-between"
        align="center"
        w="full"
        h={showThemeSwitch ? 16 : "auto"}
        maxW="container.xl"
        mx="auto"
        mt={{ base: "2", lg: "3" }}
        mb={{ base: "6", lg: "2" }}
      >
        {titleText == "" ? (
          <>
            <LinkBox
              href={showThemeSwitch ? "/" : "#"}
              box={true}
              flexShrink={0}
              mt={{ base: 1, lg: -1 }}
            >
              <Logo w={{ base: "4.8em", lg: "6.4em" }} color={logoColor} />
            </LinkBox>
          </>
        ) : (
          <>
            <HStack w={"full"} color="white">
              <Box
                w={"full"}
                textAlign="start"
                fontSize={"lg"}
                fontWeight={900}
                lineHeight="24px"
              >
                {titleText}
              </Box>
              <Box w={"24px"}></Box>
            </HStack>
          </>
        )}
        <HStack spacing="4">
          <HStack spacing={{ base: 0, lg: 2 }}>
            <LanguageDropdown />
            {/* {showThemeSwitch && <ThemeToggler />} */}
          </HStack>
          {showProfileMenu && isLoggedIn && <ProfileMenu />}
        </HStack>
      </Flex>
    </Flex>
  );
};
