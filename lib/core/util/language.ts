import { mn, es, enUS } from "date-fns/locale";
export const getSupportPhoneByCountry = (country: string) => {
  switch (country) {
    case "us":
      return "+1-800-988-5534";
    case "mn":
      return "+976-7270-2000";
    case "es":
      return "+503-6994-6053";
    case "sv":
      return "+503-6994-6053";
    case "hn":
      return "+503-6994-6053";
    case "gt":
      return "+503-6994-6053";
    default:
      return "+1-800-988-5534";
  }
};
export const getCountryLang = (country: string) => {
  switch (country) {
    case "us":
      return "en";
    case "mn":
      return "mn";
    default:
      return "en";
  }
};

export const getLang = (lang: string)  => {
  switch (lang) {
    default:
      return "en";
  }
};
export const getDatefnsLocale = (lang: string) => {
  switch (lang) {
    case "en":
      return enUS;
    case "mn":
      return mn;
    case "es":
      return es;
    default:
      return enUS;
  }
};
