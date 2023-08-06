import { useState } from "react";
import { useGetServices } from "../data/hooks";
import { ServiceItem } from "../data/types";
export const Home = () => {
  const { data, isLoading } = useGetServices();

  return <>asdf</>;
};
