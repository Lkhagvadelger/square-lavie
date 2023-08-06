import { Box, HStack, Spinner } from "@ui/index";
import { ReactNode } from "react";
import { Card } from "./Card";

export const NavContentLayout = ({
  actions,
  isLoading,
  header,
  wBox,
  noCard,
  layoutType,
  children,
  ...props
}: {
  actions?: ReactNode;
  isLoading?: boolean;
  header?: ReactNode;
  wBox?: ReactNode;
  noCard?: boolean;
  layoutType?: any;
  children: ReactNode | ReactNode[];
}) => {
  return (
    <Box
      position="relative"
      flex="1"
      h="full"
      display="flex"
      flexDirection="column"
      pb="20"
      mt={{ base: 0, sm: 4, md: 6 }}
      {...props}
    >
      {isLoading && (
        <Box
          display="flex"
          position="absolute"
          zIndex="9"
          w="full"
          h="full"
          bg="white"
          opacity="0.66"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="lg" color="green.600" thickness="3px" mt="-150" />
        </Box>
      )}
      {header}
      {wBox}
      {noCard ? (
        children
      ) : !Array.isArray(children) ? (
        <Box>
          <Card flex="1" p={{ base: "6", md: "8" }} mb="2">
            {children}
          </Card>
        </Box>
      ) : (
        children.map((child, i) => (
          <Card key={`card-${i}`} p="8" mb="2">
            {child}
          </Card>
        ))
      )}
      {actions ? (
        <HStack
          position={{ base: "fixed", md: "relative" }}
          bottom={{
            base: "72px",
            md: "auto",
          }}
          left={0}
          bg={{ base: "white", md: "none" }}
          borderTop={{ base: "1px", md: "none" }}
          borderColor="gray.400"
          w="full"
          justify={{ base: "center", md: "right" }}
          spacing="2"
          px={{ base: 0, md: 6, lg: 0 }}
          py={6}
        >
          {actions}
        </HStack>
      ) : null}
    </Box>
  );
};
