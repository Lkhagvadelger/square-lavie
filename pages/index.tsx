import { getRootUrl } from "@lib/auth/data/types";
import { useAuth, withRequireLogin } from "@lib/auth/ui";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const HomePage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [cookie] = useCookies(["lang"]);

  useEffect(() => {
    const rootUrl = getRootUrl(user);
    if (rootUrl)
      router.replace(rootUrl, "", cookie.lang ? { locale: cookie.lang } : {});
  }, [router, user, cookie]);

  return null;
};

export default withRequireLogin(HomePage);
