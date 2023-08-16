import { createStandaloneToast, ToastPosition } from "@chakra-ui/react";
import { theme } from "../theme";
const position = "top";
const duration = 1000;
const isClosable = true;

const { toast } = createStandaloneToast({ theme });

export const toaster = {
  success(message: string, title = "", positionManual?: ToastPosition) {
    toast({
      title,
      description: message,
      status: "success",
      position: positionManual ? positionManual : position,
      duration,
      isClosable,
    });
  },

  info(message: string, title = "") {
    toast({
      title,
      description: message,
      status: "info",
      position,
      duration,
      isClosable,
    });
  },
  warning(message: string, title = "") {
    toast({
      title,
      description: message,
      status: "warning",
      position,
      duration,
      isClosable,
    });
  },
  error(message: string, title = "") {
    toast({
      title,
      description: message,
      status: "error",
      position,
      duration,
      isClosable,
    });
  },
};
