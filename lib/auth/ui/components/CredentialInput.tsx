import {
  Box,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useColorModeValue,
} from "@ui/index";
import { CountryPhoneCodes } from "@util/countrycode";
import useTranslation from "next-translate/useTranslation";
import { ReactNode, useState } from "react";
import { IoCaretDown, IoEye, IoEyeOff } from "react-icons/io5";

export const CredentialInput = ({
  id,
  type,
  value,
  setValue,
  placeholder,
  code,
  setCode,
  error,
  button,
}: {
  id: string;
  type: string;
  value: string;
  setValue: any;
  placeholder: string;
  code?: string;
  setCode?: any;
  error: boolean;
  button?: ReactNode;
}) => {
  const { t: to } = useTranslation("common");
  const [reveal, setReveal] = useState(false);

  const focus = !error
    ? { color: "green.400", borderColor: "green.500" }
    : { color: "red.500", borderColor: "red.100" };
  const optionColor = useColorModeValue("gray.800", "gray.200");

  return (
    <HStack w="full">
      <Box
        w="full"
        fontSize="sm"
        border="1px"
        borderRadius="3px"
        color={!error ? "gray.400" : "red.500"}
        borderColor={!error ? "green.400" : "red.100"}
        _active={focus}
        _focus={focus}
        _hover={focus}
        bg={useColorModeValue("gray.50", "black")}
      >
        {type === "phone" && (
          <Box display="flex" mb="-0.5">
            <HStack pos="relative">
              <Select
                position="absolute"
                zIndex="1"
                color="transparent"
                opacity="0"
                border="none"
                cursor="pointer"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                sx={{ color: optionColor }}
              >
                {CountryPhoneCodes.map((value) => (
                  <option key={`country-${value.country}`} value={value.code}>
                    {to(`country-name.${value.country}`)}
                  </option>
                ))}
              </Select>
              <HStack px="1">
                <Text mr="-0.5">{code}</Text>
                <Icon fontSize="xs" as={IoCaretDown} />
              </HStack>
            </HStack>
            <Input
              id={id}
              type="number"
              variant="invisible"
              w="full"
              m="0"
              p="1"
              fontSize="sm"
              border="none"
              autoComplete="off"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
            />
          </Box>
        )}
        {type === "email" && (
          <Box display="flex" mb="-0.5">
            <Input
              id={id}
              type="email"
              variant="invisible"
              w="full"
              m="0"
              px="2"
              py="1"
              fontSize="sm"
              border="none"
              autoComplete="off"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
            />
          </Box>
        )}
        {type === "password" && (
          <InputGroup>
            <Input
              id={id}
              type={reveal ? "text" : "password"}
              variant="invisible"
              w="full"
              m="0"
              px="2"
              py="1"
              fontSize="sm"
              border="none"
              required
              autoFocus
              autoComplete="current-password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              sx={{ "::-ms-reveal": { display: "none" } }}
            />
            {value && (
              <InputRightElement>
                <Icon
                  as={reveal ? IoEyeOff : IoEye}
                  color="green.500"
                  cursor="pointer"
                  onClick={() => setReveal(!reveal)}
                />
              </InputRightElement>
            )}
          </InputGroup>
        )}
      </Box>
      {button}
    </HStack>
  );
};
