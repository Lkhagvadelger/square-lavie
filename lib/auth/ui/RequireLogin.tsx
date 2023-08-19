import {
  useEffect,
  ReactNode,
  ComponentType,
  useCallback,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useAuth } from "./AuthProvider";
import { UserRole } from "@prisma/client";
import { toaster } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { useCookies } from "react-cookie";

type RequireLoginProps = {
  redirectBack?: boolean;
  children: ReactNode;
};
// Component wrapper for requiring login
// Usage:
//   <RequireLogin>{page}</RequireLogin>;
export const RequireLogin = ({
  redirectBack = true,
  children,
}: RequireLoginProps) => {
  const router = useRouter();
  const { t: te } = useTranslation("error");
  const [loggedIn, setLoggedIn] = useState(false);
  const { isLoggedIn, status, user, error } = useAuth();
  const [cookie] = useCookies(["lang"]);

  useEffect(() => {
    if (user) {
      const info = {
        displayName: user.profile?.firstName,
        email: user.email ? user.email : undefined,
        phone: user.phoneNumber ? user.phoneNumber : undefined,
      };
    }
  }, [user]);

  const redirect = useCallback(
    (pathname: string) => {
      if (router.pathname !== pathname)
        router.replace(
          {
            pathname,
            query: { redirectTo: redirectBack ? router.asPath : "" },
          },
          "",
          cookie.lang ? { locale: cookie.lang } : {}
        );
    },
    [redirectBack, router, cookie]
  );

  useEffect(() => {
    if (status === "error" && error?.statusCode === 401) {
      if (loggedIn) toaster.error(te("session-expired"));
      redirect("/auth/login");
    }
    if (isLoggedIn) setLoggedIn(isLoggedIn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, status, user, error]);

  // Loading current user
  if (status !== "success" || !isLoggedIn) return null;

  return <>{children}</>;
};

export const withRequireLogin = (Component: ComponentType) => {
  const WithRequireLogin = (props: any) => {
    return (
      <RequireLogin>
        <Component {...props} />
      </RequireLogin>
    );
  };

  return WithRequireLogin;
};
