import { IconButton, Icon, Box } from "@chakra-ui/react";
import { HiOutlineMenu, HiX } from "react-icons/hi";

type MobileHamburgerMenuProps = {
  onClick?: VoidFunction;
  isOpen: boolean;
};

export const MobileHamburgerMenu = (props: MobileHamburgerMenuProps) => {
  const { onClick, isOpen } = props;
  return (
    <Box ms="-2" minW={{ base: "12", lg: "76px" }} display={{ lg: "none" }}>
      <IconButton
        onClick={onClick}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        icon={<Icon as={isOpen ? HiX : HiOutlineMenu} />}
        variant="ghost"
      />
    </Box>
  );
};
