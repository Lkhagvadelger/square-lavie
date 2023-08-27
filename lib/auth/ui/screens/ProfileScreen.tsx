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
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUser,
  HiUser,
} from "react-icons/hi";
import {
  useLogin,
  useRequestOneTimeCode,
  useUpdateProfile,
} from "../../data/authHooks";

//login model type
type ProfileModal = {
  email: string;
  firstName: string;
  lastName: string;
};

export const ProfileScreen = ({ onClose }: { onClose: () => void }) => {
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
  } = useForm<ProfileModal>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  const router = useRouter();
  //Login mutation
  const mutation = useUpdateProfile();

  const updateProfile = () => {};

  return (
    <VStack my={4} flex="1" w="full" alignItems={"flex-start"}>
      <Heading w="full">Profile</Heading>
      <Text>Continue with phone number.</Text>
      <chakra.form w="full" onSubmit={handleSubmit(updateProfile)}>
        <FormControl id="email" isInvalid={!!errors.email}>
          <FormLabel variant={"normal"}>Email</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={HiOutlinePhone} />
            </InputLeftElement>
            <Input
              pl="10"
              type="text"
              {...register("email", {
                required: "email is required",
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="firstName" isInvalid={!!errors.firstName}>
          <FormLabel variant={"normal"}>firstName</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={HiUser} />
            </InputLeftElement>
            <Input
              pl="10"
              placeholder="First name"
              type="text"
              {...register("firstName", {
                required: "First name is required",
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="lastName" isInvalid={!!errors.lastName}>
          <FormLabel variant={"normal"}>Last Name</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize={"24px"}>
              <Icon color="gray.300" as={HiOutlineUser} />
            </InputLeftElement>
            <Input
              pl="10"
              type="text"
              placeholder="Last name"
              {...register("lastName", {
                required: "Last name is required",
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" size="md" w="full" mt="8">
          Update
        </Button>
      </chakra.form>
    </VStack>
  );
};
