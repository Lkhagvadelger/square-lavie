import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {};

const sizes: Record<string, SystemStyleObject> = {};

const variants = {
  blueCapitalize: {
    color: "blue.600",
    fontSize: "0.875rem",
    textTransform: "capitalize",
  },
  bluelabel: {
    color: "blue.600",
    fontSize: "0.625rem",
    textTransform: "uppercase",
  },
  redlabel: {
    color: "pink.600",
    fontSize: "0.625rem",
    textTransform: "uppercase",
  },
  graylabel: {
    color: "gray.600",
    fontSize: "0.625rem",
    textTransform: "uppercase",
  },
  dataLabelFinished: {
    color: "white",
    fontSize: "1.125rem",
  },
  dataLabelPending: {
    color: "pink.500",
    fontSize: "1.125rem",
  },
  highlight: {
    color: "blue.500",
  },
  widgetLabel: {
    color: "gray.700",
    fontWeight: "700",
    fontSize: "12px",
    lineheight: "18px",
  },
  widgetLabelLight: {
    color: "gray.700",
    fontWeight: "500",
    fontSize: "12px",
    lineheight: "18px",
  },
  widgetInputPreview: {
    color: "blue.800",
    fontWeight: "700",
    fontSize: "12px",
    lineheight: "18px",
    textTransform: "capitalize",
  },
  capsheadersmall: {
    color: "main.100",
    fontSize: "x-small",
    lineHeight: "12px",
    fontFamily: "Inter Tight",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
};

const defaultProps = {};

const Text = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Text;
