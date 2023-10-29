// import {
//   AppLayout,
//   Box,
//   Text,
//   toaster,
//   useDisclosure,
//   VStack,
// } from "@ui/index";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { setSelectedKey } from "../api/service";
// import { useGetServices, useLocalStorage } from "../data/hooks";
// import {
//   CartModel,
//   ItemVariation,
//   RequiredServiceType,
//   ServiceItem,
// } from "../data/types";
// import { AdditionalService } from "./components/AdditionalService";
// import { ChoiceList } from "./components/ChoiceList";
// import { FloatingCart } from "./components/FloatingCart";
// import { SkeletonLoading } from "./components/SkeletonLoading";

// export const Home_Old = ({ locationId }: { locationId: string }) => {
//   const { isOpen, onClose, onOpen } = useDisclosure();
//   const { data, isLoading } = useGetServices(locationId);
//   const router = useRouter();
//   const goToCalendar = () => {
//     if (total.totalItems == 0) {
//       return;
//     }
//     //if mustAskServices still includes mustAskServiceIds then call onOpen
//     if (mustAskServices.length > 0) {
//       onOpen();
//       return;
//     }

//     router.push("/square/" + locationId + "/date");
//   };
//   const answerRequiredServiceAnsweredTrue = (
//     answerRequiredServiceId: string
//   ) => {
//     if (data) {
//       //update specialServices
//       const specialServicesFiltered = specialServices.map((service) => {
//         if (service.answerRequiredServiceId === answerRequiredServiceId) {
//           return { ...service, answerRequiredServiceAnswered: true };
//         } else return service;
//       });

//       setSpecialServices(specialServicesFiltered);
//       //add to mustAskServices from specialServices that is answerRequiredServiceAnswered equals false
//       const mustAskServicesFiltered = specialServicesFiltered
//         .filter(
//           (service) =>
//             service.answerRequiredServiceAnswered === false &&
//             service.isServiceSelected === true
//         )
//         .map((service) => {
//           return data.find(
//             (item) => item.id === service.answerRequiredServiceId
//           );
//         })
//         .filter((item) => item !== undefined) as ServiceItem[];
//       const uniqueMustAskServicesFiltered = mustAskServicesFiltered.reduce(
//         (accumulator: any[], currentService: ServiceItem) => {
//           const found = accumulator.some(
//             (service: ServiceItem) => service.id === currentService.id
//           );
//           if (!found) {
//             accumulator.push(currentService);
//           }
//           return accumulator;
//         },
//         []
//       );
//       setMustAskServices(uniqueMustAskServicesFiltered);
//     }
//   };
//   const [specialServices, setSpecialServices] = useState<RequiredServiceType[]>(
//     [
//       {
//         isServiceSelected: false,
//         serviceId: "46VW5CV5N7FEFETBWFRUWCMU",
//         serviceName: "Basic manicure",
//         answerRequiredServiceId: "XPOMIFUBDR4XMOZWGV44ZJKE",
//         answerRequiredServiceAnswered: false,
//       },
//       {
//         isServiceSelected: false,
//         serviceId: "ZGYJZBNCF7UOH7QOC6IM4YGU",
//         serviceName: "Select manicure",
//         answerRequiredServiceId: "XPOMIFUBDR4XMOZWGV44ZJKE",
//         answerRequiredServiceAnswered: false,
//       },
//       {
//         isServiceSelected: false,
//         serviceId: "OP5RTYNTZ4TRHSII2KQQOB6E",
//         serviceName: "Luxe manicure",
//         answerRequiredServiceId: "XPOMIFUBDR4XMOZWGV44ZJKE",
//         answerRequiredServiceAnswered: false,
//       },
//     ]
//   );
//   //Unanswered services will be listed in here. Data will be shown in Confirmation Modal
//   const [mustAskServices, setMustAskServices] = useState<ServiceItem[]>([]);
//   const [cart, setCart] = useLocalStorage("cart", []);
//   const [total, setTotal] = useState({ totalPrice: 0, totalItems: 0 });

//   const addItemBySelectedVariantId = (
//     serviceId: string,
//     variantIdAsValue: {}
//   ) => {
//     //get first key name from variantId
//     const variantIdKey = Object.keys(variantIdAsValue)[0];
//     // search by service id is service in the list
//     const service = data?.find((service) => service.id === serviceId);
//     // this is remove action, if variantIdKey is undefined
//     if (variantIdAsValue === "undefined" || variantIdKey === undefined) {
//       removeServiceByServiceIdFromCart(serviceId);
//       return;
//     }
//     //Search by variant Id
//     const serviceVariant = service?.itemData.variations
//       .flat()
//       .find((variant) => variant.id === variantIdKey);

//     if (serviceVariant && service) {
//       addSelectedVariantToCart(serviceVariant, service);
//     }
//   };
//   const removeServiceByServiceIdFromCart = (serviceId: string) => {
//     const index = cart.findIndex(
//       (item: CartModel) => item.serviceId === serviceId
//     );

