import { validateEmail, validatePassword } from "@lib/user/data/validators";
import {
  AppLayout,
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

import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { IoLockClosed } from "react-icons/io5";
import {
  usePasswordForgotCheck,
  usePasswordForgotRequest,
  usePasswordForgotReset,
} from "../../data/authHooks";
import { CredentialErrorBox, CredentialInput } from "../components";

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
  const { t: t } = useTranslation("app");
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

  const setFormError = (message: string) => setError({ form: true, message });

  const action = (e: any) => {
    e?.preventDefault();
    setError(undefined);
    if (stage === ScreenStage.account) {
      if (method === LoginMethod.phone) {
        if (!phone) return setFormError(t("validation.phone.required"));
        if (phone.length < 8) return setFormError(t("validation.phone.min"));
        if (phone.length > 13) return setFormError(t("validation.phone.max"));
      } else {
        if (!email) return setFormError(t("validation.email.required"));
        if (!validateEmail(email))
          return setFormError(t("validation.email.invalid"));
      }
      sendPIN();
    } else if (stage === ScreenStage.pin) {
      if (!pin || pin.length !== 6)
        return setFormError(t("validation.pin.required"));
      mutationCheck.mutate(
        method === LoginMethod.phone
          ? { method, code: phoneCode, phone, pin }
          : { method, email, pin },
        {
          onError: (error: any) =>
            setError({ form: false, message: t(error.translationKey) }),
          onSuccess: () => {
            setPassword("");
            setPassword2("");
            setStage(ScreenStage.password);
          },
        }
      );
    } else if (stage === ScreenStage.password) {
      if (!password) return setFormError(t("validation.password.required"));
      if (
        password.length < 8 ||
        password.length > 28 ||
        !validatePassword(password)
      )
        return setFormError(t("sign-up.password-must-be-strong"));
      if (password !== password2)
        return setFormError(
          t("sign-up.password-and-confirm-password-not-matching")
        );

      mutationReset.mutate(
        method === LoginMethod.phone
          ? { method, code: phoneCode, phone, pin, password }
          : { method, email, pin, password },
        {
          onError: (error: any) =>
            setError({ form: false, message: t(error.translationKey) }),
          onSuccess: () => {
            toaster.success(t(`sign-up.password-changed-for-account`));
            router.push("/");
          },
        }
      );
    }
  };

  const sendPIN = () => {
    if (method === LoginMethod.phone && counter > 0)
      return setFormError(
        t(`sign-up.you-need-to-wait-60sec`, { sec: counter })
      );
    mutationRequest.mutate(
      method === LoginMethod.phone
        ? { method, code: phoneCode, phone }
        : { method, email },
      {
        onError: (error: any) =>
          setError({ form: false, message: t(error.translationKey) }),
        onSuccess: () => {
          toaster.success(t(`sign-up.code-sent-${method}`));
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
    <AppLayout>
      <chakra.form onSubmit={action}>
        <Flex flex="1" gap="3" flexDir="column">
          <FormControl isInvalid={!!error?.form}>
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
                      : t(`sign-in.your-email`)
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
                      {t(`sign-in.continue`)}
                    </Button>
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
                  {t(`sign-in.continue`)}
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
                    placeholder={t(`sign-up.create-password`)}
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
                    placeholder={t(`sign-up.repeat-password`)}
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
                      {t(`sign-up.password-warning`)}
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
                    {t(`sign-up.continue`)}
                  </Button>
                </Stack>
              </>
            )}

            <CredentialErrorBox mt="8" errorMsg={error?.message} />
          </FormControl>
        </Flex>
      </chakra.form>
    </AppLayout>
  );
};
