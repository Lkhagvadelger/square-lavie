import { useUserList } from "@lib/user/data/userHooks";
import { UserRole } from "@prisma/client";
import { Pagination } from "@ui/components/Pagination";
import { useQueryParam } from "@ui/hooks/query-param";
import { Badge, Box, Pill, TableContent, Text } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import TimeAgo from "react-timeago";
import { UserActions } from "./UserActions";
import { UserDescription } from "./UserDescription";
import { UsersTableActions } from "./UserTableActions";

export const columns = [
  {
    Header: "Member",
    Cell: (data: any) => <UserDescription userId={data.id} {...data} />,
  },
  {
    Header: "Role",
    Cell: (data: any) => <Badge fontSize="11px">{data.role}</Badge>,
  },
  {
    Header: "Specialty",
    Cell: (data: any) => (
      <>
        <Text fontSize="xs" color="gray.800" mt="1">
          {data.profile?.specialistDesc}
        </Text>
      </>
    ),
  },
  {
    Header: "Hospital",
    Cell: (data: any) => <Text>{data.hospital?.hospitalName}</Text>,
  },
  {
    Header: "Status",
    Cell: (data: any) => (
      <>
        {data.inviteToken &&
          (!data.isTokenUsed ? (
            <Box>
              <Pill color="orange" text="Invited" />
            </Box>
          ) : data.isTokenUsed && !data.profile?.latinName ? (
            <Pill color="blue.700" text="Signed up" />
          ) : (
            <Pill color="green.700" text="Onboarded" />
          ))}
        <Box fontSize="xs" mt={1}>
          <TimeAgo date={data.createdAt} />
        </Box>
      </>
    ),
  },
];

export const UserList = () => {
  const { t: td } = useTranslation("local-doctor");
  const { params, setParam } = useQueryParam({
    size: "10",
    page: "1",
    role: "",
    country: "",
    text: "",
    hospitalId: "",
  });
  const { data: userList } = useUserList(params);

  return (
    <>
      <UsersTableActions params={params} setParam={setParam} />
      <TableContent
        columns={columns}
        data={userList?.data || []}
        RowAction={UserActions}
        mt="4"
      />
      <Pagination
        name={td(`header.paging.items.users`)}
        size={Number(params.size)}
        page={Number(params.page)}
        total={userList?.total}
        pages={userList?.pages}
        filtered={!!(params.text || params.role || params.country)}
        onChange={(page) => setParam("page", page.toString())}
      />
    </>
  );
};
