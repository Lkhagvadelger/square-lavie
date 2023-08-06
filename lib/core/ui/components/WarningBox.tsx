import { Box, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsFillExclamationTriangleFill } from "react-icons/bs";

export const WarningBox = ({
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
      color={useColorModeValue("orange.50", "orange.300")}
      bg={useColorModeValue("orange.10", "orange.850")}
      borderColor={useColorModeValue("orange.50", "orange.850")}
      borderRadius="6"
      border={"1px"}
      px="2"
      py="3"
      direction={{ base: "column", md: "row" }}
      mt="3"
      {...props}
    >
      <HStack fontSize="sm" alignItems={"self-start"}>
        <Text
          lineHeight={1.6}
          top="0"
          left="0"
          color={useColorModeValue("orange.600", "orange.300")}
        >
          <BsFillExclamationTriangleFill size="16px" />
        </Text>
        <Box
          w="full"
          fontSize="10px"
          lineHeight={1.4}
          fontWeight="medium"
          color={useColorModeValue("orange.600", "orange.300")}
        >
          {children}
        </Box>
      </HStack>
    </VStack>
  );
};
