import { API, Method } from "@util/query";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { ServiceItem } from "./types";

// return ItemsResponse type

export const useGetServices = (locationId: string) =>
  useQuery<ServiceItem[]>(
    [],
    API._query(Method.GET, `square/${locationId}/services`)
  );

export const useAvailabilityAny = (locationId: string) =>
  useMutation(API._auth(Method.POST, `square/${locationId}/availability/any`));

export const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) setValue(JSON.parse(storedValue));
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
