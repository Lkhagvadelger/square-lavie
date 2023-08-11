import { useState } from "react";
import { useGetServices } from "../data/hooks";
import { ServiceItem } from "../data/types";
import { useRouter } from "next/router";
export const Home = ({ locationId }: { locationId: string }) => {
  const { data, isLoading } = useGetServices();

  return <>{locationId}</>;
};
