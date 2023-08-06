import { usePasswordCreate } from "@lib/auth/data/authHooks";
import { validatePassword } from "@lib/user/data/validators";
import {
  Button,
  chakra,
  Flex,
  FormControl,
  HStack,
  Icon,
  Stack,
  Text,
  toaster,
  VStack,
} from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { IoLockClosed } from "react-icons/io5";
import { AuthLayout } from ".";
import { CardCaption, CredentialErrorBox, CredentialInput } from "./components";

export const CreatePasswordPage = () => {
  const router = useRouter();
  const { t: ta } = useTranslation("auth");
  const { t: te } = useTranslation("error");
  const [token, username] = useMemo(
    () => [
      router.query?.token,
      router.query?.phone
        ? `${router.query?.phone}`
        : router.query?.email
        ? `${router.query?.email}`
        : null,
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.query]
  );
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<{ form?: boolean; message: string }>();
  const mutation = usePasswordCreate();

  const actionDisabled = useMemo(
    () => !password || !password2,
    [password, password2]
  );
  const setFormError = (message: string) => setError({ form: true, message });

  const action = (e: any) => {
    e.preventDefault();
    if (!token) return setError({ message: ta("sign-up.token-not-found") });
    if (
      !password ||
      password.length < 8 ||
      password.length > 28 ||
      !validatePassword(password)
    )
      return setFormError(ta("sign-up.password-must-be-strong"));
    if (password !== password2)
      return setFormError(
        ta("sign-up.password-and-confirm-password-not-matching")
      );

    mutation.mutate(
      { token, password },
      {
        onError: (error: any) =>
          setError({ form: false, message: te(error.translationKey) }),
        onSuccess: (result) => {
          toaster.success(ta(`sign-up.password-created-for-account`));
          router.push("/");
        },
      }
    );
  };

  return (
    <AuthLayout
      title={ta(`sign-in.create-password`)}
      caption={ta(`sign-in.create-password`)}
      contentWidth="480px"
    >
      <chakra.form onSubmit={action}>
        <Flex flex="1" gap="3" flexDir="column">
          <FormControl isInvalid={!!error?.form}>
            <CardCaption
              text={ta(`sign-up.create-password-for`)}
              desc={username ?? ""}
            />

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
                <Icon as={IoLockClosed} mt="1" mb="auto" ml="4" fontSize="xs" />
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
                isLoading={mutation.isLoading}
                isDisabled={actionDisabled}
              >
                {ta(`sign-up.continue`)}
              </Button>
            </Stack>

            <CredentialErrorBox mt="8" errorMsg={error?.message} />
          </FormControl>
        </Flex>
      </chakra.form>
    </AuthLayout>
  );
};
