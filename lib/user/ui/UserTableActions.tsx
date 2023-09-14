import { Country, UserRole } from "@prisma/client";
import { QueryParamType } from "@ui/hooks/query-param";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  InputRightElement,
  Select,
} from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { BsSearch } from "react-icons/bs";
import { selectInput } from "../data/types";

const countryList: selectInput[] = [
  { label: "United States", value: Country.us },
  { label: "Mongolia", value: Country.mn },
];

export const UsersTableActions = ({
  params,
  setParam,
  roles,
}: {
  params: QueryParamType;
  setParam: (key: string, value: string, resetPage?: boolean) => void;
  roles?: UserRole[];
}) => {
  const { t: ta } = useTranslation("auth");
  const roleList = (roles ? roles : Object.keys(UserRole)).map((r) => ({
    label: ta("role." + r),
    value: r,
  }));

  return (
    <Stack
      w="full"
      spacing="2"
      direction={{ base: "column", md: "row" }}
      justify="start"
      borderBottom="1px"
      borderColor="gray.100"
      pb="4"
    >
      <FormControl w="64">
        <InputGroup size="sm">
          <FormLabel srOnly>Filter by name or email</FormLabel>
          <InputRightElement pointerEvents="none" color="gray.400">
            <BsSearch />
          </InputRightElement>
          <Input
            rounded="base"
            type="search"
            placeholder="Filter by name, email, phone..."
            pl="4"
            pr="6"
            value={params.text}
            onChange={(e) => setParam("text", e.target.value, true)}
          />
        </InputGroup>
      </FormControl>
      <Select
        w="40"
        size="sm"
        value={params.role}
        onChange={(e) => setParam("role", e.target.value as UserRole, true)}
      >
        <option value="">All roles</option>
        {roleList.map((role) => (
          <option key={`option-role-${role.value}`} value={role.value}>
            {role.label}
          </option>
        ))}
      </Select>
      <Select
        w="40"
        size="sm"
        value={params.country}
        onChange={(e) => setParam("country", e.target.value as Country, true)}
      >
        <option value="">All countries</option>
        {countryList.map((country) => (
          <option key={`option-country-${country.value}`} value={country.value}>
            {country.label}
          </option>
        ))}
      </Select>
    </Stack>
  );
};
