import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

export const InstructionBox = ({
  title,
  children,
  ...props
}: {
  title?: string;
  children: ReactNode;
}) => {
  return (
    <Box
      fontSize={{ base: "10px", sm: "10px", md: "11px", lg: "12px" }}
      lineHeight="14px"
      borderRadius="6"
      px="3"
      py="2"
      color={useColorModeValue("pink.800", "gray.400")}
      bg={useColorModeValue("pink.50", "gray.850")}
      fontWeight="medium"
      w="full"
      display={{ base: "block", sm: "inline" }}
    >
      {children}
    </Box>
  );
};
