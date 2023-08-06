import useTranslation from "next-translate/useTranslation";
import {
  Button,
  chakra,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  toaster,
  Box,
  HStack,
  Select,
  useColorModeValue,
} from "@ui/index";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoArrowDown, IoCallSharp } from "react-icons/io5";
import { Country, UserRole } from "@prisma/client";
import { Select as ReactSelect } from "chakra-react-select";
import { useState } from "react";
import { faker } from "@faker-js/faker";
import {
  getAllowedCountryPhoneCode,
  getPhoneCodeByCountry,
} from "@util/countrycode";

type selectInput = {
  value: any;
  label: string;
};

export type InviteInput = {
  firstName: string;
  lastName: string;
  email?: string;
  countryCode: string;
  country?: Country;
  phoneNumber: string;
  role?: UserRole;
  latinName?: string;
  sex?: string;
  dob?: string;
  hospitalId?: string;
};

export const AuthFormAdminInvite = ({
  onComplete,
  role,
  initialCountry,
}: {
  onComplete: () => void;
  role?: UserRole;
  initialCountry: Country;
}) => {
  const { t: ta } = useTranslation("auth");
  const { t: to } = useTranslation("common");
  const { t: te } = useTranslation("error");

  const defaultValues = {
    countryCode: getPhoneCodeByCountry(initialCountry || Country.mn),
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: initialCountry || Country.mn,
    latinName: "",
    role: role || UserRole.LOCAL_DOCTOR,
    email: "",
    dob: "",
    sex: "",
  };
  if (process.env.NODE_ENV !== "production") {
    defaultValues.country = Country.mn;
    defaultValues.countryCode = getPhoneCodeByCountry(defaultValues.country);
    defaultValues.firstName = faker.name.firstName();
    defaultValues.lastName = faker.name.lastName();
    defaultValues.latinName = `${defaultValues.firstName} ${defaultValues.lastName}`;
    defaultValues.phoneNumber = faker.phone.phoneNumber("00000000");
    defaultValues.email = faker.internet.email(
      defaultValues.firstName,
      defaultValues.lastName
    );
  }

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InviteInput>({
    defaultValues: defaultValues,
  });
  watch("countryCode");
  watch("country");
  const allowedCountries = getAllowedCountryPhoneCode();

  const onPhoneSubmit: SubmitHandler<InviteInput> = (authInput) => {
    if (
      allowedCountries.filter((r) => r === getValues("countryCode")).length == 0
    ) {
      toaster.error(te("validation.country.invalid"));
      return;
    }
    if (selectedCountry.value === Country.mn) {
      if (!authInput.latinName) {
        toaster.error("latin name missing");
        return;
      }
    } else {
      authInput.latinName = authInput.firstName + " " + authInput.lastName;
    }
    authInput.role = selectedRole.value;
    if (!authInput.email) authInput.email = undefined;

    if (selectedRole.value === UserRole.PATIENT) {
      if (!authInput.sex)
        return toaster.error(te(`validation.patient.sex.required`));
  
    } else if (!authInput.email) return toaster.error("Email address required");
    if (authInput.email == "") authInput.email = undefined;
    // inviteMutation.mutate(authInput, {
    //   onSuccess: () => {
    //     toaster.success(
    //       ta(`sign-up.invitation-sent-phone-number`, {
    //         phone: `${authInput.countryCode}-${authInput.phoneNumber}`,
    //       })
    //     );
    //     onComplete();
    //   },
    // });
  };

  const roleList: selectInput[] = Object.keys(UserRole).map((r, ii) => ({
    label: ta("role." + r),
    value: r,
  }));
  const countryList: selectInput[] = Object.keys(Country).map((c, ii) => ({
    label: ta("country-name." + c),
    value: c,
  }));
  const sexList: selectInput[] = [
    {
      label: to("sex.male"),
      value: "male",
    },
    {
      label: to("sex.female"),
      value: "female",
    },
  ];
  const [selectedRole, setSelectedRole] = useState(
    roleList.filter((r) => r.value == getValues("role"))[0]
  );
  const [selectedCountry, setSelectedCountry] = useState(
    countryList.filter((r) => r.value == getValues("country"))[0]
  );
  const [selectedSex, setSelectedSex] = useState({
    label: "",
    value: "",
  });
  return (
    <chakra.form onSubmit={handleSubmit(onPhoneSubmit)}>
      <HStack spacing={8}>
        <FormControl id="role" isInvalid={!!errors.role}>
          <FormLabel>Role</FormLabel>
          <ReactSelect
            placeholder={"Select Role"}
            size={"md"}
            value={selectedRole}
            options={roleList}
            onChange={(bambar: any) => {
              setSelectedRole(bambar);
            }}
          />
          <FormErrorMessage>
            {errors.role && errors.role.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="country" isInvalid={!!errors.firstName}>
          <FormLabel>Country</FormLabel>
          <ReactSelect
            placeholder={"Select country"}
            size={"md"}
            value={selectedCountry}
            options={countryList}
            onChange={(bambar: any) => {
              setSelectedCountry(bambar);
              setValue("countryCode", getPhoneCodeByCountry(bambar.value));
              setValue("country", bambar.value);
            }}
          />
          <FormErrorMessage>
            {errors.country && errors.country.message}
          </FormErrorMessage>
        </FormControl>
      </HStack>
      <HStack spacing={8} mt={5}>
        <FormControl id="firstName" isInvalid={!!errors.firstName}>
          <FormLabel>{ta("first-name")}</FormLabel>
          <Input
            type="text"
            {...register("firstName", {
              required: te("validation.first-name.required"),
            })}
          />
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="lastName" isInvalid={!!errors.lastName}>
          <FormLabel>{ta("last-name")}</FormLabel>
          <Input
            type="text"
            {...register("lastName", {
              required: te("validation.last-name.required"),
            })}
          />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>
        {selectedCountry.value === Country.mn && (
          <FormControl id="latinName" isInvalid={!!errors.latinName}>
            <FormLabel>Latin name</FormLabel>
            <Input
              type="text"
              {...register("latinName", {
                required: te("validation.latin-name.required"),
              })}
            />
            <FormErrorMessage>
              {errors.latinName && errors.latinName.message}
            </FormErrorMessage>
          </FormControl>
        )}
      </HStack>

      <HStack mt={5} spacing={8}>
        <FormControl id="phoneNumber" isInvalid={!!errors.phoneNumber}>
          <FormLabel>{ta("phone-number")}</FormLabel>
          <HStack
            position={"relative"}
            border={"1px"}
            borderRadius={"3px"}
            borderColor={"gray.200"}
            backgroundColor={useColorModeValue("gray.100", "gray.850")}
            h={10}
          >
            <Box ml={2}>
              <IoCallSharp />
            </Box>
            <Box mr={"-1"} fontWeight={300} fontSize="xs">
              <Select
                top="0"
                left="0"
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
              ></Select>
              <Text>{getValues("countryCode")}</Text>
            </Box>
            <Input
              fontSize={12}
              border={"none"}
              variant={"unstyled"}
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
          <FormErrorMessage>
            {errors.phoneNumber && errors.phoneNumber.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="email" isInvalid={!!errors.email}>
          <FormLabel>{ta("email-address")}</FormLabel>
          <Input type="email" autoComplete="email" {...register("email", {})} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
      </HStack>
      {selectedRole.value == UserRole.PATIENT && (
        <HStack mt={5} spacing={8}>
          <FormControl id="sex" isInvalid={!!errors.sex}>
            <FormLabel>{ta("sex")}</FormLabel>
            <ReactSelect
              placeholder={"Select country"}
              size={"md"}
              value={selectedSex}
              options={sexList}
              onChange={(bambar: any) => {
                setSelectedSex(bambar);
                setValue("sex", bambar.value);
              }}
            />
            <FormErrorMessage>
              {errors.sex && errors.sex.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="dob" isInvalid={!!errors.dob}>
            <FormLabel>{to("date-of-birth")}</FormLabel>
            <Input type="date" {...register("dob")} />
            <FormErrorMessage>
              {errors.dob && errors.dob.message}
            </FormErrorMessage>
          </FormControl>
        </HStack>
      )}
      <Button
        type="submit"
        size="md"
        w="full"
        mt="5"
        ml="auto"
        fontWeight="700"
      >
        {ta(`sign-up.continue`)}
      </Button>
    </chakra.form>
  );
};
