// theme/index.js
import {
  extendTheme,
  withDefaultColorScheme,
  ThemeConfig,
} from "@chakra-ui/react";

// Global style overrides
import { styles } from "./foundations/styles";
import { colors } from "./foundations/colors";
import { fonts } from "./foundations/fonts";

// Component style overrides
import Heading from "./overrides/heading";
import Button from "./overrides/button";
import Tabs from "./overrides/tabs";
import Text from "./overrides/text";
import Input from "./overrides/input";
import Checkbox from "./overrides/checkbox";
import Select from "./overrides/select";
import Table from "./overrides/table";
import FormLabel from "./overrides/form-label";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const overrides = {
  config,
  styles,
  colors,
  fonts,
  // Other foundational style overrides go here
  components: {
    Heading,
    Button,
    Text,
    Input,
    Select,
    FormLabel,
    Checkbox,
    Tabs,
    Table,
    // Other components go here
  },
};

export const theme = extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: "gray" })
);
