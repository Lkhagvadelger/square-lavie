// "use client";

// import {
//   Box,
//   chakra,
//   SimpleGrid,
//   Stack,
//   Text,
//   useColorModeValue,
//   Heading,
//   HStack,
// } from "@chakra-ui/react";
// import { useQueryRevenue, useRetentionRate } from "@lib/square/data/hooks";
// import {
//   endOfDay,
//   endOfMonth,
//   endOfWeek,
//   startOfDay,
//   startOfMonth,
//   startOfWeek,
// } from "date-fns";
// import { RevenueLinegraph } from "./RevenueLinegraph";
// import { BsArrowUp } from "react-icons/bs";
// import { trpc } from "@util/trpc";

// interface Props {
//   label: string;
//   value: string;
//   up?: string;
//   down?: string;
// }
// export const Stat = (props: Props) => {
//   const { label, value, up, down, ...boxProps } = props;
//   return (
//     <Box
//       px={{ base: "4", md: "6" }}
//       py={{ base: "5", md: "6" }}
//       bg="bg.surface"
//       borderRadius="lg"
//       boxShadow="lg"
//       {...boxProps}
//     >
//       <Stack>
//         <Text textStyle="sm" color="fg.muted">
//           {label}
//         </Text>
//         <HStack>
//           <Heading size={{ base: "sm", md: "md" }}>{value}</Heading>
//           {up && (
//             <HStack gap={0}>
//               <BsArrowUp color="green" />
//               <Text m={0} color="green">
//                 {up}
//               </Text>
//             </HStack>
//           )}
//         </HStack>
//       </Stack>
//     </Box>
//   );
// };
// export default function RevenueStats() {
//   const data = trpc.hello.hello.useQuery();

//   console.log(data.data?.message);

//   const retentionRate = useRetentionRate({
//     year: new Date().getFullYear(),
//     month: new Date().getMonth(),
//   });
//   const monthlyRevenue = useQueryRevenue({
//     startDate: startOfMonth(new Date()).toISOString(),
//     endDate: endOfMonth(new Date()).toISOString(),
//   });
//   const weeklyRevenue = useQueryRevenue({
//     startDate: startOfWeek(new Date()).toISOString(),
//     endDate: endOfWeek(new Date()).toISOString(),
//   });
//   const dailyRevenue = useQueryRevenue({
//     startDate: startOfDay(new Date()).toISOString(),
//     endDate: endOfDay(new Date()).toISOString(),
//   });
//   return (
//     <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
//       <chakra.h1
//         textAlign={"center"}
//         fontSize={"4xl"}
//         py={10}
//         fontWeight={"bold"}
//       >
//         What about our revenue stats?
//       </chakra.h1>
//       <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
//         <Stat
//           label={"Monthly revenue"}
//           value={`${monthlyRevenue.data?.revenue ?? 0} ${
//             monthlyRevenue.data?.currency ?? ""
//           }`}
//           up={"10%"}
//         />
//         <Stat
//           label={"Weekly revenue"}
//           value={`${weeklyRevenue.data?.revenue ?? 0} ${
//             weeklyRevenue.data?.currency ?? ""
//           }`}
//           up={"10%"}
//         />
//         <Stat
//           label={"Daily revenue"}
//           value={`${dailyRevenue.data?.revenue ?? 0} ${
//             dailyRevenue.data?.currency ?? ""
//           }`}
//           up={"10%"}
//         />
//       </SimpleGrid>
//       <RevenueLinegraph />

//       <chakra.h1
//         textAlign={"center"}
//         fontSize={"4xl"}
//         py={10}
//         fontWeight={"bold"}
//       >
//         What about our client stats?
//       </chakra.h1>

//       <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
//         <Stat
//           label={"Client retention rate"}
//           value={`${Math.round(retentionRate.data?.retentionRate ?? 0)} %`}
//           up={"10%"}
//         />
//         <Stat label={"Client acquisition"} value={`$`} up={"10%"} />
//       </SimpleGrid>
//     </Box>
//   );
// }
