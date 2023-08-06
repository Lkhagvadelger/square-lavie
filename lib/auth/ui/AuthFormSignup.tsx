import {
  usePhoneConfirmation,
  usePhoneVerification,
  useSignup,
} from "@lib/auth/data/authHooks";
import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  ListItem,
  PinInput,
  PinInputField,
  Select,
  Stack,
  Text,
  toaster,
  UnorderedList,
  useColorModeValue,
  VStack,
} from "@ui/index";
import {
  CountryPhoneCodes,
  getAllowedCountryPhoneCode,
} from "@util/countrycode";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoArrowBack, IoArrowDown, IoCallSharp } from "react-icons/io5";
import { getRootUrl } from "../data/types";
import { PasswordFieldWithConfirm } from "./PasswordFieldWithConfirm";

type FormValues = {
  phoneNumber: string;
  confirmationCode?: string;
  isCodeSent: boolean;
  isConfirmed: boolean;
  countryCode: string;
  password: string;
  passwordConfirm: string;
  freeToLeave: boolean;
  fullPhoneNumber?: string;
};

const translationPart = "sign-up";

export const AuthFormSignup = () => {
  const phoneVerificationMutation = usePhoneVerification();
  const phoneConfirmationMutation = usePhoneConfirmation();
  const signUpMutation = useSignup();
  const headingColor = useColorModeValue("red.500", "yellow.500");
  const router = useRouter();
  const { t } = useTranslation("auth");
  const { t: to } = useTranslation("common");
  const { t: te } = useTranslation("error");
  const [cookie, setCookie] = useCookies(["phone-code"]);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      countryCode: cookie["phone-code"] || "+1",
      isCodeSent: false,
      freeToLeave: true,
      isConfirmed: false,
    },
  });
  const isCodeSentWatch = watch("isCodeSent", false);
  const isConfirmedWatch = watch("isConfirmed", false);
  const freeToLeaveWatch = watch("freeToLeave", false);

  const allowedCountries = getAllowedCountryPhoneCode();

  const countryCode = watch("countryCode");

  useEffect(() => {
    if (countryCode && cookie["phone-code"] !== countryCode)
      setCookie("phone-code", countryCode, { path: "/" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode]);

  useEffect(() => {
    if (cookie["phone-code"] && cookie["phone-code"] !== countryCode)
      setValue("countryCode", cookie["phone-code"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookie]);

  const onPasswordSubmit: SubmitHandler<FormValues> = (authInput) => {
    signUpMutation.mutate(authInput, {
      onSuccess: (user) => {
        setValue("freeToLeave", true);
        const nextPath: string = router.query.redirectTo
          ? router.query.redirectTo.toString()
          : getRootUrl(user) || "/";
        router.push(nextPath);
      },
    });
  };
  const onPhoneSubmit: SubmitHandler<FormValues> = (authInput) => {
    if (
      allowedCountries.filter((r) => r === getValues("countryCode")).length == 0
    ) {
      toaster.error(te("validation.country.invalid"));
      return;
    }

    phoneVerificationMutation.mutate(authInput, {
      onSuccess: (message: any) => {
        toaster.success(t(`${translationPart}.code-sent-phone`));
        setValue("isCodeSent", message.valid);
        setValue("fullPhoneNumber", message.fullPhoneNumber);
        setValue("freeToLeave", false);
      },
    });
  };
  const onPinInputComplete = (pin: string) => {
    setValue("confirmationCode", pin);
    {
      handleSubmit(onCodeSubmit)();
    }
  };
  const onCodeSubmit: SubmitHandler<FormValues> = (authInput) => {
    phoneConfirmationMutation.mutate(authInput, {
      onSuccess: (message: any) => {
        if (!message.valid) {
          toaster.error(t("invalid-code-please-try-again"));
          return;
        }
        toaster.success(t(`${translationPart}.phone-number-confirmed`));
        setValue("isConfirmed", message.valid);
      },
    });
  };
  const backToPhoneInput = () => {
    if (confirm(t(`${translationPart}.go-back-warning`))) {
      setValue("isCodeSent", false);
      setValue("freeToLeave", true);
    }
  };

  //using this listener to prevent user accidentally leave the page in middle of signup proccess
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const alertUser = (e: any) => {
    if (getValues("freeToLeave") === false) {
      e.preventDefault();
      e.returnValue = "";
    }
  };
  return (
    <>
      <chakra.form p={{ base: 2, sm: 8, md: 0, lg: 8 }}>
        {getValues("isCodeSent") === false ? (
          <Flex
            flex={1}
            gap={{ base: 16, lg: 28 }}
            flexDirection={{ base: "column", md: "row" }}
            flexWrap={"wrap"}
            alignItems={"normal"}
          >
            <Flex flex={1} gap={3} flexDir={"column"}>
              <Heading variant={"yellowPurple"} textTransform={"capitalize"}>
                {t(`${translationPart}.sign-up`)}
              </Heading>
              <Text fontSize="lg" fontWeight={500}>
                {t(`${translationPart}.create-account-desc`)}
              </Text>
              <Text color={"blue.500"} fontSize="sm" fontWeight={500}>
                {t(`${translationPart}.enter-phone-number`)}
              </Text>
              <Stack
                direction="row"
                spacing={1}
                align="center"
                alignItems={"flex-start"}
              >
                <FormControl id="phoneNumber" isInvalid={!!errors.phoneNumber}>
                  <Box
                    border={"1px"}
                    borderRadius={"3px"}
                    borderColor={"blue.500"}
                    h={9}
                  >
                    <HStack>
                      <Box pl={2}>
                        <IoCallSharp />
                      </Box>
                      <Box mr={"-1"} fontWeight={300} fontSize="xs">
                        <Select
                          top="0"
                          left="0"
                          border={"2px"}
                          borderColor={"red"}
                          zIndex={1}
                          bottom={0}
                          opacity={0}
                          w={8}
                          height="100%"
                          position="absolute"
                          ml={6}
                          color="transparent"
                          icon={<IoArrowDown />}
                          {...register("countryCode")}
                        >
                          <optgroup>
                            {CountryPhoneCodes.map((value) => (
                              <option
                                key={`country-${value.country}`}
                                value={value.code}
                              >
                                {to(`country-name.${value.country}`)}
                              </option>
                            ))}
                          </optgroup>
                        </Select>
                        <Text pb={0.5}>{getValues("countryCode")}</Text>
                      </Box>
                      <Input
                        variant={"loginphone"}
                        autoComplete="off"
                        {...register("phoneNumber", {
                          required: "Phone number is required",
                          maxLength: {
                            value: 13,
                            message: "Phone number must be less than 13 digit",
                          },
                          minLength: {
                            value: 8,
                            message: "Phone number must be at least 8 digit",
                          },
                        })}
                        placeholder={"✹✹✹✹✹✹✹✹"}
                      />
                    </HStack>
                  </Box>

                  <FormErrorMessage>
                    {errors.phoneNumber && errors.phoneNumber.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  size="md"
                  w="full"
                  maxW="120px"
                  mt="6"
                  ml="auto"
                  height="9"
                  fontSize="sm"
                  fontWeight="700"
                  mb="auto"
                  onClick={handleSubmit(onPhoneSubmit)}
                  isLoading={phoneVerificationMutation.isLoading}
                >
                  {t(`${translationPart}.continue`)}
                </Button>
              </Stack>
              <Box mt={6} fontSize="sm">
                <HelpTextTranslation />
              </Box>
            </Flex>
            <Flex
              maxW={"96"}
              flex={1}
              gap={5}
              flexDir={"column"}
              w={["100%", "100%", "100%"]}
            >
              <Heading
                as={"span"}
                variant={"main"}
                fontWeight={"200"}
                fontSize="4xl"
                color={"pink.500"}
                textTransform={"capitalize"}
              >
                {t(`${translationPart}.join-today`)}
              </Heading>
              <Flex h={24} flexDir={"row"} flexWrap={"wrap"}>
                <Image
                  mr={"auto"}
                  src="/community.png"
                  alt="community"
                  height={"inherit"}
                />
                <Image
                  m={"auto"}
                  src="/self_care.png"
                  alt="community"
                  height={"inherit"}
                />
                <Image
                  ml={"auto"}
                  src="/doctor.png"
                  alt="community"
                  height={"inherit"}
                />
              </Flex>
              <UnorderedList>
                <ListItem>
                  {t(`${translationPart}.access-to-us-medical`)}
                </ListItem>
              </UnorderedList>
              <UnorderedList>
                <ListItem>
                  {t(`${translationPart}.bi-lingual-support`)}
                </ListItem>
              </UnorderedList>
              <UnorderedList>
                <ListItem>
                  <Box color={"green.400"}>
                    <ClickToLoginTranslation />
                  </Box>
                </ListItem>
              </UnorderedList>
            </Flex>
          </Flex>
        ) : (
          <></>
        )}
        {getValues("isCodeSent") === true &&
        getValues("isConfirmed") === false ? (
          <Box maxW={"315px"} m={"auto"}>
            <Flex flex={1} gap={3} flexWrap={"wrap"} flexDir={"column"}>
              <VStack
                position={"absolute"}
                textTransform={"uppercase"}
                borderRadius={"3px"}
                pt={1}
                onClick={backToPhoneInput}
                color={headingColor}
                ml={-16}
                mt={3}
                w={6}
                h={6}
                bg={"gray.900"}
              >
                <Box fontSize="md">
                  <IoArrowBack />
                </Box>
                <Box fontSize={8}>{t(`${translationPart}.back`)}</Box>
              </VStack>
              <Heading
                as={"span"}
                variant={"main"}
                fontWeight={"200"}
                fontSize="4xl"
                color={headingColor}
              >
                {t(`${translationPart}.enter-code`)}
              </Heading>
              <Text size={"md"}>
                {t(`${translationPart}.enter-confirmation-code`, {
                  phonenumber: getValues("phoneNumber"),
                })}
              </Text>
              <Link>({t(`${translationPart}.resend-code`)})</Link>
              <HStack m={"auto"}>
                {phoneConfirmationMutation.isLoading === false && (
                  <PinInput
                    size={"sm"}
                    onComplete={(value) => onPinInputComplete(value)}
                  >
                    <PinInputField
                      _placeholder={{ color: "blue.500" }}
                      borderColor={"blue.500"}
                    />
                    <PinInputField
                      _placeholder={{ color: "blue.500" }}
                      borderColor={"blue.500"}
                    />
                    <PinInputField
                      _placeholder={{ color: "blue.500" }}
                      borderColor={"blue.500"}
                    />
                    <PinInputField
                      _placeholder={{ color: "blue.500" }}
                      borderColor={"blue.500"}
                    />
                    <PinInputField
                      _placeholder={{ color: "blue.500" }}
                      borderColor={"blue.500"}
                    />
                    <PinInputField
                      _placeholder={{ color: "blue.500" }}
                      borderColor={"blue.500"}
                    />
                  </PinInput>
                )}
                {phoneConfirmationMutation.isLoading === true && (
                  <Button
                    isLoading={phoneConfirmationMutation.isLoading}
                  ></Button>
                )}
              </HStack>
              <Box mt={6} fontSize="sm">
                <HelpTextTranslation />
              </Box>
            </Flex>
          </Box>
        ) : (
          <></>
        )}
        {getValues("isConfirmed") === true ? (
          <Box maxW={"315px"} m={"auto"}>
            <Flex flex={1} gap={3} flexWrap={"wrap"} flexDir={"column"}>
              <Heading
                as={"span"}
                variant={"main"}
                fontWeight={"200"}
                fontSize="4xl"
                color={headingColor}
              >
                {t(`${translationPart}.create-password`)}
              </Heading>
              <Text fontSize="lg" fontWeight={500}>
                {t(`${translationPart}.thanks-message`)}
              </Text>
              <Text fontSize="xs" color={"blue.500"} fontWeight={500}>
                {t(`${translationPart}.password-warning`)}
              </Text>
              <PasswordFieldWithConfirm
                label={t("password")}
                borderColor={"blue.500"}
                background={"transparent"}
                confirmLabel={t("confirm-password")}
                error={errors.password}
                {...register("password", {
                  required: te("validation.password.required"),
                  minLength: {
                    value: 8,
                    message: te("validation.password.min"),
                  },
                })}
              />
              <Button
                type="submit"
                size="md"
                w="full"
                maxW="120px"
                ml="auto"
                fontSize="sm"
                onClick={handleSubmit(onPasswordSubmit)}
                isLoading={signUpMutation.isLoading}
              >
                {t(`${translationPart}.continue`)}
              </Button>
              <Box mt={6} fontSize="sm">
                <HelpTextTranslation />
              </Box>
            </Flex>
          </Box>
        ) : (
          <></>
        )}
      </chakra.form>
    </>
  );
};

const HelpTextTranslation = () => {
  return (
    <Trans
      i18nKey={`auth:sign-up.need-help-desc`}
      components={[
        <Link
          color={"green.500"}
          key={0}
          href="tel:+97672702000"
          target={"_blank"}
        ></Link>,
        <Link
          textDecor={"underline"}
          color={"green.500"}
          key={1}
          href="mailto:support@gmail.com"
          target={"_blank"}
        ></Link>,
      ]}
    />
  );
};
const ClickToLoginTranslation = () => {
  return (
    <Trans
      i18nKey={`auth:sign-up.click-to-login`}
      components={[
        <NextLink key={0} href="/auth/login" />,
        <Text
          as="span"
          textDecoration={"none"}
          key={1}
          color={useColorModeValue("black", "white")}
        />,
      ]}
    />
  );
};
