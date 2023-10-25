"use client";

import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQueryRevenue } from "@lib/square/data/hooks";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { RevenueLinegraph } from "./RevenueLinegraph";

interface StatsCardProps {
  title: string;
  stat: string;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <StatLabel fontWeight={"medium"} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

export default function RevenueStats() {
  const monthlyRevenue = useQueryRevenue({
    beginTime: startOfMonth(new Date()).toISOString(),
    endTime: endOfMonth(new Date()).toISOString(),
  });
  const weeklyRevenue = useQueryRevenue({
    beginTime: startOfWeek(new Date()).toISOString(),
    endTime: endOfWeek(new Date()).toISOString(),
  });
  const dailyRevenue = useQueryRevenue({
    beginTime: startOfDay(new Date()).toISOString(),
    endTime: endOfDay(new Date()).toISOString(),
  });
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        What about our revenue stats?
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Monthly revenue"}
          stat={`${monthlyRevenue.data?.revenue ?? 0} ${
            monthlyRevenue.data?.currency ?? ""
          }`}
        />
        <StatsCard
          title={"Weekly revenue"}
          stat={`${weeklyRevenue.data?.revenue ?? 0} ${
            weeklyRevenue.data?.currency ?? ""
          }`}
        />
        <StatsCard
          title={"Daily revenue"}
          stat={`${dailyRevenue.data?.revenue ?? 0} ${
            dailyRevenue.data?.currency ?? ""
          }`}
        />
      </SimpleGrid>
      <RevenueLinegraph />
    </Box>
  );
}