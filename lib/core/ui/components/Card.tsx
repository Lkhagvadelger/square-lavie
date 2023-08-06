import { Box, BoxProps, Heading, useColorModeValue, VStack } from "@ui/index";

export const Card = (props: BoxProps) =>
  props.title ? (
    <VStack>
      <Heading color="gray.700" fontWeight="900" fontSize="lg" w="full">
        {props.title}
      </Heading>
      <CardBox {...props} />
    </VStack>
  ) : (
    <CardBox {...props} />
  );

const CardBox = (props: BoxProps) => (
  <Box
    bg={useColorModeValue("offWhite", "black")}
    py="4"
    px={{ base: "4", md: "5" }}
    // shadow="base"
    borderRadius="3px"
    border="1px"
    borderColor={useColorModeValue("gray.50", "gray.850")}
    {...props}
  />
);
