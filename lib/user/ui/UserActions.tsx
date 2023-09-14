import { useRouter } from "next/router";
import { ButtonGroup, IconButton, toaster, Tooltip } from "@ui/index";
import { UserRole } from "@prisma/client";
import { FiUser } from "react-icons/fi";
import {
  RiDeleteBack2Line,
  RiDeleteBin2Line,
  RiDeleteRow,
  RiProfileLine,
} from "react-icons/ri";

export const UserActions = ({
  rowData,
  refetch,
}: {
  rowData: any;
  refetch: () => void;
}) => {
  const router = useRouter();

  return (
    <ButtonGroup
      spacing="0"
      colorScheme="green"
      variant="ghost"
      size="sm"
      float="left"
    >
      <Tooltip label="User Profile">
        <IconButton
          icon={<FiUser />}
          aria-label="User Profile"
          onClick={() => router.push(`/admin/user/${rowData.id}`)}
        />
      </Tooltip>
    </ButtonGroup>
  );
};
