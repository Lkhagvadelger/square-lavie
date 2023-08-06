import { Box, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaAssistiveListeningSystems } from "react-icons/fa";
import { MdAssistant, MdOutlineAssistant } from "react-icons/md";

export const InformationBox = ({
  title,
  children,
  ...props
}: {
  title?: string;
  children: ReactNode;
}) => {
  return (
    <VStack
      w={"full"}
      align="start"
      color={useColorModeValue("blue.100", "blue.300")}
      bg={useColorModeValue("blue.10", "blue.850")}
      borderColor={useColorModeValue("blue.600", "blue.850")}
      borderRadius="4"
      border={"1px"}
      px="2"
      py="3"
      direction={{ base: "column", md: "row" }}
      {...props}
    >
      <HStack fontSize="sm" alignItems={"self-start"}>
        <Text
          lineHeight={1.6}
          top="0"
          left="0"
          color={useColorModeValue("blue.600", "blue.300")}
        >
          <MdOutlineAssistant size="16px" />
        </Text>
        <Box
          w="full"
          fontSize="12px"
          lineHeight={"16px"}
          fontWeight="medium"
          color={useColorModeValue("gray.700", "blue.300")}
        >
          {children}
        </Box>
      </HStack>
    </VStack>
  );
};
