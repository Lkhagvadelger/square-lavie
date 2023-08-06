import { Box, Text, VStack, HStack, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  BsExclamationTriangle,
  BsFillExclamationTriangleFill,
  BsInfoCircle,
  BsLightbulb,
  BsLightbulbFill,
  BsTriangle,
} from "react-icons/bs";
import { IoBulb, IoBulbOutline } from "react-icons/io5";

export const SuccessBox = ({
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
      color={useColorModeValue("green.50", "green.300")}
      bg={useColorModeValue("green.10", "green.850")}
      borderColor={useColorModeValue("green.50", "green.850")}
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
          color={useColorModeValue("green.600", "green.300")}
        >
          <IoBulb size="16px" />
        </Text>
        <Box
          w="full"
          fontSize="10px"
          lineHeight={1.4}
          fontWeight="medium"
          color={useColorModeValue("green.600", "green.300")}
        >
          {children}
        </Box>
      </HStack>
    </VStack>
  );
};
