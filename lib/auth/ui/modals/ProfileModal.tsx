import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
// import { LoginScreen } from "../screens";
// import { ProfileScreen } from "../screens/ProfileScreen";

const useProfileModal = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const finalRef = useRef(null);
  // const router = useRouter();
  // const [profileAsQuery, setProfileAsQuery] = useState("");
  // const [redirectTo, setRedirectTo] = useState("/");

  // useEffect(() => {
  //   router.query.login && setProfileAsQuery(router.query.profile as string);
  // }, [router]);

  // useEffect(() => {
  //   profileAsQuery && profileAsQuery == "true" && onOpen();
  // }, [profileAsQuery, onOpen]);

  // const onCloseLogin = () => {
  //   const currentQuery = { ...router.query };
  //   console.log(currentQuery);
  //   delete currentQuery.login;
  //   delete currentQuery.redirectTo;
  //   currentQuery;
  //   router.push({
  //     pathname: router.pathname,
  //     query: currentQuery,
  //   });

  //   setProfileAsQuery("false");
  //   onClose();
  // };

  return {};
  // return {
  //   isOpen,
  //   finalRef,
  //   redirectTo,
  //   onCloseLogin,
  //   onClose,
  // };
};

export const ProfileModal = () => {
  // const { isOpen, finalRef, redirectTo, onCloseLogin, onClose } =
  //   useProfileModal();

  return (
    <div>
      <span>Profile modal</span>
    </div>
  );
};
