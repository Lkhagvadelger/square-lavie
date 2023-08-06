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
  default: {
    field: {
      background: "gray.850",
      border: "1px solid",
      borderColor: "gray.200",
      borderRadius: "3px",
      py: 0,
      px: 3,
      _light: {
        background: "gray.100",
      },
      _focus: {
        zIndex: 1,
        borderColor: "#3182ce",
        boxShadow: "0 0 0 1px #3182ce",
      },
      _hover: { borderColor: "gray.300" },
    },
  },
  white: {
    field: {
      background: "offWhite",
      border: "1px solid",
      borderColor: "gray.200",
      borderRadius: "3px",
      py: 0,
      px: 3,
      _focus: {
        zIndex: 1,
        borderColor: "#3182ce",
        boxShadow: "0 0 0 1px #3182ce",
      },
      _hover: { borderColor: "gray.300" },
    },
  },
  small: {
    field: {
      background: "gray.850",
      border: "1px solid",
      borderColor: "gray.200",
      borderRadius: "3px",
      py: 0,
      px: 0,
      fontSize: 12,
      _light: {
        background: "gray.200",
      },
      _focus: {
        zIndex: 1,
        borderColor: "#3182ce",
        boxShadow: "0 0 0 1px #3182ce",
      },
      _hover: { borderColor: "gray.300" },
      fontWeight: "bold",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderLeft: 0,
    },
  },

  countryCodeSelect: {
    field: {
      top: "0",
      left: "0",
      border: "2px",
      borderColor: "red",
      zIndex: 1,
      bottom: 0,
      opacity: 0,
      w: 20,
      h: 8,
      pl: 4,
      ml: 2,
      position: "absolute",
      color: "green",
    },
  },
};

const defaultProps = {
  size: "md",
  variant: "default",
};

const Select = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Select;
