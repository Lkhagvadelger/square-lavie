import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@ui/index";
import { useState } from "react";
import { setSelectedKey } from "../api/service";
import { useLocalStorage } from "../data/hooks";
import { ServiceItem, CartModel } from "../data/types";
import { ChoiceList } from "./ChoiceList";

export const AdditionalService = ({
  isOpen,
  onClose,
  additionalServices,
  addItemBySelectedVariantId,
  cart,
}: {
  isOpen: boolean;
  onClose: () => void;
  additionalServices: ServiceItem[];
  addItemBySelectedVariantId: (serviceId: string, variantIdAsValue: {}) => void;
  cart: any;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={700}>
        <ModalHeader color={"blue.700"} fontWeight={700}>
          Ask Additional required service.
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight={600}>
            Show warning text if they skip required additional service they must
            understand consequence
          </Text>
          <Box my={7}>
            {additionalServices.map((service: ServiceItem, key: number) => {
              return (
                <Box
                  mb={2}
                  key={key}
                  p={3}
                  border={"1px"}
                  borderRadius={"4px"}
                  w="full"
                >
                  <Text>{service.itemData.name}</Text>
                  <VStack w="full" gap={0} fontSize="14px">
                    {cart != null && (
                      <ChoiceList
                        name={service.id}
                        setValue={addItemBySelectedVariantId}
                        value={setSelectedKey(
                          cart.find(
                            (cartItem: CartModel) =>
                              cartItem.serviceId === service.id
                          )?.variantId
                        )}
                        choices={service.itemData.variations.map(
                          (variation) => {
                            return {
                              id: variation.itemVariationData.itemId,
                              type: variation.itemVariationData.name,
                              choice: variation.id,
                              data: variation.itemVariationData,
                            };
                          }
                        )}
                      />
                    )}
                  </VStack>
                </Box>
              );
            })}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
