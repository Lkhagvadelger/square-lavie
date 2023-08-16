import {
  Box,
  Text,
  BoxProps,
  Heading,
  HStack,
  useColorModeValue,
  VStack,
  Icon,
  Table,
  Tr,
  Td,
  Button,
  Flex,
  Tbody,
} from "@ui/index";
import { last } from "lodash";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
const getMonthName = (date: string) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[date.split("-").map(Number)[1] - 1];
};
export const Calendar = ({
  month,
  onDatePicked,
}: {
  month: string;
  onDatePicked: () => void;
}) => {
  let day = 0;
  let canIncrease = false;
  const [selectedMonth, setSelectedMonth] = useState(month);
  const getYear = () => {
    return selectedMonth.split("-").map(Number)[0];
  };
  const getMonth = () => {
    return selectedMonth.split("-").map(Number)[1];
  };
  const nextMonth = () => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const newMonth = (month % 12) + 1;
    const newYear = year + Math.floor((month + 1) / 12);
    setSelectedMonth(`${newYear}-${String(newMonth).padStart(2, "0")}`);
  };

  const prevMonth = () => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const newMonth = ((month - 2 + 12) % 12) + 1;
    const newYear = year + Math.floor((month - 1) / 12);
    setSelectedMonth(`${newYear}-${String(newMonth).padStart(2, "0")}`);
  };

  const getDayOfMonth = (weekDay: number, weekNumber: number) => {
    const firstDay = new Date(getYear(), getMonth() - 1, 1);
    const firstDayWeekDay = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

    if (weekDay === firstDayWeekDay && weekNumber === 1) {
      canIncrease = true;
    }
    if (canIncrease) day++;
    const lastDayOfMonth = new Date(getYear(), getMonth(), 0).getDate();

    if (day == lastDayOfMonth) {
      canIncrease = false;
      day = 0;
      return lastDayOfMonth;
    }
    if (day <= lastDayOfMonth) return day;
    console.log(lastDayOfMonth);
    return "";
  };
  return (
    <Box w="full">
      <Flex direction="row" w="full" justifyContent={"space-between"}>
        <Box>
          <Button onClick={prevMonth} fontSize="24px" textAlign={"left"}>
            <Icon as={BsChevronLeft} />
          </Button>
        </Box>
        <Box>{getMonthName(selectedMonth)}</Box>
        <Box>
          <Button onClick={nextMonth} fontSize="24px" textAlign={"right"}>
            <Icon as={BsChevronRight} />
          </Button>
        </Box>
      </Flex>
      <Box>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td>Sun</Td>
              <Td>Mon</Td>
              <Td>Tue</Td>
              <Td>Wed</Td>
              <Td>Thu</Td>
              <Td>Fri</Td>
              <Td>Sat</Td>
            </Tr>
            {[1, 2, 3, 4, 5].map((week: number, key) => {
              return (
                <Tr key={key}>
                  <Td>{getDayOfMonth(0, week)}</Td>
                  <Td>{getDayOfMonth(1, week)}</Td>
                  <Td>{getDayOfMonth(2, week)}</Td>
                  <Td>{getDayOfMonth(3, week)}</Td>
                  <Td>{getDayOfMonth(4, week)}</Td>
                  <Td>{getDayOfMonth(5, week)}</Td>
                  <Td>{getDayOfMonth(6, week)}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
