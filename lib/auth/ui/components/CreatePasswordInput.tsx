import useTranslation from "next-translate/useTranslation";
import { UseFormRegister } from "react-hook-form";
import { PasswordField } from "../PasswordField";

export const CreatePasswordInput = ({
  register,
  errors,
}: {
  register: UseFormRegister<any>;
  errors: any;
}) => {
  const { t: ta } = useTranslation("auth");
  const { t: te } = useTranslation("error");

  return (
    <>
      <PasswordField
        placeholder={ta(`sign-up.create-password`)}
        forgotPasswordLabel={""}
        label={ta("password")}
        borderColor={"blue.500"}
        background={"transparent"}
        error={errors.password}
        {...register("password", {
          required: te("validation.password.required"),
          minLength: {
            value: 8,
            message: te("validation.password.min"),
          },
        })}
      />
      <PasswordField
        placeholder={ta(`sign-up.repeat-password`)}
        forgotPasswordLabel={""}
        label={ta(`sign-up.confirm-password`)}
        borderColor={"blue.500"}
        background={"transparent"}
        error={errors.passwordConfirm}
        {...register("passwordConfirm", {
          required: te("validation.password.required"),
          minLength: {
            value: 8,
            message: te("validation.password.min"),
          },
        })}
      />
    </>
  );
};
