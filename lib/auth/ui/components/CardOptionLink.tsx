import { As, Box, Icon, Text } from "@ui/index";

export const CardOptionLink = ({
  icon,
  title,
  color,
  action,
}: {
  icon: As<any>;
  title: string;
  color: string;
  action: () => void;
}) => {
  return (
    <Box
      mt="2"
      mx="3"
      color={color}
      fontSize={10}
      fontWeight="medium"
      textAlign={{ base: "center", sm: "initial" }}
    >
      <Icon as={icon} fontSize="xs" verticalAlign="middle" />
      <Text as="a" ml="1" cursor="pointer" borderBottom="1px" onClick={action}>
        {title}
      </Text>
    </Box>
  );
};
