import {
  IconButton,
  Center,
  CenterProps,
  Menu,
  MenuItem,
  MenuList,
  useMenuButton,
  UseMenuButtonProps,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { HiOutlineBell } from "react-icons/hi";

const NotificationBadge = (props: CenterProps) => (
  <Center
    bg="red.500"
    fontSize="xs"
    fontWeight="bold"
    position="absolute"
    rounded="full"
    textAlign="center"
    color="white"
    top="-2px"
    insetEnd="0"
    w="18px"
    h="18px"
    {...props}
  />
);

const NotificationMenuButton = (props: UseMenuButtonProps) => {
  const buttonProps = useMenuButton(props);
  return (
    <IconButton
      {...buttonProps}
      variant="ghost"
      aria-label="Open notification menu"
      color={useColorModeValue("gray.300", "gray.400")}
      icon={
        <>
          <Icon as={HiOutlineBell} w={6} h={6} />
          {/* <NotificationBadge>2</NotificationBadge> */}
        </>
      }
    />
  );
};

export const NotificationDropdown = () => (
  <Menu>
    <NotificationMenuButton />
    <MenuList
      rounded="md"
      shadow="lg"
      py="1"
      color={useColorModeValue("gray.800", "gray.400")}
      fontSize="sm"
      zIndex={10}
    >
      <MenuItem fontWeight="medium">No notification</MenuItem>
    </MenuList>
  </Menu>
);
