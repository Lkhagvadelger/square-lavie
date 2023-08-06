import { User } from "@prisma/client";
import { AppError } from "@util/errors";
import { API, Method } from "@util/query";
import { useMutation, useQuery } from "react-query";

export type AuthUser = Pick<User, "id" | "email" | "phoneNumber" | "role"> & {
  profile: any;
};

export const useCurrentUser = () => {
  const query = useQuery<AuthUser, AppError>("currentUser", API._current());
  return {
    isLoggedIn: query.data ? !!query.data.id : false,
    user: query.data && query.data.id ? query.data : null,
    ...query,
  };
};

export const useRefresh = () =>
  useQuery([`refresh`], API._query(Method.GET, `auth/refresh`));

export const useLogin = () =>
  useMutation(API._auth(Method.POST, `auth/login`, true));

export const useSignup = () =>
  useMutation(API._auth(Method.POST, `auth/signup`));

export const usePasswordCreate = () =>
  useMutation(API._auth(Method.PUT, `auth/password/create`, true));

export const usePasswordForgotRequest = () =>
  useMutation(API._auth(Method.PATCH, `auth/password/forgot`));

export const usePasswordForgotCheck = () =>
  useMutation(API._auth(Method.POST, `auth/password/forgot`));

export const usePasswordForgotReset = () =>
  useMutation(API._auth(Method.PUT, `auth/password/forgot`, true));

export const usePhoneVerification = () =>
  useMutation(API._mutate(Method.POST, `auth/sendverification`));

export const usePhoneConfirmation = () =>
  useMutation(API._mutate(Method.POST, `auth/confirmverification`));

export const useLogout = () =>
  useMutation(API._mutate(Method.DELETE, `auth/logout`));
