import { Box, Button, Flex, Icon, Text, useCheckbox } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { BiDotsVertical } from "react-icons/bi";
import { BsClock, BsDot } from "react-icons/bs";
import { FaClock, FaPlus, FaRegClock } from "react-icons/fa";
import {
  Md1KPlus,
  MdCheck,
  MdCheckCircle,
  MdLockClock,
  MdPlusOne,
  MdSyncLock,
} from "react-icons/md";
import { displayServicePrice, displayServiceDuration } from "../../api/service";
export type ChoicesType = {
  id: string;
  type: string;
  choice: string;
  data?: any;
};
export const ChoiceList = ({
  choices,
  setValue,
  name,
  value,
}: {
  choices: ChoicesType[];
  setValue: any;
  name: string;
  value?: any;
}) => {
  const [selectedTopics, setSelectedChoice] = useState<{
    [id: string]: string;
  }>(value || {});

  // use local storage to store selected topics
  const isSingleChoice = true;
  const onChange = (e: any) => {
    let [id, _selectedTopics] = [e.target.value, { ...selectedTopics }];

    if (isSingleChoice) {
      if (_selectedTopics[id]) {
        delete _selectedTopics[id];
      } else {
        _selectedTopics = {};
        _selectedTopics[id] = e.target.value;
      }
    } else {
      if (_selectedTopics[id]) delete _selectedTopics[id];
      else _selectedTopics[id] = e.target.value;
    }
    setSelectedChoice(_selectedTopics);
    setValue(name, _selectedTopics);
  };

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      w="full"
      pb={2}
      fontSize={"12px"}
    >
      {choices.map((topic: any, index: number) => (
        <CheckboxCard
          key={`symptom-${topic.choice}`}
          value={topic.choice}
          isChecked={selectedTopics[topic.choice] === topic.choice}
          onChange={onChange}
        >
          <Flex
            w="full"
            bg={
              selectedTopics[topic.choice] === topic.choice ? "#fae4cb" : "#fff"
            }
            color={"gray.900"}
            justifyContent={"space-between"}
            borderRadius={"8px"}
            h={"32px"}
            dropShadow="2xl"
            boxShadow={"0px 1px 2px 1px rgba(0,0,0,0.16)"}
          >
            <Flex alignItems="center" pl={1}>
              <Text
                mt={"-4px"}
                fontSize={"32px"}
                color={
                  selectedTopics[topic.choice] === topic.choice
                    ? "gray.900"
                    : "gray.200"
                }
              >
                {"• "}
              </Text>
              {`${topic.data.name}, ${displayServicePrice(
                topic.data.priceMoney.amount as any
              )}, `}
              <Icon as={FaRegClock} mx={1} />
              {" " + displayServiceDuration(topic.data.serviceDuration as any)}
            </Flex>
          </Flex>
        </CheckboxCard>
      ))}
    </Box>
  );
};

const CheckboxCard = (props: any) => {
  const { getInputProps, getCheckboxProps } = useCheckbox(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w={props.width} h={props.height}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        // _checked={{ bg: "green.500", color: "offWhite" }}
        color="nourishGreen.500"
        borderColor={"nourishGreen.500"}
        {...props}
        py={"2px"}
      >
        {props.children}
      </Box>
    </Box>
  );
};