//     if (index !== -1) {
//       const newCart = [...cart];
//       newCart.splice(index, 1);
//       setCart(newCart);
//     }
//   };
//   const addSelectedVariantToCart = (
//     serviceVariant: ItemVariation,
//     serviceItem: ServiceItem
//   ) => {
//     const cartItem: CartModel = {
//       serviceId: serviceVariant.itemVariationData.itemId,
//       variantId: serviceVariant.id,
//       serviceCategoryId: serviceItem.itemData.categoryId,
//       name: `${serviceVariant.itemVariationData.name}${
//         " - " + serviceItem.itemData.name
//       }`,
//       price: serviceVariant.itemVariationData.priceMoney.amount as any,
//       quantity: 1,
//       teamMemberIds: serviceVariant.itemVariationData.teamMemberIds,
//     };
//     const cartItemIndex = cart.findIndex(
//       (item: { id: string }) => item.id === cartItem.variantId
//     );

//     if (cartItemIndex === -1) {
//       const indexToDelete = cart.findIndex(
//         (item: CartModel) => item.serviceId === cartItem.serviceId
//       );

//       if (indexToDelete !== -1) {
//         const newCart = [...cart];
//         newCart.splice(indexToDelete, 1);
//         setCart([...newCart, cartItem]);
//       } else setCart([...cart, cartItem]);
//     }
//     toaster.info("Added to cart");
//     //remove if service already select in cart
//   };
//   useEffect(() => {
//     if (cart != null) {
//       updateMustAskServices();
//       return setTotal({
//         totalPrice: !cart
//           ? 0
//           : cart.reduce(
//               (acc: number, item: { price: number; quantity: number }) =>
//                 acc + item.price * item.quantity,
//               0
//             ),
//         totalItems: !cart
//           ? 0
//           : cart.reduce(
//               (acc: number, item: { quantity: number }) => acc + item.quantity,
//               0
//             ),
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [cart, data]);

//   const updateMustAskServices = () => {
//     if (data) {
//       //if cart Items included specialServiceIds than set isServiceSelected to true
//       const specialServicesFiltered = specialServices.map((service) => {
//         if (
//           cart.some(
//             (cartItem: CartModel) => cartItem.serviceId === service.serviceId
//           )
//         ) {
//           return { ...service, isServiceSelected: true };
//         } else return { ...service, isServiceSelected: false };
//       });
//       const specialServicesAnswerFiltered = specialServicesFiltered.map(
//         (service) => {
//           if (
//             cart.some(
//               (cartItem: CartModel) =>
//                 cartItem.serviceId === service.answerRequiredServiceId
//             )
//           ) {
//             return { ...service, answerRequiredServiceAnswered: true };
//           } else return { ...service, answerRequiredServiceAnswered: false };
//         }
//       );
//       //if cart Items included answerRequiredServiceId than set answerRequiredServiceAnswered to true
//       setSpecialServices(specialServicesAnswerFiltered);

//       //add to mustAskServices from specialServices that is answerRequiredServiceAnswered equals false
//       const mustAskServicesFiltered = specialServicesAnswerFiltered
//         .filter(
//           (service) =>
//             service.answerRequiredServiceAnswered === false &&
//             service.isServiceSelected === true
//         )
//         .map((service) => {
//           return data.find(
//             (item) => item.id === service.answerRequiredServiceId
//           );
//         })
//         .filter((item) => item !== undefined) as ServiceItem[];
//       const uniqueMustAskServicesFiltered = mustAskServicesFiltered.reduce(
//         (accumulator: any[], currentService: ServiceItem) => {
//           const found = accumulator.some(
//             (service: ServiceItem) => service.id === currentService.id
//           );
//           if (!found) {
//             accumulator.push(currentService);
//           }
//           return accumulator;
//         },
//         []
//       );
//       setMustAskServices(uniqueMustAskServicesFiltered);
//     }
//   };
//   return (
//     <AppLayout>
//       <>
//         {isLoading ? (
//           <SkeletonLoading />
//         ) : (
//           <Box p={2} pb={32}>
//             {data?.map &&
//               data?.map((service: ServiceItem, key: number) => {
//                 return (
//                   <Box
//                     mb={2}
//                     key={key}
//                     p={3}
//                     border={"1px"}
//                     borderRadius={"4px"}
//                     w="full"
//                   >
//                     <Text>{service.itemData.name}</Text>
//                     <VStack w="full" gap={0} fontSize="14px">
//                       {cart != null && (
//                         <ChoiceList
//                           name={service.id}
//                           setValue={addItemBySelectedVariantId}
//                           value={setSelectedKey(
//                             cart?.find(
//                               (cartItem: CartModel) =>
//                                 cartItem.serviceId === service.id
//                             )?.variantId
//                           )}
//                           choices={service.itemData.variations.map(
//                             (variation) => {
//                               return {
//                                 id: variation.itemVariationData.itemId,
//                                 type: variation.itemVariationData.name,
//                                 choice: variation.id,
//                                 data: variation.itemVariationData,
//                               };
//                             }
//                           )}
//                         />
//                       )}
//                     </VStack>
//                   </Box>
//                 );
//               })}
//           </Box>
//         )}
//         <FloatingCart goToCalendar={goToCalendar} total={total} />
//         <AdditionalService
//           cart={cart}
//           onClose={onClose}
//           isOpen={isOpen}
//           additionalServices={mustAskServices}
//           addItemBySelectedVariantId={addItemBySelectedVariantId}
//           answerRequiredServiceAnsweredTrue={answerRequiredServiceAnsweredTrue}
//           goNext={goToCalendar}
//         />
//       </>
//     </AppLayout>
//   );
// };
