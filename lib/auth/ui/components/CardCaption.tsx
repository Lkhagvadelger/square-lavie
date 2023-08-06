import { Box, Text, useColorModeValue } from "@ui/index";

export const CardCaption = ({
  text,
  desc,
}: {
  text: string;
  desc?: string;
}) => {
  return (
    <Box
      color={useColorModeValue("main.500", "gray.400")}
      mb="6"
      fontSize="md"
      fontWeight="medium"
      lineHeight={1.212}
    >
      {text} {desc && <Text color="pink.700">{desc}</Text>}
    </Box>
  );
};
