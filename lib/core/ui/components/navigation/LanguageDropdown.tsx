import {
  Button,
  Icon,
  Menu,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useMenuButton,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { FaCaretDown } from "react-icons/fa";

const LanguageMenuButton = ({ selected }: { selected: string }) => (
  <Button
    {...useMenuButton()}
    variant="link"
    aria-label="Open language menu"
    textTransform="uppercase"
    fontSize={{ base: 8, lg: 10 }}
    color="gray.300"
    _hover={{ color: "gray.200" }}
    _active={{ color: "white" }}
    py="2"
    mx={{ base: 0, lg: 2 }}
  >
    <Text ml="2" mr="1">
      {selected}
    </Text>
    <Icon as={FaCaretDown} mr="1" />
  </Button>
);

const locales = ["en", "mn"];

export const LanguageDropdown = () => {
  const { t, lang } = useTranslation("common");
  const { asPath } = useRouter();
  const [cookie, setCookie] = useCookies(["lang"]);

  const bg = useColorModeValue("main.700", "offBlack");
  const borderColor = useColorModeValue("main.300", "black");
  const hoverBg = useColorModeValue("main.500", "black");

  return (
    <Menu>
      <LanguageMenuButton selected={t(`language.${lang}`)} />
      <MenuList
        rounded="3px"
        bg={bg}
        fontSize="xs"
        fontWeight="normal"
        shadow="lg"
        border="none"
        p={0}
        zIndex={10}
      >
        {locales.map((locale) => (
          <NextLink key={locale} href={asPath} locale={locale}>
            <MenuItem
              py="2.5"
              borderTop="1px"
              color={lang === locale ? "offWhite" : "white"}
              fontWeight={lang === locale ? "extrabold" : "medium"}
              borderColor={borderColor}
              bg={"transparent"}
              _focus={{ bg: bg }}
              _hover={{ bg: hoverBg }}
              onClick={() => setCookie("lang", locale, { path: "/" })}
            >
              {t(`language.${locale}`)}
            </MenuItem>
          </NextLink>
        ))}
      </MenuList>
    </Menu>
  );
};
