import { AuthUser, useCurrentUser } from "@lib/auth/data/authHooks";
import { toaster } from "@ui/index";
import fetch from "cross-fetch";
import { isEmpty } from "lodash";
import { Translate } from "next-translate";
import useTranslation from "next-translate/useTranslation";
import {
  MutationFunction,
  QueryClient,
  QueryFunction,
  useQueryClient,
} from "react-query";
import { AppError } from "./errors";

// For interacting with the React Query cache
export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

const defaultOptions = {
  headers: { "Content-Type": "application/json" },
  mode: "cors" as RequestMode,
  credentials: "include" as RequestCredentials,
  includeCredentials: true,
};

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

const endpoint = (path: string, params = {}) =>
  `/api/${path}${isEmpty(params) ? `` : `?${new URLSearchParams(params)}`}`;

const handleResp =
  (refetch: () => void, te: Translate) => (response: Response) =>
    response.text().then((text) => {
      let body = null;
      try {
        body = JSON.parse(text);
      } catch (e) {}
      if (response.status === 401) return refetch();
      if (response.status >= 400) {
        const error = new AppError(
          response.status,
          body ? body.message : text,
          body ? body.translationKey : undefined
        );
        if (error.statusCode === 500) toaster.error(te("undefined"));
        else toaster.error(te(error.translationKey!));
        throw error;
      }
      return body;
    });

export const useHandleAuth = (shouldInvalidate = false) => {
  const queryClient = useQueryClient();
  return (user?: AuthUser) => {
    queryClient.setQueryData("currentUser", user);
    if (shouldInvalidate) queryClient.invalidateQueries();
  };
};

export const API = {
  _current: () => (): Promise<AuthUser> =>
    fetch(endpoint(`auth/current`), { ...defaultOptions, method: "GET" }).then(
      (response: Response) =>
        response.json().then((body) => {
          if (response.status >= 400)
            throw new AppError(
              response.status,
              body.message,
              body.translationKey
            );
          return body;
        })
    ),
  _auth: (method: Method, path: string, shouldInvalidate?: boolean) => {
    const handleAuth = useHandleAuth(shouldInvalidate);
    return (data: any): Promise<AuthUser> =>
      fetch(endpoint(path), {
        ...defaultOptions,
        method,
        body: method === Method.GET ? undefined : JSON.stringify(data),
      }).then((response: Response) =>
        response.json().then((body) => {
          if (response.status >= 400) {
            const error = new AppError(
              response.status,
              body.message,
              body.translationKey
            );
            throw error;
          }
          handleAuth(body);
          return body;
        })
      );
  },
  _query: (
    method: Method,
    path: string,
    params = {},
    data = {}
  ): QueryFunction<any> => {
    const { refetch } = useCurrentUser();
    const { t: te } = useTranslation("error");
    return (): Promise<any> =>
      fetch(endpoint(path, params), {
        ...defaultOptions,
        method,
        body: method === Method.GET ? undefined : JSON.stringify(data),
      }).then(handleResp(refetch, te));
  },
  _mutate: (
    method: Method,
    path: string,
    params = {}
  ): MutationFunction<any, any> => {
    const { refetch } = useCurrentUser();
    const { t: te } = useTranslation("error");
    return (data = {}): Promise<any> =>
      fetch(endpoint(path, params), {
        ...defaultOptions,
        method,
        body: method === Method.GET ? undefined : JSON.stringify(data),
      }).then(handleResp(refetch, te));
  },
  _request: (
    method: Method,
    path: string,
    params = {},
    data = {}
  ): Promise<any> =>
    fetch(endpoint(path, params), {
      ...defaultOptions,
      method,
      body: method === Method.GET ? undefined : JSON.stringify(data),
    }),
};
