import { forwardRef, ReactNode, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Table,
  Tbody,
  Td,
  Tr,
  useColorModeValue,
  useMergeRefs,
  VStack,
} from "@ui/index";
import { FieldError } from "react-hook-form";
import { IoSearch } from "react-icons/io5";
import useTranslation from "next-translate/useTranslation";

export const LookupField = forwardRef<
  HTMLInputElement,
  InputProps & {
    onClickOnResult: (data: any) => void;
    reactQueryResult: any;
    placeHolder: string;
    lookupName?: string;
    error?: FieldError;
    large?: boolean;
    concept?: boolean;
  }
>(
  (
    {
      onClickOnResult,
      reactQueryResult,
      placeHolder,
      lookupName = "name",
      error,
      large,
      concept,
      ...rest
    },
    ref
  ) => {
    const { t: tc } = useTranslation("concept");
    const inputRef = useRef<HTMLInputElement>(null);
    const mergeRef = useMergeRefs(inputRef, ref);
    const inputBg = useColorModeValue("gray.100", "gray.850");
    const inputFocusBg = useColorModeValue("purple.100", "purple.900");
    return (
      <Box
        position={"relative"}
        flex="1"
        w="full"
        display="flex"
        flexDirection="column"
      >
        <InputGroup _focusWithin={{ color: "white" }} color={"blue.500"}>
          <Input
            fontSize={large ? "2xl" : ""}
            height={large ? 16 : 10}
            autoComplete="off"
            placeholder={placeHolder}
            type="text"
            bg={inputBg}
            borderColor={"gray.200"}
            _hover={{
              borderColor: "purple.500",
            }}
            _focus={{
              bg: inputFocusBg,
              _placeholder: { color: "white" },
              color: "white",
              borderColor: "purple.500",
            }}
            ref={mergeRef}
            required
            {...rest}
          />
          <InputRightElement
            pt={large ? "1.5rem" : ""}
            pr={large ? "1rem" : ""}
          >
            <IoSearch size={large ? "1.5rem" : ""} />
          </InputRightElement>
        </InputGroup>
        {inputRef.current && inputRef.current?.value && (
          <Container
            borderBottomLeftRadius={1.5}
            borderBottomRightRadius={1.5}
            w={"full"}
            maxW={"full"}
            mt={large ? "16" : "10"}
            zIndex="1"
            position="absolute"
            height={200}
            bg="purple.500"
            color="white"
            overflowY="scroll"
            px="0"
            py="0"
          >
            <VStack w="full" textAlign="left" alignContent="left">
              {reactQueryResult.isLoading === true && (
                <Button isLoading={reactQueryResult.isLoading}></Button>
              )}
              <Table w="full" variant="simple">
                <Tbody>
                  {reactQueryResult.isSuccess &&
                    reactQueryResult.data.map((data: any) => {
                      return (
                        <Tr
                          key={data.id}
                          onClick={() => {
                            onClickOnResult(data);
                          }}
                        >
                          <Td textAlign="left" w={"50%"}>
                            {concept ? tc(`${data}.name`) : data[lookupName]}
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </VStack>
          </Container>
        )}
      </Box>
    );
  }
);
LookupField.displayName = "LookupField";
