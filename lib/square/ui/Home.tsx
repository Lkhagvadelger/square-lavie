import {
  AppLayout,
  Box,
  Flex,
  HStack,
  Icon,
  Skeleton,
  Stack,
  Text,
  toaster,
  useDisclosure,
  VStack,
} from "@ui/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsChevronRight, BsReceiptCutoff } from "react-icons/bs";
import { displayServicePrice, setSelectedKey } from "../api/service";
import { useGetServices, useLocalStorage } from "../data/hooks";
import { CartModel, ItemVariation, ServiceItem } from "../data/types";
import { AdditionalService } from "./AdditionalService";
import { ChoiceList } from "./ChoiceList";
import { FloatingCart } from "./FloatingCart";
import { SkeletonLoading } from "./SkeletonLoading";

export const Home = ({ locationId }: { locationId: string }) => {
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const { data, isLoading } = useGetServices(locationId);
  const router = useRouter();
  const goToCalendar = () => {
    if (total.totalItems == 0) {
      onOpen();
      return;
    }
    router.push("/square/" + locationId + "/date");
  };
  // removal gel polish, removal acrylic, dip
  // if this IDs are not selected in the cart we should ask they did it intentionally
  // or tell them what will cost to them
  const mustAskServiceIds = [
    "XPOMIFUBDR4XMOZWGV44ZJKE",
    "RL3GOHPQWBJHKWENFD3GHKDU",
    "MF6RGWC2HAH6ZDH32BPUXTFZ",
  ];
  const [mustAskServices, setMustAskServices] = useState<ServiceItem[]>([]);
  const [cart, setCart] = useLocalStorage("cart", []);
  const [total, setTotal] = useState({ totalPrice: 0, totalItems: 0 });

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
      teamMemberIds: serviceVariant.itemVariationData.teamMemberIds,
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

  return (
    <AppLayout>
      <>
        {isLoading ? (
          <SkeletonLoading />
        ) : (
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
        )}
        <FloatingCart goToCalendar={goToCalendar} total={total} />
        <AdditionalService onClose={onClose} isOpen={isOpen} />
      </>
    </AppLayout>
  );
};
