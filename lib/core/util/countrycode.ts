import { Country } from "@prisma/client";
import _ from "lodash";

export const CountryPhoneCodes = [
  { country: Country.us, code: "+1" },
  { country: Country.mn, code: "+976" },
  { country: Country.gt, code: "+502" },
  { country: Country.es, code: "+503" },
  { country: Country.hn, code: "+504" },
];

export const getAllowedCountryPhoneCode = () =>
  CountryPhoneCodes.map((x) => x.code);

export const getPhoneCodeByCountry = (country: Country): string =>
  CountryPhoneCodes.find((obj) => obj.country === country)?.code ?? "+1";

export const getCountryByPhoneCode = (code: string): Country | undefined =>
  CountryPhoneCodes.find((obj) => obj.code === code)?.country as Country;

export const getPhoneWithCountry = (country: Country, phone: string) =>
  getPhoneCodeByCountry(country) + phone;

export const isPhoneCodeAllowed = (code: string): boolean =>
  !!_.find(CountryPhoneCodes, (c) => c.code === code);
