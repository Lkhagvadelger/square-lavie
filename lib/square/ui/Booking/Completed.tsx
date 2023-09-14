import {
  AppLayout,
  Box,
  Button,
  Circle,
  Container,
  Flex,
  Spinner,
  StackDivider,
  Text,
  VStack,
} from "@ui/index";
import { useRouter } from "next/router";
import { useGetBooking } from "../../data/hooks";
import Link from "next/link";

export const Completed = ({
  locationId,
  bookingIds,
}: {
  locationId: string;
  bookingIds: string;
}) => {
  const { data: bookingData, isLoading } = useGetBooking(
    locationId,
    bookingIds
  );

  const router = useRouter();
  const goBack = () => {
    router.push("/square/" + locationId);
  };

  return (
    <AppLayout>
      <>
        {isLoading && <Spinner />}

        <VStack spacing={4} align="center">
          <Container>
            <Text align={"center"} fontSize="3xl">
              (6xl) In love with React & Next
            </Text>
            <Text align={"center"} fontSize="xl">
              (6xl) In love with React & Next
            </Text>
          </Container>
          <Box
            alignItems="baseline"
            borderColor={"gray"}
            borderRadius="3px"
            borderWidth="1px"
            minW={{ sm: "16rem", md: "16rem", lg: "16rem" }}
            minH={"20rem"}
            px={5}
            py={5}
          >
            <Box display={"flex"} alignSelf={"center"}>
              <Circle size="40px" bg="tomato" color="white">
                <Text align={"center"} fontSize="xl">
                  B
                </Text>
              </Circle>
              <Text align={"center"} fontSize="xl">
                ANU
              </Text>
            </Box>

            <Text align={"center"} fontSize="xl">
              Friday, September 29, 2023
            </Text>
            <Text align={"center"} fontSize="xl">
              12:30 pm – 1:20 pm PDT
            </Text>
            <Text align={"center"} fontSize="xl">
              Basic pedicure (Regular polish){" "}
            </Text>
            <Link href={"#"}>
              6000 Bollinger Canyon Rd, 1205 San Ramon, CA 94583
            </Link>
            <Box>
              <Link href={"#"}>(925) 586-7488</Link>
            </Box>
            <Box>
              <Button onClick={() => {}}>Add to calendar</Button>
            </Box>
            <Box>
              <Link href={"#"}>Reschedule appointment</Link>
            </Box>
            <Box>
              <Link href={"#"}>Cancel appointment</Link>
            </Box>
            <Box>
              <Link href={"#"}>Book another appointment</Link>
            </Box>
          </Box>
        </VStack>

        <Flex flexWrap={"wrap"} justifyContent={"flex-start"}>
          {/* {bookingData != null && JSON.stringify(bookingData)} */}
        </Flex>
        <Box>
          <Button onClick={goBack}>Back</Button>
        </Box>
      </>
    </AppLayout>
  );
};
