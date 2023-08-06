import { ReactNode } from "react";
import { Box, Grid, VStack, Text, GridItem, Image } from "@ui/index";

import useTranslation from "next-translate/useTranslation";

export const DocumentPreview = ({
  title,
  data,
}: {
  title: string;
  data: { type: string; date: string; link: string }[];
}) => {
  const { t } = useTranslation("local-doctor");
  return (
    <VStack alignItems="flex-start" gap={5}>
      <Text textAlign="left" fontSize="lg" fontWeight="black" mb={-4}>
        {title} •{" "}
        <Text as="span" fontWeight={"400"} color={"gray.500"}>
          {data.length} Documents
        </Text>
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} w={"100%"}>
        {data.map((d, i) => {
          return (
            <GridItem
              key={i}
              h={64}
              w={"100%"}
              p={4}
              borderWidth={1}
              bg={"offWhite"}
              borderColor={"gray.50"}
            >
              <Box w={"100%"} h={48}>
                <Image src="/images/attached.png" alt="" h={40} />
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </VStack>
  );
};
