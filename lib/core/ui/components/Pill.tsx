import { Box } from "@ui/index";

export const Pill = ({ color, text }: { color: string; text: string }) => (
  <Box
    as="span"
    color="white"
    fontWeight={700}
    px={2}
    py={0.5}
    borderRadius={"50px"}
    fontSize="xx-small"
    textTransform={"uppercase"}
    verticalAlign={"middle"}
    bg={color}
  >
    {text}
  </Box>
);
