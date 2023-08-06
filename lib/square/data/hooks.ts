import { API, Method } from "@util/query";
import { useQuery } from "react-query";

export const useCountryBusinessHour = (country: string) =>
  useQuery(
    [],
    API._query(Method.GET, `core/businesshour/${country}`, { country })
  );
