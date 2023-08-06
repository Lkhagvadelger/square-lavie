import { Box, Text, BoxProps, useColorModeValue, Heading } from "@ui/index";

export const CardOutsideTitle = ({ title }: { title: string }) => (
  <Heading color="gray.700" fontWeight={"900"} fontSize="lg" w={"full"}>
    {title}
  </Heading>
);
