import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  fontFamily: "heading",
};

const sizes: Record<string, SystemStyleObject> = {
  "4xl": {
    fontSize: ["6xl", null, "7xl"],
    lineHeight: 1,
  },
  "3xl": {
    fontSize: ["5xl", null, "6xl"],
    lineHeight: 1,
  },
  "2xl": {
    fontSize: ["4xl", null, "5xl"],
    lineHeight: [1.2, null, 1],
  },
  xl: {
    fontSize: ["3xl", null, "4xl"],
    lineHeight: [1.33, null, 1.2],
  },
  lg: {
    fontSize: ["2xl", null, "3xl"],
    lineHeight: [1.33, null, 1.2],
  },
  bg: {
    fontSize: ["xl", null, "2xl"],
    lineHeight: [1.33, null, 1.2],
  },
  md: { fontSize: "xl", lineHeight: 1.2 },
  sm: { fontSize: "md", lineHeight: 1.2 },
  xs: { fontSize: "sm", lineHeight: 1.2 },
};

const variants = {
  normal: {
    fontWeight: "bold",
  },
  main: {
    color: "blue.500",
  },
  blueish: {
    color: "blue.800",
    fontWeight: "400",
    fontSize: "14px",
  },
  appheading: {
    textTransform: "capitalize",
    color: "red.800",
    fontWeight: "900",
    fontSize: "16px",
    textAlign: "center",
  },
  black: {
    color: "black",
  },
  dynamicScreenTitle: {
    _light: {
      color: "red.500",
    },
    _dark: {
      color: "yellow.500",
    },
  },
  publicAssessment: {
    _light: {
      color: "blue.700",
    },
    _dark: {
      color: "blue.700",
    },
  },
  publicAssessmentVerify: {
    _light: {
      color: "red.800",
    },
    _dark: {
      color: "red.100",
    },
  },
  yellowPurple: {
    fontWeight: "200",
    fontSize: "4xl",
    w: "full",
    _light: {
      color: "red.500",
    },
    _dark: {
      color: "yellow.500",
    },
  },
};

const defaultProps = {
  size: "bg",
  variant: "normal",
};

const Heading = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Heading;
