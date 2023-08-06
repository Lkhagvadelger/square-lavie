import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  field: {},
};

const sizes: Record<string, SystemStyleObject> = {
  xs: {
    field: {
      borderRadius: "sm",
      fontSize: "xs",
      height: 6,
      paddingX: 2,
    },
  },
  sm: {
    field: {
      borderRadius: "sm",
      fontSize: "sm",
      height: 8,
      paddingX: 3,
    },
  },
  md: {
    field: {
      borderRadius: "md",
      fontSize: "md",
      height: 10,
      paddingX: 4,
    },
  },
  lg: {
    field: {
      borderRadius: "md",
      fontSize: "lg",
      height: 12,
      paddingX: 4,
    },
  },
};

const variants = {
  search: {
    field: {
      color: "blue.700",
      background: "none",
      borderRadius: "0",
      border: "none",
      borderBottom: "1px",
      borderColor: "blue.700",
      fontSize: "sm",
      fontWeight: "normal",
      _placeholder: {
        color: "blue.700",
      },
      _hover: {
        borderColor: "blue.700",
      },
      _focus: {
        zIndex: 1,
        borderColor: "blue.700",
        background: "none",
      },
      _light: {
        _focus: {},
      },
      _dark: {
        _focus: {},
      },
    },
  },
  widgetInput: {
    field: {
      // font weight 700
      fontWeight: "700",
      fontSize: "xs",
      background: "offWhite",
      border: "1px solid",
      borderColor: "blue.100",
      borderRadius: "0px",
      height: "34px",
      pb: "1px",
      color: "blue.800",
      lineHeight: "32px",
      _placeholder: {
        fontWeight: 400,
        // italic font
        fontStyle: "italic",
        //font 11px
        fontSize: "11px",
        color: "gray.300",
        // line height 18px
        lineHeight: "18px",
      },
      _focus: {
        background: "offWhite",
        borderColor: "blue.100",
        color: "blue.800",
      },
    },
  },
  outline: {
    field: {
      background: "red",
      border: "1px solid",
      borderColor: "inherit",
      _focus: {
        zIndex: 1,
        borderColor: "#3182ce",
        boxShadow: "0 0 0 1px #3182ce",
      },
      _hover: { borderColor: "gray.300" },
    },
  },
  default: {
    field: {
      background: "gray.850",
      border: "1px solid",
      borderColor: "gray.200",
      borderRadius: "3px",
      _light: {
        background: "gray.100",
      },
      _dark: {},
      p: 3,
      _focus: {
        zIndex: 1,
        borderColor: "#3182ce",
        boxShadow: "0 0 0 1px #3182ce",
      },
      _hover: { borderColor: "gray.300" },
    },
  },
  filled: {
    field: {
      background: "gray.100",
      border: "2px solid",
      borderColor: "transparent",
      _focus: {
        background: "transparent",
        borderColor: "#3182ce",
      },
      _hover: {
        background: "gray.300",
      },
    },
  },
  flushed: {
    field: {
      background: "transparent",
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: 0,
      paddingX: 0,
      _focus: {
        borderColor: "#3182ce",
        boxShadow: "0 0 0 1px #3182ce",
      },
    },
  },
  unstyled: {
    field: {
      background: "transparent",
      borderRadius: "md",
      height: "auto",
      paddingX: 0,
    },
  },
  white: {
    field: {
      background: "offWhite",
      _focus: {
        background: "offWhite",
      },
    },
  },
  invisible: {
    field: {
      border: "none",
      bg: "transparent",
      _focus: {
        bg: "transparent",
      },
    },
  },
  fulltextsearch: {
    field: {
      borderRadius: "3px",
      paddingLeft: 5,
      autoComplete: "off",
      width: "full",
      fontSize: "2xl",
      type: "text",
      height: 16,
      _focus: {
        bg: "purple.900",
        color: "white",
        borderColor: "purple.500",
      },
      _light: {
        bg: "gray.200",
        color: "gray.400",
      },
      _dark: {
        bg: "gray.900",
      },
    },
  },
};

const defaultProps = {
  size: "md",
  variant: "default",
};

const Input = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Input;
