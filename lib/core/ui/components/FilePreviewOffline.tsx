import NextLink from "next/link";
import {
  Text,
  Box,
  useColorModeValue,
  Stack,
  Image,
  StackProps,
  Button,
  HStack,
} from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { BsFileEarmark } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";

export const FilePreviewOffline = ({ file }: { file: File }) => {
  const isImageFile = (mimeType: string) => {
    if (mimeType.indexOf("image/") >= 0) return true;
    return false;
  };
  return isImageFile(file.type) ? (
    <Image maxHeight={"36"} src={URL.createObjectURL(file)} alt="Image" />
  ) : (
    <Button
      gap={1}
      variant={"outlineFilePreview"}
      leftIcon={<BsFileEarmark />}
      overflow={"hidden"}
    >
      <HStack>
        <Text>{file.name}</Text>
      </HStack>
    </Button>
  );
};
