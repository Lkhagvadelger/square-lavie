import {
  Box,
  Card,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
} from "@ui/index";
import NextLink from "next/link";
import { ReactNode } from "react";

export const CardLink = ({
  heading,
  text,
  icon,
  href,
}: {
  heading: ReactNode;
  text: ReactNode;
  icon?: any;
  href: string;
}) => (
  <NextLink href={href}>
    <Box flex="1" cursor="pointer">
      <Card bg={useColorModeValue("gray.200", "gray.900")}>
        <Flex w="full" justifyContent="space-between" mb="3">
          <Heading size="md">{heading}</Heading>
          {icon ? <Icon as={icon} w={6} h={6} /> : null}
        </Flex>
        <Text color={useColorModeValue("gray.600", "gray.400")}>{text}</Text>
      </Card>
    </Box>
  </NextLink>
);
