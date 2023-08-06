import {
  Box,
  Flex,
  HStack,
  Image,
  LinkBox,
  useColorModeValue,
} from "@ui/index";
import { Logo } from "./Logo";

export const AvanteHeader = ({ titleText = "" }: { titleText?: string }) => {
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
        h={"auto"}
        maxW="container.xl"
        mx="auto"
        mt={{ base: "2", lg: "3" }}
        mb={{ base: "6", lg: "2" }}
      >
        <LinkBox
          href={"/avante"}
          box={true}
          flexShrink={0}
          mt={{ base: 1, lg: -1 }}
        >
          <Logo w={{ base: "4.8em", lg: "6.4em" }} color={logoColor} />
        </LinkBox>

        <HStack spacing="4">
          <Box>
            <LinkBox
              href={"/avante"}
              box={true}
              flexShrink={0}
              mt={{ base: 1, lg: -1 }}
            >
              <Image alt="avante" src="/images/avante.svg" h={12} />
            </LinkBox>
          </Box>
        </HStack>
      </Flex>
    </Flex>
  );
};
