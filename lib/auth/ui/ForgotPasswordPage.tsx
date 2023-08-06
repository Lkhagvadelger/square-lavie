import { validateEmail, validatePassword } from "@lib/user/data/validators";
import {
  Button,
  chakra,
  Flex,
  FormControl,
  HStack,
  Icon,
  PinInput,
  PinInputField,
  PinInputFieldProps,
  Spinner,
  Stack,
  Text,
  toaster,
  useColorModeValue,
  VStack,
} from "@ui/index";
import {
  getCountryByPhoneCode,
  getPhoneCodeByCountry,
  isPhoneCodeAllowed,
} from "@util/countrycode";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { FiHash } from "react-icons/fi";
import { IoAt, IoLockClosed, IoRefresh } from "react-icons/io5";
import { AuthLayout } from ".";
import {
  usePasswordForgotCheck,
  usePasswordForgotRequest,
  usePasswordForgotReset,
} from "../data/authHooks";
import {
  CardCaption,
  CardOptionLink,
  CredentialErrorBox,
  CredentialInput,
} from "./components";

enum LoginMethod {
  phone = "phone",
  email = "email",
}

enum ScreenStage {
  account,
  pin,
  password,
}

export const ForgotPasswordPage = () => {
  const router = useRouter();
  const { t: ta } = useTranslation("auth");
  const { t: te } = useTranslation("error");
  const [cookie, setCookie] = useCookies(["country-code"]);
  const [method, setMethod] = useState(LoginMethod.phone);
  const [stage, setStage] = useState(ScreenStage.account);
  const [countryCode, setCountryCode] = useState("us");
  const [phoneCode, setPhoneCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [counter, setCounter] = useState(0);
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<{ message: string; form: boolean }>();
  const mutationRequest = usePasswordForgotRequest();
  const mutationCheck = usePasswordForgotCheck();
  const mutationReset = usePasswordForgotReset();

  const username = useMemo(
    () => (method === LoginMethod.phone ? phoneCode + phone : email),
    [method, phoneCode, phone, email]
  );

  const actionDisabled = useMemo(
    () =>
      stage === ScreenStage.account
        ? method === LoginMethod.phone
          ? !phone
          : !email
        : stage === ScreenStage.password
        ? !password || !password2
        : true,
    [email, method, password, password2, phone, stage]
  );

  useEffect(() => {
    if (cookie["country-code"]) {
      setCountryCode(cookie["country-code"]);
      setPhoneCode(getPhoneCodeByCountry(cookie["country-code"]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const _countryCode = getCountryByPhoneCode(phoneCode);
    if (_countryCode !== countryCode) {
      setCountryCode(_countryCode as string);
      if (_countryCode) setCookie("country-code", _countryCode, { path: "/" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneCode]);

  const setFormError = (message: string) => setError({ form: true, message });

  const action = (e: any) => {
    e?.preventDefault();
    setError(undefined);
    if (stage === ScreenStage.account) {
      if (method === LoginMethod.phone) {
        if (!isPhoneCodeAllowed(phoneCode))
          return setFormError(te("validation.country.invalid"));
        if (!phone) return setFormError(te("validation.phone.required"));
        if (phone.length < 8) return setFormError(te("validation.phone.min"));
        if (phone.length > 13) return setFormError(te("validation.phone.max"));
      } else {
        if (!email) return setFormError(te("validation.email.required"));
        if (!validateEmail(email))
          return setFormError(te("validation.email.invalid"));
      }
      sendPIN();
    } else if (stage === ScreenStage.pin) {
      if (!pin || pin.length !== 6)
        return setFormError(te("validation.pin.required"));
      mutationCheck.mutate(
        method === LoginMethod.phone
          ? { method, code: phoneCode, phone, pin }
          : { method, email, pin },
        {
          onError: (error: any) =>
            setError({ form: false, message: te(error.translationKey) }),
          onSuccess: () => {
            setPassword("");
            setPassword2("");
            setStage(ScreenStage.password);
          },
        }
      );
    } else if (stage === ScreenStage.password) {
      if (!password) return setFormError(te("validation.password.required"));
      if (
        password.length < 8 ||
        password.length > 28 ||
        !validatePassword(password)
      )
        return setFormError(ta("sign-up.password-must-be-strong"));
      if (password !== password2)
        return setFormError(
          ta("sign-up.password-and-confirm-password-not-matching")
        );

      mutationReset.mutate(
        method === LoginMethod.phone
          ? { method, code: phoneCode, phone, pin, password }
          : { method, email, pin, password },
        {
          onError: (error: any) =>
            setError({ form: false, message: te(error.translationKey) }),
          onSuccess: () => {
            toaster.success(ta(`sign-up.password-changed-for-account`));
            router.push("/");
          },
        }
      );
    }
  };

  const sendPIN = () => {
    if (method === LoginMethod.phone && counter > 0)
      return setFormError(
        ta(`sign-up.you-need-to-wait-60sec`, { sec: counter })
      );
    mutationRequest.mutate(
      method === LoginMethod.phone
        ? { method, code: phoneCode, phone }
        : { method, email },
      {
        onError: (error: any) =>
          setError({ form: false, message: te(error.translationKey) }),
        onSuccess: () => {
          toaster.success(ta(`sign-up.code-sent-${method}`));
          if (method === LoginMethod.phone) setCounter(60);
          setPin("");
          setStage(ScreenStage.pin);
        },
      }
    );
  };

  useEffect(() => {
    const timer = setTimeout(
      () => counter > 0 && setCounter(counter - 1),
      1000
    );
    return () => clearTimeout(timer);
  }, [counter]);

  const PinProps: PinInputFieldProps = {
    bg: useColorModeValue("gray.50", "gray.850"),
    ml: "1 !important",
    w: 9,
    h: 10,
  };

  useEffect(() => {
    if (stage === ScreenStage.pin) {
      if (error) setError(undefined);
      if (pin.length === 6) action(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]);

  const loaderColor = useColorModeValue("gray.200", "gray.800");

  return (
    <AuthLayout
      title={ta("sign-up.forgotpassword")}
      caption={
        stage === ScreenStage.account
          ? ta(`sign-up.forgotpassword`)
          : stage === ScreenStage.pin
          ? ta(`sign-up.enter-pin`)
          : ta(`sign-in.create-password`)
      }
      backAction={
        stage === ScreenStage.account
          ? {
              text: ta(`sign-up.back`),
              onClick: () => router.push("/auth/login"),
            }
          : stage === ScreenStage.pin
          ? {
              text: ta(`sign-up.back`),
              onClick: () => {
                setError(undefined);
                setStage(ScreenStage.account);
              },
            }
          : undefined
      }
      contentWidth="480px"
    >
      <chakra.form onSubmit={action}>
        <Flex flex="1" gap="3" flexDir="column">
          <FormControl isInvalid={!!error?.form}>
            <CardCaption
              text={
                stage === ScreenStage.account
                  ? method === LoginMethod.phone
                    ? ta(`sign-up.enter-phone-number`)
                    : ta(`sign-up.enter-email-address`)
                  : stage === ScreenStage.pin
                  ? ta(`sign-up.enter-confirmation-code`)
                  : ta(`sign-up.create-password-for`)
              }
              desc={stage === ScreenStage.account ? undefined : username ?? ""}
            />

            {stage === ScreenStage.account && (
              <>
                <CredentialInput
                  id="account-input"
                  type={method}
                  value={method === LoginMethod.phone ? phone : email}
                  setValue={(value: string) => {
                    setError(undefined);
                    (method === LoginMethod.phone ? setPhone : setEmail)(value);
                  }}
                  placeholder={
                    method === LoginMethod.phone
                      ? "✸✸✸✸✸✸✸✸"
                      : ta(`sign-in.your-email`)
                  }
                  code={phoneCode}
                  setCode={setPhoneCode}
                  error={!!error?.form}
                  button={
                    <Button
                      type="submit"
                      display={{ base: "none", sm: "flex" }}
                      px="8"
                      float="right"
                      size="md"
                      fontSize="md"
                      fontWeight="bold"
                      isLoading={mutationRequest.isLoading}
                      isDisabled={actionDisabled}
                    >
                      {ta(`sign-in.continue`)}
                    </Button>
                  }
                />
                <CardOptionLink
                  icon={method === LoginMethod.phone ? IoAt : FiHash}
                  title={ta(
                    method === LoginMethod.phone
                      ? `sign-up.use-email`
                      : `sign-up.use-phone`
                  )}
                  color="green.500"
                  action={() =>
                    setMethod(
                      method === LoginMethod.phone
                        ? LoginMethod.email
                        : LoginMethod.phone
                    )
                  }
                />
                <Button
                  type="submit"
                  display={{ base: "flex", sm: "none" }}
                  w="full"
                  mt="6"
                  size="md"
                  fontSize="md"
                  fontWeight="bold"
                  isLoading={mutationRequest.isLoading}
                  isDisabled={actionDisabled}
                >
                  {ta(`sign-in.continue`)}
                </Button>
              </>
            )}
            {stage === ScreenStage.pin &&
              (mutationRequest.isLoading || mutationCheck.isLoading ? (
                <VStack pt="2.5" pb="7">
                  <Spinner color={loaderColor} mb="px" />
                </VStack>
              ) : (
                <VStack>
                  <HStack>
                    <PinInput
                      size="sm"
                      placeholder="✸"
                      value={pin}
                      onChange={setPin}
                    >
                      <PinInputField {...PinProps} />
                      <PinInputField {...PinProps} />
                      <PinInputField {...PinProps} />
                      <PinInputField {...PinProps} />
                      <PinInputField {...PinProps} />
                      <PinInputField {...PinProps} />
                    </PinInput>
                  </HStack>
                  <CardOptionLink
                    icon={IoRefresh}
                    title={
                      !counter
                        ? ta(`sign-up.resend-code`)
                        : ta(`sign-up.resend-code-in`, { in: counter })
                    }
                    color="gray.500"
                    action={() => {
                      setError(undefined);
                      sendPIN();
                    }}
                  />
                </VStack>
              ))}
            {stage === ScreenStage.password && (
              <>
                <VStack mb="2">
                  <CredentialInput
                    id="password"
                    type="password"
                    value={password}
                    setValue={(value: string) => {
                      setError(undefined);
                      setPassword(value);
                    }}
                    placeholder={ta(`sign-up.create-password`)}
                    error={!!error?.form}
                  />
                  <CredentialInput
                    id="password2"
                    type="password"
                    value={password2}
                    setValue={(value: string) => {
                      setError(undefined);
                      setPassword2(value);
                    }}
                    placeholder={ta(`sign-up.repeat-password`)}
                    error={!!error?.form}
                  />
                </VStack>
                <Stack direction={{ base: "column", sm: "row" }} gap="3">
                  <HStack color="gray.500" verticalAlign="top">
                    <Icon
                      as={IoLockClosed}
                      mt="1"
                      mb="auto"
                      ml="4"
                      fontSize="xs"
                    />
                    <Text
                      as="span"
                      fontSize={10}
                      fontWeight="medium"
                      lineHeight="3"
                    >
                      {ta(`sign-up.password-warning`)}
                    </Text>
                  </HStack>
                  <Button
                    type="submit"
                    px="10"
                    size="md"
                    fontSize="md"
                    fontWeight="bold"
                    isLoading={mutationReset.isLoading}
                    isDisabled={actionDisabled}
                  >
                    {ta(`sign-up.continue`)}
                  </Button>
                </Stack>
              </>
            )}

            <CredentialErrorBox mt="8" errorMsg={error?.message} />
          </FormControl>
        </Flex>
      </chakra.form>
    </AuthLayout>
  );
};
