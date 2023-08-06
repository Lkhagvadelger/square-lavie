import { Profile, UserRole } from "@prisma/client";
import { Box, Stack } from "@ui/index"; 
import NextLink from "next/link";
import { UserAvatar } from "./UserAvatar";

type Props = {
  userId?: string;
  image?: string;
  profile?: Pick<Profile, "firstName" | "lastName" | "latinName" | "country">;
  email?: string | null;
  phoneNumber?: string | null;
  dob?: string | null;
  role?: UserRole;
};

export const UserDescription = (props: Props) => {
  return props.userId ? (
    <NextLink href={`/admin/user/${props.userId}`}>
      <Box>
        <UserDescriptionDetails {...props} />
      </Box>
    </NextLink>
  ) : (
    <UserDescriptionDetails {...props} />
  );
};

const UserDescriptionDetails = (props: Props) => (
  <Stack direction="row" spacing="2" align="center">
    <Box flexShrink={0} h="10" w="10">
      <UserAvatar
        role={props.role as UserRole}
        country={props.profile?.country!}
      />
    </Box>
    <Box>
      <Box fontSize="sm" fontWeight="medium" mb="1">
        {(props.profile?.firstName)}
      </Box>
      <Box fontSize="xs" color="gray.500">
        {props.phoneNumber}
      </Box>
      <Box fontSize="xs" color="gray.500">
        {props.email}
      </Box>
      <Box fontSize="xs" color="gray.500">
        {props.dob}
      </Box>
    </Box>
  </Stack>
);
