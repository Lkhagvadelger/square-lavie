import { SystemStyleObject, mode } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {};

const sizes: Record<string, SystemStyleObject> = {};

const variants = {
  gray: (props: any) => ({
    color: mode("gray.700", "gray.200")(props),
  }),
};

const defaultProps = {};

const FormLabel = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default FormLabel;
