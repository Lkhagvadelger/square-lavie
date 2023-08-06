import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "@lib/auth/ui";
import NextLink from "next/link";
import { ReactNode } from "react";
import {
  BiCategory,
  BiCheckShield,
  BiCreditCard,
  BiNews,
} from "react-icons/bi";
import {
  FaCreditCard,
  FaHome,
  FaHospital,
  FaHospitalUser,
  FaUserCog,
  FaUserGraduate,
  FaUserInjured,
  FaUserMd,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { HiOutlineNewspaper, HiPuzzle } from "react-icons/hi";
import { MdOutlinePersonPin, MdOutlinePersonPinCircle } from "react-icons/md";
import { AdminActions } from "./AdminActions";

type MenuItemType = {
  label: string;
  icon?: ReactNode;
  href?: string;
};

const menuItems: (MenuItemType & { items?: MenuItemType[] })[] = [
  { label: "Home", icon: <FaHome />, href: "/admin" },
  {
    label: "Users",
    items: [
      {
        label: "All Users",
        icon: <FaUsers />,
        href: "/admin/users",
      },
      {
        label: "Admins",
        icon: <FaUserCog />,
        href: "/admin/users?role=ADMIN",
      },
      {
        label: "PXMs",
        icon: <FaUserShield />,
        href: "/admin/users?role=PATIENT_EXPERIENCE_MANAGER",
      },
      {
        label: "Specialists",
        icon: <FaUserGraduate />,
        href: "/admin/users?role=SPECIALIST",
      },
      {
        label: "Hospital Admins",
        icon: <FaHospitalUser />,
        href: "/admin/users?role=HOSPITAL_ADMIN",
      },
      {
        label: "Local Doctors",
        icon: <FaUserMd />,
        href: "/admin/users?role=LOCAL_DOCTOR",
      },
      {
        label: "Patients",
        icon: <FaUserInjured />,
        href: "/admin/users?role=PATIENT",
      },
    ],
  },
  {
    label: "Hospital",
    items: [
      {
        label: "Hospital",
        icon: <FaHospital />,
        href: "/admin/hospital",
      },
      {
        label: "Credits",
        icon: <FaCreditCard />,
        href: "/admin/credit",
      },
    ],
  },
  {
    label: "Assessments",
    items: [
      {
        label: "Public Assessments",
        icon: <BiNews />,
        href: "/admin/assessments",
      },
      {
        label: "Hospital Verify",
        icon: <BiCheckShield />,
        href: "/admin/verify",
      },
      {
        label: "Public Verify ES",
        icon: <MdOutlinePersonPin />,
        href: "/admin/public-es",
      },
      {
        label: "Public Verify MN",
        icon: <MdOutlinePersonPinCircle />,
        href: "/admin/public-mn",
      },
    ],
  },
  {
    label: "Tools",
    items: [
      { label: "Widgets", icon: <HiPuzzle />, href: "/admin/widgets" },
      {
        label: "Articles",
        icon: <HiOutlineNewspaper />,
        href: "/admin/article",
      },
    ],
  },
  {
    label: "Base Data",
    items: [
      { label: "Conditions", icon: <BiCreditCard /> },
      { label: "Specialties", icon: <BiCategory /> },
    ],
  },
];

export const AdminSidebar = () => {

  return (
    <Flex
      h="full"
      minW={48}
      w={48}
      direction="column"
      borderRight="1px"
      borderColor="gray.200"
    >
      <Stack spacing="4" flex="1" overflow="auto" py="3" pr="2">
        {menuItems.map((item, i) =>
          item.items ? (
            <NavGroup key={`menuitem-${i}`} label={item.label}>
              {item.items.map((subitem, si) => (
                <AdminNavLinkItem
                  key={`menuitem-${i}-${si}`}
                  href={subitem.href}
                  icon={subitem.icon}
                  label={subitem.label}
                />
              ))}
            </NavGroup>
          ) : (
            <AdminNavLinkItem
              key={`menuitem-${i}`}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          )
        )}
      </Stack>
    </Flex>
  );
};

const NavGroup = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <Box>
    <Text
      px="2.5"
      fontSize="xs"
      fontWeight="semibold"
      textTransform="uppercase"
      letterSpacing="widest"
      color="gray.600"
      mb="1"
    >
      {label}
    </Text>
    <Stack spacing="1">{children}</Stack>
  </Box>
);

const AdminNavLinkItem = ({
  label,
  icon,
  href,
}: {
  label: string;
  icon: ReactNode;
  href?: string;
}) =>
  href ? (
    <NextLink href={href}>
      <HStack
        px="2"
        py="1"
        rounded="md"
        transition="all 0.2s"
        _hover={{ bg: "gray.200", color: "gray.600" }}
      >
        <Text fontSize="lg">{icon}</Text>
        <Text>{label}</Text>
      </HStack>
    </NextLink>
  ) : (
    <HStack px="2" py="1" color="gray.400">
      <Text fontSize="lg">{icon}</Text>
      <Text>{label}</Text>
    </HStack>
  );
