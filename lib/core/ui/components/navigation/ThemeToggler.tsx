import {
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export const ThemeToggler = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton
      variant="none"
      aria-label="Theme toggler"
      color="gray.300"
      _hover={{ color: "gray.200" }}
      icon={useColorModeValue(
        <Icon as={IoSunnyOutline} w={6} h={6} />,
        <Icon as={IoMoonOutline} w={6} h={6} />
      )}
      onClick={toggleColorMode}
    />
  );
};
