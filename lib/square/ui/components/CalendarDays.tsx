import { CalendarMonthType } from "@lib/square/data/types";
import { Box, Button, Flex, Icon, Table, Tbody, Td, Text, Tr } from "@ui/index";
import { useEffect, useState } from "react";
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
export const CalendarDays = ({
  selectedDate,
  setSelectedDate,
  hidePastDays = true,
  dayRange,
  nextClick,
}: {
  selectedDate: CalendarMonthType;
  setSelectedDate: (pickedDate: CalendarMonthType) => void;
  hidePastDays?: boolean;
  dayRange: number;
  nextClick: () => void;
}) => {
  const [data, setData] = useState<any>(null);
  // const [startDate, setStartDate] = useState<Date>();
  // const [dayIndex, setDayIndex] = useState<number>(0);
  // const [thisMonthLastDay, setThisMonthLastDay] = useState<number>(0);

  const dayNameByIndex = {
    0: "Mon",
    1: "Tue",
    2: "Wed",
    3: "Thu",
    4: "Fri",
    5: "Sat",
    6: "Sun",
  };

  const monthNameByIndex = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "April",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  useEffect(() => {
    if (selectedDate) {
      const thisMonthDate = new Date(
        selectedDate.year,
        selectedDate.month + 1,
        0
      );

      let dayIndex = thisMonthDate.getDay();
      const lastDay = thisMonthDate.getDate();
      const thisMonth = thisMonthDate.getMonth() + 1;

      const rawStartDate = new Date(
        selectedDate.year,
        selectedDate.month,
        selectedDate.day
      );

      const tempEndDate = new Date(
        selectedDate.year,
        selectedDate.month,
        selectedDate.day
      );
      tempEndDate.setDate(tempEndDate.getDate() + dayRange);
      const tempEndMonth = tempEndDate.getMonth() + 1;

      console.log(thisMonthDate, "this dAte");
      console.log(tempEndDate, "Temp End date");

      let result: any = [];
      let rawDay = selectedDate.day;
      const rawEndDay = tempEndDate.getDay();

      // until lastDay loop

      console.log(lastDay, "-lastDay");

      const checkDay = lastDay - rawDay;
      const leftDay = lastDay - checkDay;

      console.log(thisMonth, "--this Month");
      console.log(tempEndMonth, "--this temp Month");

      let rawNowMonth: any = {
        name: (monthNameByIndex as any)[thisMonth],
        data: [],
      };

      for (let i = 0; i <= checkDay; i++) {
        rawNowMonth.data.push({
          name: (dayNameByIndex as any)[dayIndex],
          day: rawDay,
        });

        rawDay++;
        dayIndex++;
        if (dayIndex > 6) {
          dayIndex = 0;
        }
      }
      rawDay = 1;

      let rawNextMonth: any = {
        name: (monthNameByIndex as any)[tempEndMonth],
        data: [],
      };

      //start for 1 day to endDate
      for (let i = 1; i < leftDay; i++) {
        rawNextMonth.data.push({
          name: (dayNameByIndex as any)[dayIndex],
          day: rawDay,
        });

        rawDay++;
        dayIndex++;
        if (dayIndex > 6) {
          dayIndex = 0;
        }
      }

      result.push(rawNowMonth);
      result.push(rawNextMonth);
      setData(result);
      // setEndDate(tempEndDate);
    }
  }, [selectedDate]);

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
    nextClick();
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

  // const getDayOfMonth = (weekDay: number, weekNumber: number) => {
  //   const firstDay = new Date(selectedDate.year, selectedDate.month, 1);
  //   const firstDayWeekDay = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

  //   if (weekDay === firstDayWeekDay && weekNumber === 1) {
  //     canIncrease = true;
  //   }
  //   if (canIncrease) day++;
  //   const lastDayOfMonth = new Date(
  //     selectedDate.year,
  //     selectedDate.month,
  //     0
  //   ).getDate();

  //   if (hidePastDays) {
  //     const calculatedDay = new Date(
  //       selectedDate.year,
  //       selectedDate.month,
  //       day + 1
  //     );
  //     if (calculatedDay < new Date()) return 0;
  //   }

  //   if (day == lastDayOfMonth) {
  //     canIncrease = false;
  //     day = 0;
  //     return lastDayOfMonth;
  //   }
  //   if (day <= lastDayOfMonth) return day;
  //   return -1;
  // };

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
          // setSelectedDate({
          //   year: selectedDate.year,
          //   month: selectedDate.month,
          //   day: day,
          // });
        }}
      >
        {day}
      </Button>
    );
  };

  return (
    <>
      <Box
        w={"full"}
        overflowX="auto"
        marginTop={"20px"}
        background={"gray"}
        zIndex={999}
      >
        <Flex
          direction="row"
          w="full"
          justifyContent={"space-between"}
          background={"red"}
        >
          <Box>
            <Button onClick={prevMonth} fontSize="24px" textAlign={"left"}>
              <Icon as={BsChevronLeft} />
            </Button>
          </Box>
          <Box>
            {getMonthName(selectedDate.month) + " " + selectedDate.year}
          </Box>
          <Box>
            <Button onClick={nextMonth} fontSize="24px" textAlign={"right"}>
              <Icon as={BsChevronRight} />
            </Button>
          </Box>
        </Flex>
        <Table maxWidth={"full"}>
          {data?.length > 0 && (
            <Tr>
              {data.map((rows: any, i: number) => {
                return (
                  <Td padding={0} colSpan={rows.data.length}>
                    <Box
                      background={i == 0 ? "gray" : "white"}
                      w={"full"}
                      borderColor={"green.500"}
                    >
                      <Flex direction={"column"} alignItems={"center"}>
                        <span>{rows.name}</span>
                      </Flex>
                    </Box>
                  </Td>
                );
              })}
            </Tr>
          )}

          {data?.length > 0 &&
            data.map((rows: any) => {
              return (
                <Tr>
                  {rows.data?.map((item: any) => {
                    return (
                      <Td padding={0} rowSpan={rows.data.length}>
                        <Box
                          margin={1}
                          width={"50px"}
                          height={"50px"}
                          color={
                            item.day == selectedDate.day ? "white" : "green.500"
                          }
                          bg={
                            item.day == selectedDate.day ? "green.500" : "white"
                          }
                          borderRadius={"50%"}
                          border="1px"
                          borderColor={"green.500"}
                          onClick={() => {
                            // setSelectedDate({
                            //   year: selectedDate.year,
                            //   month: selectedDate.month,
                            //   day: item.day,
                            // });
                          }}
                        >
                          <Flex direction={"column"} alignItems={"center"}>
                            <span>{item.name}</span>
                            <span>{item.day}</span>
                          </Flex>
                        </Box>
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
        </Table>
      </Box>
    </>
  );
};
