import { Box, Text, VStack, HStack, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsInfoCircle } from "react-icons/bs";

export const ReminderBox = ({
  title,
  children,
  ...props
}: {
  title?: string;
  children: ReactNode;
}) => {
  return (
    <VStack
      align="start"
      color={useColorModeValue("gray.800", "gray.400")}
      bg={useColorModeValue("gray.50", "gray.850")}
      borderRadius="12"
      p="6"
      direction={{ base: "column", md: "row" }}
      {...props}
    >
      <HStack fontSize="xl" mr="2">
        <BsInfoCircle />
        {title && (
          <Text display="inline-block" fontSize="md" fontWeight="bold">
            {title}
          </Text>
        )}
      </HStack>
      <Box w="full" fontSize="md" lineHeight={1.333} fontWeight="normal" pl="7">
        {children}
      </Box>
    </VStack>
  );
};
