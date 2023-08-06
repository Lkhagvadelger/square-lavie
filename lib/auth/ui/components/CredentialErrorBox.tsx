import { Box, BoxProps, HStack, Icon, Text } from "@ui/index";
import { IoAlertCircleOutline } from "react-icons/io5";

export const CredentialErrorBox = ({
  errorMsg,
  errorDesc,
  ...rest
}: {
  errorMsg: string | null | undefined;
  errorDesc?: string;
} & BoxProps) => {
  return errorMsg ? (
    <Box mt="2" py="3" color="offWhite" borderRadius="3" bg="red.500" {...rest}>
      <HStack>
        <Icon
          as={IoAlertCircleOutline}
          ml="3.5"
          mr="-3.5"
          fontSize="xl"
          verticalAlign="middle"
        />
        <Box w="full" fontSize={10} textAlign="center">
          <Text fontWeight="semibold">{errorMsg}</Text>
          {errorDesc && <Text>{errorDesc}</Text>}
        </Box>
      </HStack>
    </Box>
  ) : (
    <></>
  );
};
