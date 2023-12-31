import { CalendarMonthType } from "@lib/square/data/types";
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
  selectedDate,
  setSelectedDate,
  hidePastDays = true,
}: {
  selectedDate: CalendarMonthType;
  setSelectedDate: (pickedDate: CalendarMonthType) => void;
  hidePastDays?: boolean;
}) => {
  let day = 0;
  let canIncrease = false;
  const nextMonth = () => {
    const newDate = new Date(selectedDate.year, selectedDate.month, 1);
    // Decrease the month by one
    newDate.setMonth(newDate.getMonth() + 1);

    const nextMonth = {
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
      day: newDate.getDate(),
    };
    setSelectedDate(nextMonth);
  };

  const prevMonth = () => {
    const newDate = new Date(selectedDate.year, selectedDate.month, 1);
    // Decrease the month by one
    newDate.setMonth(newDate.getMonth() - 1);
    const prevMonth = {
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
      day: newDate.getDate(),
    };
    setSelectedDate(prevMonth);
  };

  const getDayOfMonth = (weekDay: number, weekNumber: number) => {
    const firstDay = new Date(selectedDate.year, selectedDate.month, 1);
    const firstDayWeekDay = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

    if (weekDay === firstDayWeekDay && weekNumber === 1) {
      canIncrease = true;
    }
    if (canIncrease) day++;
    const lastDayOfMonth = new Date(
      selectedDate.year,
      selectedDate.month,
      0
    ).getDate();

    if (hidePastDays) {
      const calculatedDay = new Date(
        selectedDate.year,
        selectedDate.month,
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
        color={day == selectedDate.day ? "white" : "green.500"}
        bg={day == selectedDate.day ? "green.500" : "white"}
        borderRadius={"50%"}
        border="1px"
        borderColor={"green.500"}
        onClick={() => {
          setSelectedDate({
            year: selectedDate.year,
            month: selectedDate.month,
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
        <Box>{getMonthName(selectedDate.month) + " " + selectedDate.year}</Box>
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
