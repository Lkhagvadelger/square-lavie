import { Country } from "@prisma/client";
import { useEffect, useState } from "react";

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<{
    id: string;
    country: Country;
    getFlag: (key: string) => string | boolean | undefined;
  }>();

  return analytics;
};
