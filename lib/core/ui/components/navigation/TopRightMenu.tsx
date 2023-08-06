import {
  Box,
  Button,
  HStack,
  Icon,
  Menu,
  MenuItem,
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
      bg={useColorModeValue("gray.50", "gray.850")}
      borderRadius="3px"
      variant="ghost"
      aria-label="Open user menu"
      color={useColorModeValue("blue.400", "gray.400")}
      pl={{ base: 1, lg: 3 }}
      pr={1}
      h={{ base: 10, lg: 14 }}
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
            verticalAlign={"middle"}
            color={useColorModeValue("gray.300", "gray.500")}
          />
        </Box>
      </HStack>
    </Button>
  );
};

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
      rounded={{ base: "none", lg: "md" }}
      color={{
        base: useColorModeValue("gray.600", "gray.50"),
        lg: useColorModeValue("gray.50", "gray.50"),
      }}
      bg={{
        base: useColorModeValue("white", "gray.800"),
        lg: useColorModeValue("gray.300", "gray.800"),
      }}
      fontSize="sm"
      shadow="lg"
      mt={{ base: 0, lg: -2 }}
      mr={{ base: -6, lg: 0 }}
      p={0}
      w={{ base: "100vw", lg: 20 }}
      zIndex={10}
    >
      <MenuItem>
        <Box lineHeight="1" py={1}>
          <Text
            fontSize="xs"
            fontWeight="medium"
            color={{
              base: useColorModeValue("gray.400", "gray.600"),
              lg: useColorModeValue("gray.600", "gray.600"),
            }}
            textTransform={"uppercase"}
          >
            {t(`account`)} - {role && ta(`role.${role}`)}
          </Text>

          <Text
            mt="1"
            fontSize="sm"
            fontWeight={"normal"}
            color={{
              base: useColorModeValue("gray.600", "gray.300"),
              lg: useColorModeValue("gray.800", "gray.300"),
            }}
          >
            {name}
          </Text>
        </Box>
      </MenuItem>
      <NextLink href={rootUrl}>
        <MenuItem
          fontWeight="bold"
          py={2.5}
          borderTop="1px"
          borderColor={{
            base: useColorModeValue("gray.200", "gray.850"),
            lg: useColorModeValue("gray.50", "gray.850"),
          }}
        >
          {t(`home`)}
        </MenuItem>
      </NextLink>
      <NextLink href="/account/profile">
        <MenuItem
          fontWeight="bold"
          py={2.5}
          borderTop="1px"
          borderColor={{
            base: useColorModeValue("gray.200", "gray.850"),
            lg: useColorModeValue("gray.50", "gray.850"),
          }}
        >
          {t(`profile-settings`)}
        </MenuItem>
      </NextLink>
      <NextLink href="/support">
        <MenuItem
          fontWeight="bold"
          py={2.5}
          borderTop="1px"
          borderColor={{
            base: useColorModeValue("gray.200", "gray.850"),
            lg: useColorModeValue("gray.50", "gray.850"),
          }}
        >
          {t(`feedback-support`)}
        </MenuItem>
      </NextLink>
      <MenuItem
        fontWeight="medium"
        color={{
          base: useColorModeValue("red.600", "red.300"),
          lg: useColorModeValue("red.700", "red.300"),
        }}
        onClick={() =>
          logoutMutation.mutate(null, {
            onSuccess: () => {
              router.push("/auth/login");
            },
          })
        }
        py={2.5}
        borderTop="1px"
        borderColor={{
          base: useColorModeValue("gray.200", "gray.850"),
          lg: useColorModeValue("gray.50", "gray.850"),
        }}
      >
        {t(`logout`)}
      </MenuItem>
    </MenuList>
  );
};

export const TopRightMenu = () => {
  const { lang } = useTranslation();
  const { user } = useAuth();
  const name = user?.profile.firstName

  return (
    <Menu placement={"bottom-end"}>
      {({ isOpen }) => (
        <>
          <MenuButton name={name} isOpen={isOpen} />
          <MenuPopup name={name} role={user?.role} />
        </>
      )}
    </Menu>
  );
};
