import { ReactNode } from "react";
import { Box } from "@ui/index";

export const FrameLayout = ({
  bg = "transparent",
  contentWidth = "container.xl",
  children,
}: {
  bg?: string;
  contentWidth?: string;
  children?: ReactNode;
}) => {
  return (
    <Box as="main" display="flex" px="6" boxShadow={"2xl"} bg={bg}>
      <Box maxW={contentWidth} mx="auto" w="full">
        {children}
      </Box>
    </Box>
  );
};
