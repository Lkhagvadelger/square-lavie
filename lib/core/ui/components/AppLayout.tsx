import { getRootUrl } from "@lib/auth/data/types";
import {
  Box,
  Flex,
  Footer,
  Heading,
  HStack,
  LinkBox,
  useColorModeValue,
} from "@ui/index";
import { ReactNode, useEffect, useState } from "react";
import { Logo } from "./Logo";
// import { MobileHamburgerMenu } from "./navigation/MobileHamburgerMenu";
// import { NavMenu } from "./navigation/NavMenu";
import { LanguageDropdown } from "./navigation/LanguageDropdown";
// import { NotificationDropdown } from "./navigation/NotificationDropdown";
import { ThemeToggler } from "./navigation/ThemeToggler";
// import { useMobileMenuState } from "./navigation/useMobileMenuState";
import { useAuth } from "@lib/auth/ui";
import { TopRightMenu } from "./navigation/TopRightMenu";

export const AppLayout = ({
  title = "",
  bg = "transparent",
  contentWidth = "container.xl",
  hasNavBar = false,
  children,
}: {
  bg?: string;
  title?: string;
  contentWidth?: string;
  hasNavBar?: boolean;
  children?: ReactNode;
}) => {
  // const { isMenuOpen, toggle } = useMobileMenuState();
  const { user, isLoggedIn } = useAuth();
  const [rootUrl, setRootUrl] = useState("/");

  useEffect(() => {
    setRootUrl(getRootUrl(user));
  }, [user]);

  return (
    <>
      <Flex
        as="header"
        align="center"
        px={6}
        mt={{ base: 2, lg: 7 }}
        mb={{ base: 0, lg: 0 }}
        pb={{ base: 2, lg: 0 }}
        borderBottomColor={{
          base: useColorModeValue("gray.200", "gray.700"),
          lg: "initial",
        }}
        borderBottomWidth={{ base: "1px", lg: "0px" }}
        backgroundColor={bg}
      >
        <Flex
          justify="space-between"
          align="center"
          w="full"
          maxW="container.xl"
          mx="auto"
        >
          {/* <MobileHamburgerMenu onClick={toggle} isOpen={isMenuOpen} /> */}
          {/* <NavMenu.Mobile isOpen={isMenuOpen} rootUrl={rootUrl} isLoggedIn={isLoggedIn} /> */}
          {/* <Logo
            h={6}
            color={useColorModeValue("blue.700", "gray.400")}
            display={{ lg: "none" }}
          /> */}

          <LinkBox href={`${rootUrl}`} box={true} flexShrink={0}>
            <Logo
              w={{ base: "3.75em", lg: "7.5em" }}
              color={{
                base: useColorModeValue("blue.400", "gray.400"),
                lg: useColorModeValue("gray.400", "gray.400"),
              }}
            />
          </LinkBox>
          {/* <NavMenu.Desktop rootUrl={`${rootUrl}`} isLoggedIn={isLoggedIn} /> */}

          <Flex
            display={{ base: "none", lg: "flex" }}
            w="full"
            pl={20}
            ml={9}
            overflow="hidden"
          >
            <Heading
              variant="main"
              size={"2xl"}
              lineHeight={1.2}
              fontWeight={"200"}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {title}
            </Heading>
          </Flex>

          <HStack spacing="8">
            <HStack spacing="2">
              <LanguageDropdown />
              {/* {isLoggedIn && <NotificationDropdown />} */}
              <ThemeToggler />
            </HStack>
            {isLoggedIn && (
              <HStack spacing="1">
                <TopRightMenu />
              </HStack>
            )}
          </HStack>
        </Flex>
      </Flex>
      <Box as="main" display="flex" px="6" backgroundColor={bg}>
        <Box maxW={contentWidth} mx="auto" w="full">
          {children}
        </Box>
      </Box>
      <Flex as="footer" backgroundColor={bg} mt="4">
        <Box maxW={contentWidth} mx="auto" w="full">
          <HStack h="full">
            {hasNavBar && (
              <Box display={{ base: "none", lg: "flex" }} width={52} />
            )}
            <Box
              flex="1"
              h="full"
              color={useColorModeValue("gray.200", "gray.800")}
              borderTopWidth="1px"
              borderTopColor={useColorModeValue("gray.200", "gray.800")}
              px={{ base: "6", md: "0" }}
            >
              <Footer />
            </Box>
          </HStack>
        </Box>
      </Flex>
    </>
  );
};
