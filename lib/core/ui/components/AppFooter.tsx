import { Box, Flex, Footer, HStack } from "@ui/index";

export const AppFooter = ({
  contentWidth = "container.xl",
  bg = "transparent",
  color = "gray.400",
  border = "gray.200",
  hasNavBar = false,
  visible = true,
}: {
  contentWidth?: string;
  bg?: string;
  color?: string;
  border?: string;
  hasNavBar?: boolean;
  visible?: boolean;
}) => {
  return (
    <Flex
      as="footer"
      backgroundColor={bg}
      pt="4"
      display={visible ? "block" : "none"}
    >
      <Box maxW={contentWidth} mx="auto" w="full">
        <HStack h="full" mx={{ base: 6, xl: 0 }}>
          {hasNavBar && (
            <Box display={{ base: "none", lg: "flex" }} width={52} />
          )}
          <Box
            flex="1"
            h="full"
            color={color}
            borderTopWidth="1px"
            borderTopColor={border}
            px={{ base: "6", md: "0" }}
          >
            <Footer />
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
};
