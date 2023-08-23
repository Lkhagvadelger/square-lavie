import { HStack, Flex, Text, Icon, Box } from "@chakra-ui/react";
import { BsReceiptCutoff, BsChevronRight } from "react-icons/bs";
import { displayServicePrice } from "../../api/service";

export const FloatingCart = ({
  total,
  goToCalendar,
}: {
  total: any;
  goToCalendar: () => void;
}) => {
  return (
    <Box
      p={4}
      top={"calc(100% - 130px)"}
      pos={"fixed"}
      w={"full"}
      zIndex="101"
      onClick={goToCalendar}
    >
      <HStack
        border={"2px"}
        borderColor="#fff"
        w="full"
        borderRadius={"8px"}
        mt="0 !important"
        color="white"
        bg="green.500"
        fontSize={13}
        h={24}
        p={2}
      >
        <Flex w="full" justifyContent={"space-between"}>
          <HStack gap={3} textAlign={"left"} w="full" ml={2} mt={1}>
            <Box bg="white" borderRadius={"3xl"} w="12" h="12">
              <Icon
                color="gray.800"
                ml="3"
                mt={3}
                fontSize={"24px"}
                as={BsReceiptCutoff}
              />
            </Box>
            <HStack>
              <Box>
                <Text fontSize="14px" fontWeight="normal">
                  Total service
                </Text>
                <Text fontSize="16px" fontWeight="bold">
                  {total.totalItems}
                </Text>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <Text fontSize="14px" fontWeight="normal">
                  Total price
                </Text>
                <Text fontSize="16px" fontWeight="bold">
                  {displayServicePrice(total.totalPrice)}
                </Text>
              </Box>
            </HStack>
          </HStack>
          {total.totalItems > 0 && (
            <Text flexGrow={1} fontSize="32px" pt={2} textAlign={"right"}>
              <Icon as={BsChevronRight} />
            </Text>
          )}
        </Flex>
      </HStack>
    </Box>
  );
};
