import { Button, HStack, Text, Image } from "@chakra-ui/react";
import { BsFileEarmark } from "react-icons/bs";

export const FilePreviewOnline = ({
  file,
}: {
  file: { fileLink: string; fileMIMEType: string; fileSource: string };
}) => {
  const isImageFile = (mimeType: string) => {
    if (mimeType.indexOf("image/") >= 0) return true;
    return false;
  };
  return isImageFile(file.fileMIMEType) ? (
    <Image maxHeight={"36"} src={file.fileLink} alt="Image" />
  ) : (
    <Button
      gap={1}
      variant={"outlineFilePreview"}
      leftIcon={<BsFileEarmark />}
      overflow={"hidden"}
    >
      <HStack>
        <Text>{file.fileSource}</Text>
      </HStack>
    </Button>
  );
};
