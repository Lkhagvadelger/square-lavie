import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  borderRadius: "3px",
};

const sizes: Record<string, SystemStyleObject> = {
  md: {
    px: "24px",
  },
};

const variants = {
  topbordered: {
    root: {},
    tabpanels: { pt: "2" },
    tabpanel: {
      p: "0",
    },
    tab: {
      fontWeight: "700",
      borderTop: "2px",
      px: "2",
      pt: "1",
      mt: 2,
      mb: 4,
      fontSize: "md",
      color: "gray.200",
      _selected: {
        color: "#181818",
      },
    },
  },
  bottombordered: {
    root: {},
    tabpanels: { pt: "5" },
    tabpanel: {
      p: "0",
    },
    tab: {
      fontWeight: "900",
      borderBottom: "2px",
      mt: "-3px",
      pl: "0",
      pb: "0",
      pt: "1",
      mr: "5",
      fontSize: "lg",
      _light: {
        color: "blue.100",
        _selected: {
          color: "blue.700",
        },
      },
      _dark: {
        color: "blue.100",
        _selected: {
          color: "blue.700",
        },
      },
    },
  },
  apparticle: {
    root: {},
    tabpanels: { pt: "0" },
    tablist: {
      fontFamily: "Inter Tight",
    },
    tabpanel: {
      p: "0",
    },
    tab: {
      p: "0",
      pb: "2",
      mx: "2",
      fontWeight: "400",
      borderBottom: "0px",
      fontSize: "14px",
      color: "gray.500",
      whiteSpace: "nowrap",
      _selected: {
        color: "blue.600",
        borderBottom: "1px",
        fontWeight: "700",
        borderColor: "blue.600",
      },
    },
  },
};

const defaultProps = {
  size: "md",
  variant: "enclosed",
  casing: "capitalize",
};

const Tabs = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Tabs;
