import { API, Method } from "@util/query";
import { useQuery } from "react-query";
import { ServiceItem } from "./types";

// return ItemsResponse type

export const useGetServices = () =>
  useQuery<ServiceItem[]>([], API._query(Method.GET, `square/services`));
