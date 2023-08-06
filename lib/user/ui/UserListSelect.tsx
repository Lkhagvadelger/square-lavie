import { useUserList } from "@lib/user/data/userHooks";
import { UserRole } from "@prisma/client";
import { Pagination } from "@ui/components/Pagination";
import { Badge, SelectionTable } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { UserDescription } from "./UserDescription";
import { UsersTableActions } from "./UserTableActions";

export const UserListSelect = forwardRef(
  (
    {
      active,
      select,
      choose,
    }: {
      active: string;
      select: (id: string) => void;
      choose: (id: string) => void;
    },
    ref: any
  ) => {
    const { t: td } = useTranslation("local-doctor");
    const [params, setParams] = useState({
      size: "5",
      page: "1",
      role: "",
      country: "",
      text: "",
      hospitalId: "",
    });
    const setParam = useMemo(
      () => (key: string, value: string) => {
        setParams({ ...params, [key]: value });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    const { data: userList, refetch } = useUserList(params);
    useImperativeHandle(ref, () => ({ refetch }));

    return (
      <>
        <UsersTableActions
          params={params}
          setParam={setParam}
          roles={[
            UserRole.HOSPITAL_ADMIN,
            UserRole.LOCAL_DOCTOR,
            UserRole.PATIENT,
          ]}
        />

        <SelectionTable
          columns={[
            {
              Header: "Member",
              Cell: (data: any) => <UserDescription {...data} />,
            },
            {
              Header: "Role",
              Cell: (data: any) => <Badge fontSize="11px">{data.role}</Badge>,
            },
          ]}
          data={userList?.data || []}
          active={active}
          select={select}
          choose={choose}
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
  }
);

UserListSelect.displayName = "UserListSelect";
