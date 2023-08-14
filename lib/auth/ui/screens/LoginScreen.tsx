import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  PinInput,
  PinInputField,
  Text,
  VStack,
} from "@chakra-ui/react";
import { toaster } from "@ui/index";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { useLogin, useRequestOneTimeCode } from "../../data/authHooks";

//login model type
type LoginModel = {
  phoneNumber: string;
  token: string;
  pin: string;
  showPin: boolean;
};

export const LoginScreen = ({
  redirectTo,
  onClose,
}: {
  redirectTo?: string;
  onClose: () => void;
}) => {
  //Login form
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginModel>({
    defaultValues: {
      phoneNumber: "",
      token: "",
    },
  });
  watch(["pin"]);
  const requestCodeMutation = useRequestOneTimeCode();

  const router = useRouter();
  //Login mutation
  const mutation = useLogin();
  const getCodeAndDoLogin = () => {
    const body = {
      username: getValues("phoneNumber").toLowerCase(),
      method: "phone",
      code: "+976",
    };

    if (getValues("showPin") !== true) {
      requestCodeMutation.mutate(body, {
        onError: (error: any) =>
          setError("phoneNumber", { message: error.translationKey }),
        onSuccess: () => {
          setValue("showPin", true);
          toaster.success("We sent you a code to your phone number");
        },
      });
      return;
    }

    if (!getValues("pin") || getValues("pin").length != 6)
      return setError("pin", {
        message: "6 digit pin is required",
      });

    mutation.mutate(
      { ...body, pin: getValues("pin") },
      {
        onError: (error: any) =>
          setError("pin", { message: "Please " + error.translationKey }),
        onSuccess: (data: any) => {
          goToAppHome();
        },
      }
    );
  };
  const goToAppHome = () => {
    //after login send to app home
    onClose();
  };

  const onPinChange = (value: string) => {
    clearErrors("pin");
    setValue("pin", value);
  };
  return (
    <VStack my={4} flex="1" w="full" alignItems={"flex-start"}>
      <Heading w="full">Continue with phone number</Heading>
      <Text>Continue with phone number.</Text>
      <chakra.form w="full" onSubmit={handleSubmit(getCodeAndDoLogin)}>
        <FormControl id="phoneNumber" isInvalid={!!errors.phoneNumber}>
          <FormLabel variant={"normal"}>Phone number</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={HiOutlinePhone} />
            </InputLeftElement>
            <Input
              pl="10"
              type="text"
              {...register("phoneNumber", {
                required: "phone number is required",
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.phoneNumber && errors.phoneNumber.message}
          </FormErrorMessage>
        </FormControl>
        {getValues("showPin") && (
          <FormControl id="phoneOrEmail" isInvalid={!!errors.pin}>
            <FormLabel variant={"nourish"}>Pin</FormLabel>
            <HStack justify="space-between">
              <PinInput
                size={"md"}
                isInvalid={!!errors.pin}
                onChange={onPinChange}
                value={getValues("pin")}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <FormErrorMessage>
              {errors.pin && errors.pin.message}
            </FormErrorMessage>
          </FormControl>
        )}

        <Button type="submit" size="md" w="full" mt="8">
          Login
        </Button>
      </chakra.form>
    </VStack>
  );
};
