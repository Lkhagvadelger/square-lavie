import { forwardRef, useRef } from "react";
import { FieldError } from "react-hook-form";
import {
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
  FormErrorMessage,
  InputLeftElement,
  useColorModeValue,
} from "@ui/index";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { IoLockClosed } from "react-icons/io5";

export const PasswordField = forwardRef<
  HTMLInputElement,
  InputProps & {
    label: string;
    forgotPasswordLabel: string;
    error?: FieldError;
  }
>(({ label, forgotPasswordLabel, error, ...rest }, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const mergeRef = useMergeRefs(inputRef, ref);

  const onClickReveal = () => {
    onToggle();
    const input = inputRef.current;
    if (input) {
      input.focus({ preventScroll: true });
      const length = input.value.length * 2;
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length);
      });
    }
  };

  return (
    <FormControl id="password" isInvalid={!!error}>
      {/* <Flex justify="space-between">
        <FormLabel>{label}</FormLabel>
        <Link fontWeight="semibold" fontSize="sm">
          {forgotPasswordLabel}
        </Link>
      </Flex> */}
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="blue.500">
          <IoLockClosed />
        </InputLeftElement>
        <Input
          pl={8}
          ref={mergeRef}
          name="password"
          type={isOpen ? "text" : "password"}
          autoComplete="current-password"
          required
          {...rest}
        />
        <InputRightElement>
          <IconButton
            bg="transparent !important"
            variant="ghost"
            aria-label={isOpen ? "Mask password" : "Reveal password"}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
});

PasswordField.displayName = "PasswordField";
