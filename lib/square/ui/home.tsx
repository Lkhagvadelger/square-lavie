import { useEffect, useState } from "react";
import { useGetServices, useLocalStorage } from "../data/hooks";
import { ItemVariation } from "../data/types";
import { useRouter } from "next/router";
import {
  AppLayout,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  toaster,
  VStack,
} from "@ui/index";
import { groupBy } from "lodash";
import { MdArrowRight, MdArrowRightAlt, MdInfoOutline } from "react-icons/md";
import { ChoiceList } from "./ChoiceList";
import { FaArrowRight, FaReceipt } from "react-icons/fa";
import {
  BsArrowRight,
  BsChevronRight,
  BsReceipt,
  BsReceiptCutoff,
} from "react-icons/bs";
// serviceId: serviceVariant.itemVariationData.itemId,
// variantId: serviceVariant.id,
// name: serviceVariant.itemVariationData.name,
// price: serviceVariant.itemVariationData.priceMoney.amount,
// quantity: 1,
type CartModel = {
  serviceId: string;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
};
export const Home = ({ locationId }: { locationId: string }) => {
  const { data, isLoading } = useGetServices();
  // removal gel polish, removal acrylic, dip
  const mustAskServiceIds = [
    "XPOMIFUBDR4XMOZWGV44ZJKE",
    "RL3GOHPQWBJHKWENFD3GHKDU",
    "MF6RGWC2HAH6ZDH32BPUXTFZ",
  ];
  const [mustAskServices, setMustAskServices] = useState<ServiceItem[]>([]);
  const [cart, setCart] = useLocalStorage("cart", []);
  const [total, setTotal] = useState({ totalPrice: 0, totalItems: 0 });
  const isOneOfVariantSelected = (variantIds: string[]) => {
    return variantIds.some((variantId) => {
      return cart.some((item: any) => item.id === variantId)
        ? variantId
        : undefined;
    });
  };
  const addItemBySelectedVariantId = (
    serviceId: string,
    variantIdAsValue: {}
  ) => {
    //get first key name from variantId
    const variantIdKey = Object.keys(variantIdAsValue)[0];

    // search by service id is service in the list
    const service = data?.find((service) => service.id === serviceId);
    // this is remove action, if variantIdKey is undefined
    if (variantIdAsValue === "undefined" || variantIdKey === undefined) {
      removeServiceByServiceIdFromCart(serviceId);
      return;
    }
    //Search by variant Id
    const serviceVariant = service?.itemData.variations
      .flat()
      .find((variant) => variant.id === variantIdKey);

    if (serviceVariant) {
      addSelectedVariantToCart(serviceVariant);
    }
  };
  const removeServiceByServiceIdFromCart = (serviceId: string) => {
    const index = cart.findIndex(
      (item: CartModel) => item.serviceId === serviceId
    );

    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };
  const addSelectedVariantToCart = (serviceVariant: ItemVariation) => {
    const cartItem: CartModel = {
      serviceId: serviceVariant.itemVariationData.itemId,
      variantId: serviceVariant.id,
      name: serviceVariant.itemVariationData.name,
      price: serviceVariant.itemVariationData.priceMoney.amount as any,
      quantity: 1,
    };
    const cartItemIndex = cart.findIndex(
      (item: { id: string }) => item.id === cartItem.variantId
    );

    if (cartItemIndex === -1) {
      const indexToDelete = cart.findIndex(
        (item: CartModel) => item.serviceId === cartItem.serviceId
      );

      if (indexToDelete !== -1) {
        const newCart = [...cart];
        newCart.splice(indexToDelete, 1);
        setCart(newCart);
        setCart([...newCart, cartItem]);
      } else setCart([...cart, cartItem]);
    }
    toaster.info("Added to cart");
  };
  useEffect(() => {
    return setTotal({
      totalPrice: cart.reduce(
        (acc: number, item: { price: number; quantity: number }) =>
          acc + item.price * item.quantity,
        0
      ),
      totalItems: cart.reduce(
        (acc: number, item: { quantity: number }) => acc + item.quantity,
        0
      ),
    });
  }, [cart]);
  useEffect(() => {
    if (data) {
      const mustAskServices = data.filter((service) =>
        mustAskServiceIds.includes(service.id)
      );
      setMustAskServices(mustAskServices);
    }
  }, [data]);
  console.log(mustAskServices);
  return (
    <AppLayout>
      <>
        <Box p={2} pb={32}>
          {data?.map((service: ServiceItem, key: number) => {
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
                  <ChoiceList
                    name={service.id}
                    setValue={addItemBySelectedVariantId}
                    value={setSelectedKey(
                      cart?.find(
                        (cartItem: CartModel) =>
                          cartItem.serviceId === service.id
                      )?.variantId
                    )}
                    choices={service.itemData.variations.map((variation) => {
                      return {
                        id: variation.itemVariationData.itemId,
                        type: variation.itemVariationData.name,
                        choice: variation.id,
                        data: variation.itemVariationData,
                      };
                    })}
                  />
                </VStack>
              </Box>
            );
          })}
        </Box>
        <Box
          p={4}
          top={"calc(100% - 130px)"}
          pos={"fixed"}
          w={"full"}
          zIndex="101"
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
              <Text flexGrow={1} fontSize="32px" pt={2} textAlign={"right"}>
                <Icon as={BsChevronRight} />
              </Text>
            </Flex>
          </HStack>
        </Box>
      </>
    </AppLayout>
  );
};
type ServiceItem = {
  type: string;
  id: string;
  updatedAt: string;
  version: string;
  isDeleted: boolean;
  presentAtAllLocations: boolean;
  itemData: {
    name: string;
    abbreviation: string;
    labelColor: string;
    categoryId: string;
    taxIds: string[];
    variations: ItemVariation[];
    productType: string;
    skipModifierScreen: boolean;
  };
};
export const displayServiceDuration = (serviceDuration: number) => {
  const minutes = serviceDuration / 1000 / 60;
  return `${minutes} minutes`;
};
export const displayServicePrice = (price: number) => {
  return `$${price / 100}.00`;
};
const setSelectedKey = (variantKey?: string) => {
  if (!variantKey) return {};
  var obj: any = {};
  obj[variantKey] = variantKey;
  return obj;
};
