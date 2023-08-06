import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {};

const sizes: Record<string, SystemStyleObject> = {};

const variants = {
  basic: {
    tr: {
      px: 0,
      borderBottom: "1px",
      borderColor: "gray.100",
      td: {
        py: "10px",
        pl: 0,
      },
      th: {
        py: 2,

        pl: 0,
        color: "gray.500",
        fontWeight: "500",
        fontSize: "x-small",
      },
    },
  },
  noBottom: {
    tr: {
      px: 0,
      borderBottom: "0px",
      borderColor: "gray.100",
      td: {
        py: "8px",
        pl: 0,
      },
      th: {
        py: 2,

        pl: 0,
        color: "gray.500",
        fontWeight: "500",
        fontSize: "x-small",
      },
    },
  },
};

const defaultProps = {};

const Table = {
  variants,
};

export default Table;
