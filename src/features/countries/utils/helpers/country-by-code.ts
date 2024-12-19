import { countryCodes } from "../data/country-codes";

export const getCountryByCode = (code: string): string => {
  return countryCodes[code] || code;
};