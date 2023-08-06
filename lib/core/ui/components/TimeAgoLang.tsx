import useTranslation from "next-translate/useTranslation";
import Timeago from "react-timeago";

const buildFormatter = require("react-timeago/lib/formatters/buildFormatter");
const langs: { [k: string]: { default: any } } = {
  en: require("react-timeago/lib/language-strings/en"),
  es: require("react-timeago/lib/language-strings/es"),
  mn: {
    default: {
      prefixAgo: null,
      prefixFromNow: null,
      suffixAgo: "өмнө",
      suffixFromNow: "дараа",
      seconds: "хэдэн секундын",
      minute: "1 минутын",
      minutes: "%d минутын",
      hour: "1 цагийн",
      hours: "%d цагийн",
      day: "1 өдрийн",
      days: "%d өдрийн",
      month: "1 сарын",
      months: "%d сарын",
      year: "1 жилийн",
      years: "%d жилийн",
      wordSeparator: " ",
    },
  },
};

export const TimeAgoLang = ({ date }: { date: any }) => {
  const { lang } = useTranslation();
  return (
    <Timeago
      date={date}
      formatter={buildFormatter.default(langs[lang].default)}
    />
  );
};
