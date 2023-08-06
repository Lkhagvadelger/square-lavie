import {
  Box,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Progress,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  BsExclamationTriangle,
  BsFillExclamationTriangleFill,
  BsInfoCircle,
  BsTriangle,
  BsFillClockFill,
} from "react-icons/bs";

export const LoadingBox = ({
  title,
  children,
  ...props
}: {
  title?: string;
  children: ReactNode;
}) => {
  return (
    <>
      <VStack
        w={"full"}
        align="start"
        color={useColorModeValue("pink.50", "pink.300")}
        bg={useColorModeValue("pink.10", "pink.850")}
        borderColor={useColorModeValue("pink.50", "pink.850")}
        borderRadius="4"
        border={"1px"}
        px="2"
        py="3"
        direction={{ base: "column", md: "row" }}
        {...props}
      >
        <HStack fontSize="sm" w={"full"} alignItems={"self-start"}>
          <Text
            lineHeight={1.6}
            top="0"
            left="0"
            color={useColorModeValue("pink.600", "pink.300")}
          >
            <BsFillClockFill size="16px" />
          </Text>
          <Box
            w="full"
            fontSize="12px"
            lineHeight={1.4}
            fontWeight="medium"
            color={useColorModeValue("pink.600", "pink.300")}
          >
            {children}
          </Box>
        </HStack>
        <Box w={"full"}>
          <Progress
            size="xs"
            colorScheme="pink"
            borderRadius="1rem"
            isIndeterminate
          />
        </Box>
      </VStack>{" "}
    </>
  );
};
