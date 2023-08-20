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
const getMonthName = (month: number) => {
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
  return months[month];
};
export const Calendar = ({
  startMonth,
  onDatePicked,
  hidePastDays = true,
}: {
  startMonth: { year: number; month: number; day: number };
  onDatePicked: ({
    year,
    month,
    day,
  }: {
    year: number;
    month: number;
    day: number;
  }) => void;
  hidePastDays?: boolean;
}) => {
  let day = 0;
  let canIncrease = false;
  const [selectedMonth, setSelectedMonth] = useState(startMonth);
  const nextMonth = () => {
    const newDate = new Date(selectedMonth.year, selectedMonth.month, 1);
    // Decrease the month by one
    newDate.setMonth(newDate.getMonth() + 1);

    setSelectedMonth({
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
      day: newDate.getDate(),
    });
    onDatePicked({
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
      day: newDate.getDate()
    });
  };

  const prevMonth = () => {
    const newDate = new Date(selectedMonth.year, selectedMonth.month, 1);
    // Decrease the month by one
    newDate.setMonth(newDate.getMonth() - 1);

    setSelectedMonth({
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
      day: newDate.getDate(),
    });

    onDatePicked({
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
      day: newDate.getDate()
    });
  };

  const getDayOfMonth = (weekDay: number, weekNumber: number) => {
    const firstDay = new Date(selectedMonth.year, selectedMonth.month, 1);
    const firstDayWeekDay = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

    if (weekDay === firstDayWeekDay && weekNumber === 1) {
      canIncrease = true;
    }
    if (canIncrease) day++;
    const lastDayOfMonth = new Date(
      selectedMonth.year,
      selectedMonth.month,
      0
    ).getDate();

    if (hidePastDays) {
      const calculatedDay = new Date(
        selectedMonth.year,
        selectedMonth.month,
        day + 1
      );
      if (calculatedDay < new Date()) return 0;
    }

    if (day == lastDayOfMonth) {
      canIncrease = false;
      day = 0;
      return lastDayOfMonth;
    }
    if (day <= lastDayOfMonth) return day;
    return -1;
  };
  const btnPicker = (day: number) => {
    return day == 0 ? (
      <Box
        borderRadius={"50%"}
        border="1px"
        borderColor={"green.50"}
        w={"10"}
        h={"10"}
      ></Box>
    ) : (
      <Button
        p={0}
        color={day == selectedMonth.day ? "white" : "green.500"}
        bg={day == selectedMonth.day ? "green.500" : "white"}
        borderRadius={"50%"}
        border="1px"
        borderColor={"green.500"}
        onClick={() => {
          setSelectedMonth({
            year: selectedMonth.year,
            month: selectedMonth.month,
            day: day,
          });
          onDatePicked({
            year: selectedMonth.year,
            month: selectedMonth.month,
            day: day,
          });
        }}
      >
        {day}
      </Button>
    );
  };
  return (
    <Box w="full">
      <Flex direction="row" w="full" justifyContent={"space-between"}>
        <Box>
          <Button onClick={prevMonth} fontSize="24px" textAlign={"left"}>
            <Icon as={BsChevronLeft} />
          </Button>
        </Box>
        <Box>
          {getMonthName(selectedMonth.month) + " " + selectedMonth.year}
        </Box>
        <Box>
          <Button onClick={nextMonth} fontSize="24px" textAlign={"right"}>
            <Icon as={BsChevronRight} />
          </Button>
        </Box>
      </Flex>
      <Box w="full">
        <Table w="full" variant="calendar">
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
                  <Td>{btnPicker(getDayOfMonth(0, week))}</Td>
                  <Td>{btnPicker(getDayOfMonth(1, week))}</Td>
                  <Td>{btnPicker(getDayOfMonth(2, week))}</Td>
                  <Td>{btnPicker(getDayOfMonth(3, week))}</Td>
                  <Td>{btnPicker(getDayOfMonth(4, week))}</Td>
                  <Td>{btnPicker(getDayOfMonth(5, week))}</Td>
                  <Td>{btnPicker(getDayOfMonth(6, week))}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
