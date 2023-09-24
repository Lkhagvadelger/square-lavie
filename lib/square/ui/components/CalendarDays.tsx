import { CalendarMonthType } from "@lib/square/data/types";
import { Box, Button, Flex, Icon, Table, Tbody, Td, Text, Tr } from "@ui/index";
import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

// Sunday - Saturday
const dayNameByIndex = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

// (January gives 0)
const monthNameByIndex = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "April",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const dayRange = 30;
export const CalendarDays = ({
  selectedDate,
  setSelectedDate,
  hidePastDays = true,
  nextClick,
}: {
  selectedDate: Date;
  setSelectedDate: (pickedDate: Date) => void;
  hidePastDays?: boolean;
  nextClick: (endDate: any) => void;
}) => {
  const [data, setData] = useState<any>([]);
  const [lastDate, setLastDate] = useState<any>();
  const [monthCount, setMonthCount] = useState(0);
  // const [startDate, setStartDate] = useState<Date>();
  // const [dayIndex, setDayIndex] = useState<number>(0);
  // const [thisMonthLastDay, setThisMonthLastDay] = useState<number>(0);

  const maxMountCount = 3;

  useEffect(() => {
    console.log(selectedDate, "-ss");
    if (selectedDate) {
      console.log("hahha");
      console.log(selectedDate, "--sel Date Days");
      dataReload(selectedDate);
    }
  }, [selectedDate]);

  const dataReload = (checkDate: Date) => {
    const startDate = new Date(
      checkDate.getUTCFullYear(),
      checkDate.getMonth() + 1,
      0
    );
    const lastDay = startDate.getDate();
    const thisMonth = startDate.getMonth();

    let rawDay = checkDate.getDate();

    const tempEndDate = new Date(
      checkDate.getUTCFullYear(),
      checkDate.getMonth(),
      checkDate.getDate()
    );

    let dayIndex = tempEndDate.getDay();

    tempEndDate.setDate(tempEndDate.getDate() + dayRange);
    const tempEndMonth = tempEndDate.getMonth();

    // console.log(tempEndDate, "---tempEndDate");

    let result: any = [];

    // until lastDay loop
    const checkDay = lastDay - rawDay;
    const leftDay = lastDay - checkDay;

    let rawNowMonth: any = {
      name: (monthNameByIndex as any)[thisMonth],
      month: thisMonth,
      year: startDate.getFullYear(),
      data: [],
    };

    for (let i = 0; i <= checkDay; i++) {
      rawNowMonth.data.push({
        name: (dayNameByIndex as any)[dayIndex],
        day: rawDay,
        month: startDate.getMonth(),
        year: startDate.getFullYear(),
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
      month: tempEndMonth,
      year: tempEndDate.getFullYear(),
      data: [],
    };

    //start for 1 day to endDate
    for (let i = 1; i <= leftDay; i++) {
      rawNextMonth.data.push({
        name: (dayNameByIndex as any)[dayIndex],
        day: rawDay,
        month: tempEndDate.getMonth(),
        year: tempEndDate.getFullYear(),
      });

      rawDay++;
      dayIndex++;
      if (dayIndex > 6) {
        dayIndex = 0;
      }
    }

    result.push(rawNowMonth);
    result.push(rawNextMonth);

    const oldData = data.concat(result);
    setData(oldData);

    tempEndDate.setDate(rawDay);

    setLastDate(tempEndDate);
    setMonthCount(monthCount + 1);
  };

  const nextMonth = async () => {
    console.log("nextMonth clicked");

    dataReload(lastDate);
    nextClick(lastDate);
  };

  const dayClicked = (selDay: any) => {
    console.log("day clicked");
    const rawDay = selectedDate;

    rawDay.setFullYear(selDay.year);
    rawDay.setMonth(selDay.month);
    rawDay.setDate(selDay.day);

    setSelectedDate(rawDay);
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
        <Flex direction="row" w="full" justifyContent={"space-between"}>
          <Table maxWidth={"full"}>
            {data?.length > 0 && (
              <Tr>
                {data.map((rows: any, i: number) => {
                  return (
                    <Td key={i} padding={0} colSpan={rows.data.length}>
                      <Box
                        background={rows.month % 2 == 0 ? "gray" : "white"}
                        w={"full"}
                        height={"50px"}
                        borderColor={"green.500"}
                        verticalAlign={"center"}
                        textAlign={"center"}
                      >
                        <h1>
                          {rows.name}{" "}
                          {rows.year > selectedDate.getFullYear() && rows.year}
                        </h1>
                      </Box>
                    </Td>
                  );
                })}
              </Tr>
            )}

            {data?.length > 0 &&
              data.map((rows: any, i: number) => {
                return (
                  <Tr key={i}>
                    {rows.data?.map((item: any, key: number) => {
                      return (
                        <Td key={key} padding={0} rowSpan={rows.data.length}>
                          <Box
                            margin={1}
                            width={"50px"}
                            height={"50px"}
                            color={
                              item.day == selectedDate.getDate() &&
                              item.month == selectedDate.getMonth() &&
                              item.year == selectedDate.getFullYear()
                                ? "white"
                                : "green.500"
                            }
                            bg={
                              item.day == selectedDate.getDate() &&
                              item.month == selectedDate.getMonth() &&
                              item.year == selectedDate.getFullYear()
                                ? "green.500"
                                : "white"
                            }
                            borderRadius={"50%"}
                            border="1px"
                            borderColor={"green.500"}
                            onClick={() => {
                              dayClicked(item);
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

          {monthCount < maxMountCount && (
            <Box>
              <Button
                alignSelf={""}
                onClick={nextMonth}
                fontSize="24px"
                textAlign={"right"}
              >
                <Icon as={BsChevronRight} />
              </Button>
            </Box>
          )}
        </Flex>
      </Box>
    </>
  );
};
