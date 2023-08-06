import { isEqual, pick } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type QueryParamType = { [key: string]: string };

export const useQueryParam = (
  def: QueryParamType,
  ext: QueryParamType = {}
) => {
  const router = useRouter();
  const [params, setParams] = useState<QueryParamType>({
    ...def,
    ...(router.query as QueryParamType),
  });

  useEffect(() => {
    if (!isEqual(router.query, params))
      setParams({ ...def, ...(router.query as QueryParamType) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  useEffect(() => {
    if (!isEqual({ ...def, ...router.query }, params))
      router.replace(
        {
          query: pick(
            params,
            Object.keys(params).filter((k) => params[k] !== def[k])
          ),
        },
        undefined,
        { scroll: false }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return {
    params: { ...params, ...ext },
    setParam: (key: string, value: string, resetPage?: boolean) =>
      resetPage
        ? setParams({ ...params, page: "1", [key]: value })
        : setParams({ ...params, [key]: value }),
  };
};
