import { Box, Button, Flex, Icon, Text, useCheckbox } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Md1KPlus, MdCheck, MdCheckCircle, MdPlusOne } from "react-icons/md";
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
  const full = "full";
  const { t: tn } = useTranslation("nourish");

  return (
    <Box display={"flex"} flexDirection="column" w="full">
      {choices.map((topic: any, index: number) => (
        <CheckboxCard
          key={`symptom-${topic.choice}`}
          value={topic.choice}
          isChecked={selectedTopics[topic.choice] === topic.choice}
          onChange={onChange}
          borderTopRightRadius={index === 0 ? "md" : "none"}
          borderTopLeftRadius={index === 0 ? "md" : "none"}
          borderBottomLeftRadius={index === choices.length - 1 ? "md" : "none"}
          borderBottomRightRadius={index === choices.length - 1 ? "md" : "none"}
          width={"full"}
        >
          <Flex w="full" justifyContent={"space-between"}>
            <Box textAlign={"right"} w="full" mr={2}>
              <Text> {topic.data.name}</Text>
              <Text>
                {displayServicePrice(topic.data.priceMoney.amount as any)},{" "}
                {displayServiceDuration(topic.data.serviceDuration as any)}
              </Text>
            </Box>
            <Text
              minW="44px"
              maxW="44px"
              minH="44px"
              maxH="44px"
              p="0"
              borderRadius={"4px"}
              bg={
                selectedTopics[topic.choice] === topic.choice
                  ? "green.500"
                  : "#fff"
              }
              border="1px"
              borderColor={"green.500"}
              color={"green.500"}
              variant={"solid"}
            >
              {selectedTopics[topic.choice] === topic.choice ? (
                <Icon
                  ml="1"
                  mt="1"
                  fontSize={"32px"}
                  color="#fff"
                  fontWeight={"900"}
                  as={MdCheck}
                />
              ) : (
                <Icon
                  ml="13px"
                  mt="13px"
                  fontSize={"16px"}
                  color="green.500"
                  fontWeight={"900"}
                  as={FaPlus}
                />
              )}
            </Text>
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
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};
