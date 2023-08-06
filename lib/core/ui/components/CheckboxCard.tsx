import { Box, useCheckbox, useColorModeValue } from "@chakra-ui/react";

export const CheckboxCard = (props: any) => {
  const { getInputProps, getCheckboxProps } = useCheckbox(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w={props.width} h={props.height}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="md"
        boxShadow="md"
        _checked={{ bg: "purple.500", color: "white" }}
        _focus={{ boxShadow: "outline" }}
        color="white"
        backgroundColor={useColorModeValue("gray.400", "gray.850")}
        px={3}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};
