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
  gray: {
    bg: "gray.100",
    borderColor: "gray.200",
    borderWidth: "1px",
    _light: {
      color: "black",
    },
    _hover: {
      bg: "gray.300",
      color: "gray.800",
    },
  },
  solid: {
    color: "white",
    bg: "green.500",
    _disabled: {
      cursor: "pointer",
    },
    _hover: {
      bg: "green.300",
      _disabled: {
        bg: "green.500",
      },
    },
  },
  delete: {
    bg: "red.500",
    _light: {
      color: "white",
    },
    _hover: {
      bg: "red.300",
    },
  },
  blue: {
    color: "white",
    bg: "blue.600",
    _hover: {
      bg: "blue.700",
    },
    size: "md",
    borderColor: "blue.600",
  },
  bluelined: {
    color: "blue.600",
    bg: "offWhite",
    border: "1px",
    _hover: {
      bg: "blue.700",
    },
    size: "md",
    borderColor: "blue.600",
  },
  outline: {
    color: "green.500",
    bg: "transparent",
    _hover: {
      bg: "green.900",
    },
    size: "md",
    borderColor: "green.500",
  },
  outlineFileAttach: {
    color: "gray.500",
    bg: "transparent",
    _hover: {
      bg: "blue.700",
      color: "white",
    },
    w: "full",
    fontWeight: 300,
    size: "md",
    border: "1px",
    borderColor: "gray.100",
    dropShadow: "black.100",
    paddingStart: 3,
  },
  outlineFilePreview: {
    color: "gray.500",
    bg: "transparent",
    _hover: {
      bg: "blue.700",
      color: "white",
    },
    fontWeight: 300,
    size: "md",
    border: "1px",
    borderColor: "gray.100",
    dropShadow: "black.100",
    paddingStart: 3,
  },
  outlinelight: {
    color: "white",
    bg: "transparent",
    _hover: {
      bg: "green.900",
    },
    size: "sm",
    borderColor: "green.500",
    fontWeight: "100",
    borderWidth: "1px",
  },
  control: {
    bg: "green.500",
    _hover: {
      bg: "green.300",
    },
    size: "md",
    borderColor: "green.500",
    color: "white",
  },
  info: {
    size: "md",
    borderRadius: "20px",
    bg: "gray.850",
    _hover: {
      bg: "gray.850",
    },
    color: "gray.400",
    fontWeight: "400",
    px: 3,
  },
  add: {
    height: "31px",
    px: 5,
    bg: "green.500",
    _light: {
      color: "white",
    },
    _hover: {
      bg: "green.300",
    },
  },
  greentransparent: {
    bg: "green.10",
    borderRadius: "20px",
    border: "1px",
    color: "green.600",
    fontSize: "12px",
    lineHeight: "15px",
    borderColor: "green.50",
  },
  rounded: {
    size: "md",
    borderRadius: "32px",
    bg: "green.500",
    border: "1px",
    borderColor: "green.600",
    color: "white",
    h: "46px",
    fontWeight: 900,
    px: 5,
    py: 3,
  },
  bigrounded: {
    size: "md",
    backgroundColor: "green.500",
    border: "2px",
    borderColor: "green.600",
    borderRadius: "32px",
    fontSize: "xl",
    fontWeight: "black",
    color: "white",
    h: "46px",
    px: 5,
    py: 3,
  },
  remove: {
    height: "31px",
    px: 2,
    borderLeftRadius: 0,
    bg: "red.500",
    size: "sm",
    _light: {
      color: "white",
    },
    _hover: {
      bg: "red.300",
    },
  },
};

const defaultProps = {
  size: "md",
  variant: "solid",
  casing: "capitalize",
};

const Button = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Button;
