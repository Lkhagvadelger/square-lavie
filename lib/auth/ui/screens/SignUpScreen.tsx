// import {
//   Box,
//   Button,
//   chakra,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Heading,
//   HStack,
//   Icon,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   Text,
//   VStack,
// } from "@chakra-ui/react";
// import { toaster } from "@ui/index";
// import useTranslation from "next-translate/useTranslation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
// import { useSignup } from "../../data/authHooks";

// //login model type
// type SignUpModel = {
//   email: string;
//   password: string;
//   passwordConfirm: string;
// };

// export const SignUpScreen = () => {
//   const { t } = useTranslation("app");
//   const [isRegistered, setIsRegistered] = useState<boolean>(false);
//   //Login mutation
//   const mutation = useSignup();

//   //Login action
//   const onSubmit = (data: SignUpModel) => {
//     mutation.mutate(data, {
//       onError: (e: any) => {
//         toaster.error(t(e.translationKey));
//       },
//       onSuccess: () => {
//         toaster.success(t("sign-up.success"));
//         setIsRegistered(true);
//       },
//     });
//   };
//   //Login form
//   const {
//     register,
//     handleSubmit,
//     getValues,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm<SignUpModel>({});
//   return (
//     <VStack my={4} flex="1" w="full" alignItems={"flex-start"}>
//       {!isRegistered ? (
//         <>
//           <Heading w="full">Менторт бүртгүүлэх</Heading>
//           <Text>Нэвтрэх имэйл хаяг, нууц үгээ оруулна уу.</Text>
//           <chakra.form w="full" onSubmit={handleSubmit(onSubmit)}>
//             <FormControl id="email" isInvalid={!!errors.email}>
//               <FormLabel variant={"normal"}>{t("email")}</FormLabel>
//               <InputGroup>
//                 <InputLeftElement pointerEvents="none" fontSize={"24px"}>
//                   <Icon color="gray.300" as={HiOutlineMail} />
//                 </InputLeftElement>
//                 <Input
//                   pl="10"
//                   pb={1}
//                   placeholder="name@example.com"
//                   type="text"
//                   {...register("email", {
//                     required: t("validation.email.required"),
//                   })}
//                 />
//               </InputGroup>

//               <FormErrorMessage>
//                 {errors.email && errors.email.message}
//               </FormErrorMessage>
//             </FormControl>
//             <FormControl id="password" isInvalid={!!errors.password}>
//               <FormLabel>{t("password")}</FormLabel>
//               <InputGroup>
//                 <InputLeftElement pointerEvents="none" fontSize={"24px"}>
//                   <Icon color="gray.300" as={HiOutlineLockClosed} />
//                 </InputLeftElement>
//                 <Input
//                   pl="10"
//                   pb={1}
//                   placeholder="••••••••••"
//                   type="password"
//                   {...register("password", {
//                     required: t("validation.password.required"),
//                   })}
//                 />
//               </InputGroup>
//               <FormErrorMessage>
//                 {errors.password && errors.password.message}
//               </FormErrorMessage>
//             </FormControl>
//             <FormControl
//               id="passwordConfirm"
//               isInvalid={!!errors.passwordConfirm}
//             >
//               <FormLabel>{t("confirm-password")}</FormLabel>
//               <InputGroup>
//                 <InputLeftElement pointerEvents="none" fontSize={"24px"}>
//                   <Icon color="gray.300" as={HiOutlineLockClosed} />
//                 </InputLeftElement>
//                 <Input
//                   pl="10"
//                   pb={1}
//                   placeholder="••••••••••"
//                   type="password"
//                   {...register("passwordConfirm", {
//                     required: t("validation.password.required"),
//                     validate: (value) =>
//                       value === getValues("password") ||
//                       t("validation.password.confirmation"),
//                   })}
//                 />
//               </InputGroup>
//               <FormErrorMessage>
//                 {errors.passwordConfirm && errors.passwordConfirm.message}
//               </FormErrorMessage>
//             </FormControl>
//             <FormErrorMessage>
//               {errors.root && errors.root.message}
//             </FormErrorMessage>
//             <Button
//               isLoading={mutation.isLoading}
//               type="submit"
//               size="md"
//               w="full"
//               mt="8"
//             >
//               {t(`signup`)}
//             </Button>
//           </chakra.form>
//         </>
//       ) : (
//         <VStack textAlign={"center"} spacing={2} mt={2}>
//           <Heading>Таны бүртгэл амжилттай үүслээ.</Heading>

//           <Text>
//             Бид таны {getValues("email")} хаягт бүртгэлээ баталгаажуулах имэйл
//             илгээсэн байгаа.
//           </Text>
//           <Text>
//             Та имэйл хаягаа шалгааж зааврын дагуу баталгаажуулах үйлдэл хийж
//             бүртгэлээ дуусгана уу.
//           </Text>
//         </VStack>
//       )}
//     </VStack>
//   );
// };
