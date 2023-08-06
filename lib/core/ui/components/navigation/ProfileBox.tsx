import { Avatar } from "@chakra-ui/react";
import { getColorForString } from "generate-colors";
import { useMemo } from "react";

export const ProfileBox = ({ name }: { name: string }) => {
  const bg = useMemo(() => getColorForString(name), [name]);

  return (
    <Avatar
      borderWidth={1}
      borderRadius="50%"
      borderColor="white"
      size="sm"
      name={name}
      color="gray.900"
      fontWeight="bold"
      sx={{ "& > div": { fontSize: "0.625rem", color: "white" } }}
      bg={`rgb(${bg[0]}, ${bg[1]}, ${bg[2]})`}
    />
  );
};
