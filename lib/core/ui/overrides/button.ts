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

  outline: {
    color: "green.500",
    bg: "transparent",
    _hover: {
      bg: "green.900",
    },
    size: "md",
    borderColor: "green.500",
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
  adminChatMessageBox: {
    borderRadius: "12px",
    borderBottomLeftRadius: "0px",
    bg: "#f1f1f1",
    color: "gray.900",
    py: "2",
    px: "3",
    flex: "1",
    _hover: {
      bg: "#f1f1f1",
    },
  },
  userChatMessageBox: {
    color: "#fff",
    bg: "#222222",
    py: "2",
    px: "3",
    borderRadius: "12px",
    borderBottomRightRadius: "0px",
    _hover: {
      bg: "#181818",
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
