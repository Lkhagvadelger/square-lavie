import { Box, BoxProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactNode } from "react";

export const LinkBox = ({
  href,
  box,
  children,
  ...props
}: {
  href?: string;
  box?: boolean;
  children: ReactNode;
} & BoxProps) =>
  href ? (
    <NextLink href={href}>
      {box ? <Box {...props}>{children}</Box> : children}
    </NextLink>
  ) : box ? (
    <Box {...props}>{children}</Box>
  ) : (
    <>{children}</>
  );
