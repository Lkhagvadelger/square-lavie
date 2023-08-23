import { Stack, Skeleton, Box } from "@chakra-ui/react";

export const SkeletonLoading = () => {
  return (
    <Box p={2}>
      {[1, 2, 3, 4].map((item, key) => (
        <Stack
          key={key}
          mb={2}
          p={3}
          border={"1px"}
          borderColor="gray.200"
          borderRadius={"4px"}
          w="full"
          gap={2}
        >
          <Skeleton height="30px" />
          <Box>
            <Skeleton ml={40} height="30px" />
          </Box>
          <Box>
            <Skeleton ml={40} height="30px" />
          </Box>
        </Stack>
      ))}
    </Box>
  );
};
