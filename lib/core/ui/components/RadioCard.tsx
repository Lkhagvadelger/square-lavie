import { Box, useRadio } from "@chakra-ui/react";

export const RadioCard = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w={props.width} h={props.height}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius={props.borderRadius || "md"}
        borderColor={props.borderColor || ""}
        boxShadow={props.boxShadow || "md"}
        w="full"
        h="full"
        color={props.color || ""}
        _checked={
          props.checked || {
            bg: "blue.700",
            color: "white",
            borderColor: "gray.600",
            sx: "{ * > div: { color:white } }",
          }
        }
        _hover={
          props.hover || {
            bg: "blue.50",
            borderColor: "gray.300",
            color: "blue.700",
          }
        }
        _focus={props.focus || { boxShadow: "outline" }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};
