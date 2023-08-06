import { useLogin } from "@lib/auth/data/authHooks";
import { validateEmail } from "@lib/user/data/validators";
import { Button, Flex, FormControl, chakra } from "@ui/index";
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
import { IoAt, IoHelpCircleOutline } from "react-icons/io5";

export const Home = () => {
  const router = useRouter();
  const { t: ta } = useTranslation("auth");
  const { t: te } = useTranslation("error");
  const [cookie, setCookie] = useCookies(["country-code"]);
  const [askPassword, setAskPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("us");
  const [phoneCode, setPhoneCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ message: string; form: boolean }>();
  const mutation = useLogin();

  const setFormError = (message: string) => setError({ form: true, message });

  return (
    <AuthLayout
      title={ta("login")}
      caption={ta(
        !askPassword ? `sign-in.title-welcome` : `sign-in.title-password`
      )}
      backAction={
        askPassword
          ? {
              text: ta(`sign-in.back`),
              onClick: () => {
                setError(undefined);
                setPassword("");
                setAskPassword(false);
              },
            }
          : undefined
      }
      contentWidth="480px"
    >
      <chakra.form onSubmit={action}>
        <Flex flex="1" gap="3" flexDir="column">
          <FormControl isInvalid={!!error?.form}>
            {!askPassword && (
              <CardCaption text={ta(`sign-in.enter-${method}`)} />
            )}
            {askPassword && (
              <CardCaption
                text={ta(`sign-in.enter-password-for-${method}`)}
                desc={username}
              />
            )}

            <CredentialInput
              id="login-input"
              type={!askPassword ? method : "password"}
              value={
                !askPassword
                  ? method === LoginMethod.phone
                    ? phone
                    : email
                  : password
              }
              setValue={(value: string) => {
                setError(undefined);
                (!askPassword
                  ? method === LoginMethod.phone
                    ? setPhone
                    : setEmail
                  : setPassword)(value);
              }}
              placeholder={
                !askPassword
                  ? method === LoginMethod.phone
                    ? "✸✸✸✸✸✸✸✸"
                    : ta(`sign-in.your-email`)
                  : "✸✸✸✸✸✸✸✸"
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
                  isLoading={mutation.isLoading}
                  isDisabled={actionDisabled}
                >
                  {ta(`sign-in.continue`)}
                </Button>
              }
            />

            {!askPassword ? (
              <CardOptionLink
                icon={method === LoginMethod.phone ? IoAt : FiHash}
                title={ta(
                  method === LoginMethod.phone
                    ? `sign-in.login-with-email`
                    : `sign-in.login-with-phone`
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
            ) : (
              <CardOptionLink
                icon={IoHelpCircleOutline}
                title={ta(`sign-in.forgot-password`)}
                color="gray.500"
                action={() => router.push("/auth/forgotpassword")}
              />
            )}
            <Button
              type="submit"
              display={{ base: "flex", sm: "none" }}
              w="full"
              mt="6"
              size="md"
              fontSize="md"
              fontWeight="bold"
              isLoading={mutation.isLoading}
              isDisabled={actionDisabled}
            >
              {ta(`sign-in.continue`)}
            </Button>
          </FormControl>

          <CredentialErrorBox
            errorMsg={error?.message}
            errorDesc={ta(`sign-in.login-error-desc`)}
          />
        </Flex>
      </chakra.form>
    </AuthLayout>
  );
};
