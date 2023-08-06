import {
  Box,
  Button,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemProps,
  MenuList,
  Text,
  useColorModeValue,
  useMenuButton,
} from "@chakra-ui/react";
import { useLogout } from "@lib/auth/data/authHooks";
import { getRootUrl } from "@lib/auth/data/types";
import { useAuth } from "@lib/auth/ui"; 
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FaCaretDown } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { ProfileBox } from "./ProfileBox";

const MenuButton = ({ name, isOpen }: { name: string; isOpen: boolean }) => {
  const buttonProps = useMenuButton({});
  const { user, isLoggedIn } = useAuth();

  return (
    <Button
      {...buttonProps}
      bg={{ base: "none", lg: useColorModeValue("main.700", "offBlack") }}
      borderRadius="3px"
      aria-label="Open user menu"
      pl={{ base: 0, lg: 3 }}
      pr={0}
      h={{ base: 10, lg: 14 }}
      _hover={{ bg: useColorModeValue("main.700", "offBlack") }}
      _active={{ bg: useColorModeValue("main.700", "offBlack") }}
    >
      <Icon
        as={isOpen ? HiX : HiMenu}
        display={{ base: "flex", lg: "none" }}
        fontSize="2xl"
      />
      <HStack display={{ base: "none", lg: "flex" }} spacing={0}>
        {isLoggedIn && user && <ProfileBox name={name} />}
        <Box>
          <Icon
            as={FaCaretDown}
            mx={1}
            verticalAlign="middle"
            color="gray.400"
          />
        </Box>
      </HStack>
    </Button>
  );
};

const menuItemProps = (): MenuItemProps => ({
  py: 2.5,
  bg: "transparent",
  borderTop: "1px",
  // eslint-disable-next-line react-hooks/rules-of-hooks
  borderColor: useColorModeValue("main.300", "black"),
  // eslint-disable-next-line react-hooks/rules-of-hooks
  _hover: { bg: useColorModeValue("main.500", "black") },
});

const MenuPopup = ({
  name,
  role,
}: {
  name: string;
  role: string | undefined;
}) => {
  const { t } = useTranslation("common");
  const { t: ta } = useTranslation("auth");
  const router = useRouter();
  const logoutMutation = useLogout();
  const { user } = useAuth();
  const rootUrl = getRootUrl(user);

  return (
    <MenuList
      rounded={{ base: "none", lg: "3px" }}
      color="white"
      bg={useColorModeValue("main.700", "offBlack")}
      fontSize="xs"
      fontWeight="normal"
      shadow="lg"
      border="none"
      mt={{ base: 0, lg: -2.5 }}
      mr={{ base: -6, lg: 0 }}
      p={0}
      w={{ base: "100vw", lg: 20 }}
      zIndex={10}
    >
      <MenuItem
        bg={"transparent"}
        _hover={menuItemProps()._hover}
        _focus={{ bg: "none" }}
      >
        <Box py={1}>
          <Text
            color={useColorModeValue("main.300", "white")}
            fontSize="10"
            lineHeight="3"
            fontWeight="medium"
            textTransform="uppercase"
          >
            {role && ta(`role.${role}`)}
          </Text>
          <Text mt="0.5">{name}</Text>
        </Box>
      </MenuItem>
      <NextLink href={rootUrl}>
        <MenuItem {...menuItemProps()}>{t(`home`)}</MenuItem>
      </NextLink>
      <NextLink href="/account/profile">
        <MenuItem {...menuItemProps()}>{t(`profile-settings`)}</MenuItem>
      </NextLink>
      <NextLink href="/support">
        <MenuItem {...menuItemProps()}>{t(`feedback-support`)}</MenuItem>
      </NextLink>
      <MenuItem
        fontWeight="bold"
        onClick={() =>
          logoutMutation.mutate(null, {
            onSuccess: () => router.push("/auth/login"),
          })
        }
        {...menuItemProps()}
      >
        {t(`logout`)}
      </MenuItem>
    </MenuList>
  );
};

export const ProfileMenu = () => {
  const { lang } = useTranslation();
  const { user } = useAuth();
  const name =  user?.profile.firstName

  return (
    <Menu placement="bottom-end">
      {({ isOpen }) => (
        <>
          <MenuButton name={name} isOpen={isOpen} />
          <MenuPopup name={name} role={user?.role} />
        </>
      )}
    </Menu>
  );
};
