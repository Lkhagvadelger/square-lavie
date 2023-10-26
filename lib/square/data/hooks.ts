import { API, Method } from "@util/query";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { CatalogObject } from "square";
import { ServiceItem } from "./types";
import {
  QueryRevenueParams,
  QueryRevenueResponse,
} from "pages/api/square/[locationId]/payment/revenue-stats";
import { RevenueGraphResponse } from "pages/api/square/[locationId]/payment/revenue-graph";
import { RetentionRateParams } from "pages/api/square/[locationId]/client/retention-rate";

// return ItemsResponse type

export const useRetentionRate = (data: RetentionRateParams) =>
  useQuery<{ retentionRate: number }>(
    ["useRetentionRate", data],
    API._query(
      Method.POST,
      `square/LS1VH64H9SA5C/client/retention-rate`,
      {},
      data
    )
  );

export const useQueryRevenue = (params: QueryRevenueParams) =>
  useQuery<QueryRevenueResponse>(
    ["useQueryRevenues", params],
    API._query(Method.GET, `square/LS1VH64H9SA5C/payment/revenue-stats`, params)
  );

export const useRevenueGraph = (params: QueryRevenueParams) =>
  useQuery<RevenueGraphResponse>(
    ["useRevenueGraph", params],
    API._query(Method.GET, `square/LS1VH64H9SA5C/payment/revenue-graph`, params)
  );

export const useGetServices = (locationId: string) =>
  useQuery<ServiceItem[]>(
    "useGetServices",
    API._query(Method.GET, `square/${locationId}/services`)
  );
export const useGetCatalogs = (locationId: string) =>
  useQuery<CatalogObject[]>(
    "useGetCatalogs",
    API._query(Method.GET, `square/${locationId}/catalog`)
  );
export const useGetLocationInfo = (locationId: string) =>
  useQuery<any>([], API._query(Method.GET, `square/${locationId}/location`));

export const useAvailabilityAny = (locationId: string) =>
  useMutation(API._auth(Method.POST, `square/${locationId}/availability/any`));
export const useCreateBooking = (locationId: string) =>
  useMutation(API._auth(Method.POST, `square/${locationId}/booking/create`));

export const useGetBooking = (locationId: string, bookingIds: string) =>
  useQuery<ServiceItem[]>(
    [],
    API._query(Method.GET, `square/${locationId}/booking/${bookingIds}`)
  );

export const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState<any>(null);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) setValue(JSON.parse(storedValue));
    else setValue(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    value,
    (value: any) => {
      setValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
  ];
};
