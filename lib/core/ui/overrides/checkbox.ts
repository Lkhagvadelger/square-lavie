import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  field: {},
};

const sizes: Record<string, SystemStyleObject> = {};

const variants = {
  blueColored: {
    sx: {
      "& input:checked + span": {
        borderColor: "blue.800",
        bg: "blue.800",
      },
      "& span": { borderColor: "blue.800" },
    },
    size: "md",
  },
  default: {},
};

const defaultProps = {
  size: "md",
  variant: "default",
};

const Checkbox = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Checkbox;
