import { Box, useColorModeValue } from "@ui/index";
import { ReactNode } from "react";
import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";

export const AppLayout = ({
  bg = "transparent",
  contentWidth = "container.xl",
  hasNavBar = false,
  children,
  showThemeSwitch = true,
  titleText = "",
  showFooter = true,
}: {
  bg?: string;
  contentWidth?: string;
  hasNavBar?: boolean;
  children?: ReactNode;
  showThemeSwitch?: boolean;
  titleText?: string;
  showFooter?: boolean;
}) => (
  <>
    <AppHeader
      showProfileMenu={true}
      showThemeSwitch={showThemeSwitch}
      titleText={titleText}
    />
    <Box as="main" display="flex" px="6" backgroundColor={bg}>
      <Box maxW={contentWidth} mx="auto" w="full">
        {children}
      </Box>
    </Box>
    <AppFooter
      contentWidth={contentWidth}
      bg={bg}
      color={useColorModeValue("gray.400", "gray.600")}
      border={useColorModeValue("gray.200", "gray.800")}
      hasNavBar={hasNavBar}
      visible={showFooter}
    />
  </>
);
