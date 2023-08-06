import { ReactNode, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { InputGroup } from "@ui/index";

type FileUploadProps = {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
  onChange?: () => void;
  disabled?: boolean;
};

export const FileUpload = (props: FileUploadProps) => {
  const { register, accept, multiple, children, onChange, disabled } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick} onChange={onChange} width={"auto"}>
      <input
        type="file"
        disabled={disabled || false}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      {children}
    </InputGroup>
  );
};
