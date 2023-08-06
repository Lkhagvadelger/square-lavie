import { ReactNode } from "react";
import {
  Box,
  Grid,
  VStack,
  Text,
  GridItem,
  Image,
  HStack,
  Link,
} from "@ui/index";

import useTranslation from "next-translate/useTranslation";
import { PatientNoteFileTypeSelect } from "../data/uploadHooks";
import NextLink from "next/link";
export const ImagePreview = ({
  title,
  data,
}: {
  title: string;
  data: PatientNoteFileTypeSelect[] | undefined;
}) => {
  const { t: tc } = useTranslation("concept");
  const { t: to } = useTranslation("common");
  const { t } = useTranslation("local-doctor");

  return (
    <VStack alignItems="flex-start" gap={2} mt={4}>
      <Text textAlign="left" fontSize="lg" fontWeight="black">
        {to(`document-type.${title}`)} •{" "}
        <Text as="span" fontWeight={"400"} color={"gray.500"}>
          {data?.length} {t(`header.patient-docs`)}
        </Text>
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} w={"full"}>
        {data?.map((d, i) => {
          return (
            <GridItem
              key={i}
              h={40}
              w={"full"}
              p={4}
              borderRadius={3}
              borderWidth={1}
              bg={"offWhite"}
              borderColor={"gray.50"}
            >
              <Box
                w={"100%"}
                borderTopLeftRadius={3}
                borderTopRightRadius={3}
                h={20}
                mb={4}
                bg={"#41adbd"}
                alignContent="center"
                alignItems={"center"}
                pt={6}
              >
                <Link href={d.fileLink} target="_blank">
                  <HStack w={"full"} pl={10}>
                    <Image src="/images/attached.png" alt="" h={8} />
                    <Text color="white">
                      {t("patient-notes.click-to-open-file")}
                    </Text>
                  </HStack>
                </Link>
              </Box>
              <HStack w={"full"} fontSize="sm">
                <VStack w={"full"} alignItems={"start"}>
                  <Text color={"blue.700"} lineHeight={0}>
                    {t(`expert-opinion.lab-type`)}
                  </Text>
                  <Text>{tc(`${d.fileCategory}.name`)}</Text>
                </VStack>
                <VStack w={32} alignItems={"end"}>
                  <Text color={"blue.700"} lineHeight={0}>
                    {t(`expert-opinion.lab-date`)}
                  </Text>
                  <Text>{d.fileSourceDate}</Text>
                </VStack>
              </HStack>
            </GridItem>
          );
        })}
      </Grid>
    </VStack>
  );
};
