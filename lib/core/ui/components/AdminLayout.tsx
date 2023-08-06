import { Box, Button, VStack } from "@ui/index";
import NextLink from "next/link";
import { ReactNode } from "react";

export const AdminLayout = ({
  bg = "gray.50",
  contentWidth = "container.xl",
  children,
}: {
  bg?: string;
  contentWidth?: string;
  children?: ReactNode;
}) => {
  return (
    <>
      <Box as="main" display="flex" mt={6} backgroundColor={bg}>
        <VStack w={"full"}>
          <Box w={"full"} pl={6} pr={6} pt={6}>
            <Box
              as="span"
              display={"inline-block"}
              fontSize="sm"
              fontWeight={"medium"}
              textTransform={"uppercase"}
              lineHeight={1}
              color={"orange"}
            >
              <NextLink href={`/admin`}>
                <Button variant="link" colorScheme="blue">
                  Back to list
                </Button>
              </NextLink>
            </Box>
          </Box>
          <Box maxW={contentWidth} mx="auto" w="full" p="6">
            {children}
          </Box>
        </VStack>
      </Box>
    </>
  );
};
