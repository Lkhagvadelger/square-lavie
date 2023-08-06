import { Box } from "@ui/index";
import { ReactNode } from "react";
import { AvanteHeader } from "./AvanteHeader";

export const AvanteLayout = ({
  bg = "transparent",
  contentWidth = "container.xl",
  children,
  titleText = "",
}: {
  bg?: string;
  contentWidth?: string;
  children?: ReactNode;
  titleText?: string;
}) => (
  <>
    <AvanteHeader titleText={titleText} />
    <Box as="main" display="flex" px="6" backgroundColor={bg}>
      <Box maxW={contentWidth} mx="auto" w="full">
        {children}
      </Box>
    </Box>
  </>
);
