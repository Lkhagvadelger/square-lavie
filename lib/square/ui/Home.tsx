// import {
//   Box,
//   Button,
//   Image,
//   ButtonGroup,
//   Flex,
//   IconButton,
//   Menu,
//   MenuButton,
//   MenuDivider,
//   MenuGroup,
//   MenuItem,
//   MenuList,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Text,
//   toaster,
//   useDisclosure,
//   VStack,
//   useSteps,
// } from "@ui/index";
// import { useRouter } from "next/router";
// import { useEffect, useMemo, useRef, useState } from "react";
// import { setSelectedKey } from "../api/service";
// import { useGetCatalogs, useGetServices, useLocalStorage } from "../data/hooks";
// import {
//   CartModel,
//   ChoicesType,
//   ItemVariation,
//   RequiredServiceType,
//   ServiceItem,
//   CalendarMonthType,
// } from "../data/types";
// import { AdditionalService } from "./components/AdditionalService";
// import { ChoiceList } from "./components/ChoiceList";
// import { FloatingCart } from "./components/FloatingCart";
// import { SkeletonLoading } from "./components/SkeletonLoading";
// import _ from "lodash";
// import { IoArrowDownCircleOutline } from "react-icons/io5";
// import { BsChevronBarDown } from "react-icons/bs";
// import { BiChevronDown, BiX } from "react-icons/bi";
// import { PersonChoiceList } from "./components/PersonChoiceList";
// import {
//   AdminChatMessageBox,
//   UserChatMessageBox,
// } from "./components/ChatTextBox";
// import { CalendarRow } from "./components/CalendarRow";
// import { ChatPageType, DatePage, DatePageType } from "./DatePage";
// import { useForm } from "react-hook-form";
// import next from "next";

// export const Home = ({ locationId }: { locationId: string }) => {
//   const {
//     getValues,
//     setValue,
//     formState: { errors },
//   } = useForm<ChatPageType>({
//     defaultValues: {
//       selectedDate: {
//         year: new Date().getFullYear(),
//         month: new Date().getMonth(),
//         day: new Date().getDate(),
//       },
//       selectedVariantIds: [],
//       isSecondBookingRequired: false,
//     },
//   });
//   const { isOpen, onClose, onOpen } = useDisclosure();
//   const { data, isLoading } = useGetServices(locationId);
//   const categoryToHide = "6KFSXPVFALGRCVN4FD3NN4DI";
//   const { data: dataCatalog, isLoading: isLoadingCatalog } =
//     useGetCatalogs(locationId);
//   const {
//     nextStep,
//     prevStep,
//     reset: resetStep,
//     activeStep,
//   } = useSteps({
//     initialStep: 5,
//   });

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
//   const memorizedItems = useMemo(() => {
//     return _.groupBy(
//       data?.filter((r) => r.itemData?.categoryId !== categoryToHide),
//       (r) => {
//         return r.itemData.categoryId;
//       }
//     );
//   }, [data]);

