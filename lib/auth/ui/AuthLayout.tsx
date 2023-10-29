import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { ReactNode } from "react";
import { IoArrowBack } from "react-icons/io5";

export const AuthLayout = ({
  title,
  caption = "",
  backAction,
  actions,
  contentWidth,
  children,
}: {
  title: string;
  caption: string;
  backAction?: { text: string; onClick: () => void };
  actions?: ReactNode;
  contentWidth: string;
  children: ReactNode;
}) => {
  const { t: ta } = useTranslation("auth");

  return (
    <>
      <span>AUTH LAYOUT</span>
    </>
  );
};
