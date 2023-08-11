import {
  Box,
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
  Text,
  VStack,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import {
  useLogin,
  usePasswordForgotRequest,
  usePasswordForgotReset,
} from "../../data/authHooks";

//login model type
type ForgotPasswordModel = {
  email: string;
};

export const ForgotPassword = () => {
  const { t } = useTranslation("app");
  const router = useRouter();
  //Login mutation
  const mutationRequest = usePasswordForgotRequest();

  //Login action
  const onSubmit = (data: ForgotPasswordModel) => {
    mutationRequest.mutate(data, {
      onError: (e: any) => {},
      onSuccess: (data) => {},
    });
  };
  //Login form
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ForgotPasswordModel>({});
  return (
    <VStack my={4} flex="1" w="full" alignItems={"flex-start"}>
      <Heading w="full">Нууц үг сэргээх</Heading>
      <Text>Бүртгэлтэй имэйл хаягаа оруулна уу.</Text>
      <chakra.form w="full" onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="email" isInvalid={!!errors.email}>
          <FormLabel variant={"normal"}>{t("email")}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={HiOutlineMail} />
            </InputLeftElement>
            <Input
              pl="10"
              pb={1}
              placeholder="name@example.com"
              type="text"
              {...register("email", {
                required: t("validation.email.required"),
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" size="md" w="full" mt="8">
          {t(`login`)}
        </Button>
      </chakra.form>
    </VStack>
  );
};