//   const [totalCustomer, setTotalCustomer] = useState<ChoicesType>({
//     id: "1",
//     type: "1",
//     choice: "1",
//   });
//   //Unanswered services will be listed in here. Data will be shown in Confirmation Modal
//   const [mustAskServices, setMustAskServices] = useState<ServiceItem[]>([]);
//   const [cart, setCart] = useLocalStorage("cart", []);
//   const [total, setTotal] = useState({ totalPrice: 0, totalItems: 0 });
//   const setSelectedDate = (selectedDate: CalendarMonthType) => {
//     setValue("selectedDate", selectedDate);
//   };

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
//   const messageEl = useRef<any>(null);
//   useEffect(() => {
//     if (messageEl) {
//       messageEl.current?.addEventListener("DOMNodeInserted", (event: any) => {
//         const { currentTarget: target } = event;
//         target.scroll({ top: target.scrollHeight, behavior: "smooth" });
//       });
//     }
//   }, []);
//   return (
//     <VStack flex="1" bg="#fff" w="full">
//       <VStack height={"full"} flex={1} w="full" align={"center"}>
//         <Box mb={"auto"}>Top</Box>
//         <Box mt={"auto"} p="2" w="full">
//           {isLoading ? (
//             <SkeletonLoading />
//           ) : (
//             <VStack flex="1" w="full" gap={1}>
//               {activeStep >= 1 && (
//                 <>
//                   <AdminChatMessageBox text={"Greetings"} />
//                   <AdminChatMessageBox text={"How many people?"} />
//                   <Flex alignSelf={"start"} w="full">
//                     <Image
//                       borderRadius={"50%"}
//                       border="1px"
//                       h="7"
//                       src="/images/original.jpeg"
//                       alt=""
//                       mt="auto"
//                       mr="1"
//                     />
//                     <Box
//                       w="90%"
//                       px={2}
//                       pt={2}
//                       bg="#f1f1f1"
//                       borderRadius={"16px"}
//                       alignSelf="start"
//                       borderBottomLeftRadius="0px"
//                     >
//                       <Box gap={0}>
//                         {cart != null && (
//                           <PersonChoiceList
//                             name={"totalCustomer"}
//                             setValue={setTotalCustomer}
//                             value={totalCustomer}
//                             choices={[
//                               { id: "1", type: "1", choice: "Only me" },
//                               {
//                                 id: "2",
//                                 type: "2",
//                                 choice: "with 1 friend (2 people)",
//                               },
//                               {
//                                 id: "3",
//                                 type: "3",
//                                 choice: "with 2 friends (3 people)",
//                               },
//                               {
//                                 id: "4",
//                                 type: "4",
//                                 choice: "with 3 friends (4 people)",
//                               },
//                             ]}
//                           />
//                         )}
//                       </Box>
//                     </Box>
//                   </Flex>
//                 </>
//               )}
//               {activeStep >= 2 && (
//                 <>
//                   <UserChatMessageBox text={"Show services"} />
//                 </>
//               )}
//               {activeStep >= 3 && (
//                 <>
//                   <AdminChatMessageBox
//                     text={"Please select service for First person"}
//                   />
//                   <Flex alignSelf={"start"} w="full" gap={0}>
//                     <Image
//                       borderRadius={"50%"}
//                       border="1px"
//                       h="7"
//                       src="/images/original.jpeg"
//                       alt=""
//                       mt="auto"
//                       mr="1"
//                     />
//                     <Tabs
//                       alignSelf={"start"}
//                       w="90%"
//                       variant={"topbordered"}
//                       flexDirection="column"
//                       flex="1"
//                       pt={0}
//                     >
//                       <TabPanels pt={0}>
//                         {Object.keys(memorizedItems).map((key) => {
//                           return (
//                             <TabPanel key={key}>
//                               {memorizedItems[key].map(
//                                 (service: ServiceItem, key) => {
//                                   return (
//                                     <Box
//                                       mb={2}
//                                       key={key}
//                                       px={2}
//                                       pt={2}
//                                       bg="#f1f1f1"
//                                       borderRadius={"16px"}
//                                       _last={{
//                                         borderBottomLeftRadius: "0px",
//                                       }}
//                                     >
//                                       <Text
//                                         pl={2}
//                                         py={1}
//                                         fontSize={"12px"}
//                                         textTransform="uppercase"
//                                       >
//                                         {service.itemData.name}
//                                       </Text>
//                                       <Box gap={0}>
//                                         {cart != null && (
//                                           <ChoiceList
//                                             name={service.id}
//                                             setValue={
//                                               addItemBySelectedVariantId
//                                             }
//                                             value={setSelectedKey(
//                                               cart?.find(
//                                                 (cartItem: CartModel) =>
//                                                   cartItem.serviceId ===
//                                                   service.id
//                                               )?.variantId
//                                             )}
//                                             choices={service.itemData.variations.map(
//                                               (variation) => {
//                                                 return {
//                                                   id: variation
//                                                     .itemVariationData.itemId,
//                                                   type: variation
//                                                     .itemVariationData.name,
//                                                   choice: variation.id,
//                                                   data: variation.itemVariationData,
//                                                 };
//                                               }
//                                             )}
//                                           />
//                                         )}
//                                       </Box>
//                                     </Box>
//                                   );
//                                 }
//                               )}
//                             </TabPanel>
//                           );
//                         })}
//                       </TabPanels>
//                       <TabList>
//                         {memorizedItems &&
//                           Object.keys(memorizedItems).map((key) => {
//                             return (
//                               <Tab key={key}>
//                                 {
//                                   dataCatalog?.filter((r) => r.id == key)[0]
//                                     .categoryData?.name
//                                 }
//                               </Tab>
//                             );
//                           })}
//                       </TabList>
//                     </Tabs>
//                   </Flex>
//                 </>
//               )}
//               {activeStep >= 4 && (
//                 <>
//                   <UserChatMessageBox text={"Show available date"} />
//                 </>
//               )}
//               {activeStep >= 5 && (
//                 <>
//                   <AdminChatMessageBox text={"Please select your date"} />
//                 </>
//               )}
//               {activeStep >= 6 && (
//                 <>
//                   <DatePage locationId={locationId} />
//                 </>
//               )}
//             </VStack>
//           )}
//           <Flex
//             flex="1"
//             mt={4}
//             p={2}
//             w="full"
//             bg="#f1f1f1"
//             h="80px"
//             borderRadius={"16px"}
//             ref={messageEl}
//           >
//             <ButtonGroup
//               ml="auto"
//               size="sm"
//               border="0px"
//               color="#fff"
//               isAttached
//             >
//               <Button
//                 onClick={nextStep}
//                 border="0px"
//                 bg="#222222"
//                 borderRadius={"12px"}
//                 _hover={{
//                   bg: "#181818",
//                 }}
//               >
//                 Next
//               </Button>
//               <Menu>
//                 <MenuButton
//                   border="0px"
//                   as={IconButton}
//                   px={3}
//                   bg="#222222"
//                   icon={<BiChevronDown />}
//                   borderRadius={"12px"}
//                   _hover={{
//                     bg: "#181818",
//                   }}
//                 ></MenuButton>
//                 <MenuList color="black">
//                   <MenuGroup title="Appointment">
//                     <MenuItem>Start Over</MenuItem>
//                     <MenuItem>Show Services</MenuItem>
//                     <MenuItem>Pick date</MenuItem>
//                     <MenuItem>Confirm Appointment</MenuItem>
//                   </MenuGroup>
//                   <MenuDivider />
//                   <MenuGroup title="Account">
//                     <MenuItem>Login</MenuItem>
//                   </MenuGroup>
//                 </MenuList>
//               </Menu>
//             </ButtonGroup>
//           </Flex>
//         </Box>
//       </VStack>
//     </VStack>
//   );
// };
