export const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const passwordPattern =
  /^(?=.*[0-9])(?=.*[!@#$%^&*_.-])[a-zA-Z0-9!@#$%-._^&*]{8,28}/;
// const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const validateEmail = (email: string) => {
  return emailPattern.test(String(email).toLowerCase());
};

export const validatePassword = (password: string) => {
  return passwordPattern.test(password);
};

export const validatePhoneNumber = (
  phoneNumber: String,
  countryCode: String
) => {
  const returnModel = { isValid: false, fullPhoneNumber: "" };
  const countryCodes = [
    {
      countryCode: "+976",
      phonePrefix: "+976",
      regex: /^([0-9]{8})$/,
      length: 8,
      startingNumber: [
        "80",
        "83",
        "85",
        "86",
        "88",
        "89",
        "90",
        "91",
        "92",
        "93",
        "94",
        "95",
        "96",
        "97",
        "98",
        "99",
      ],
      startingLength: 2,
    },
    {
      countryCode: "+1",
      phonePrefix: "+1",
      regex: /^([0-9]{10})$/,
      length: 13,
      startingNumber: [],
      startingLength: 0,
    },
    {
      countryCode: "+502",
      phonePrefix: "+502",
      regex: /^([0-9]{8})$/,
      length: 8,
      startingNumber: [],
      startingLength: 0,
    },
    {
      countryCode: "+503",
      phonePrefix: "+503",
      regex: /^([0-9]{8})$/,
      length: 8,
      startingNumber: [],
      startingLength: 0,
    },
    {
      countryCode: "+504",
      phonePrefix: "+504",
      regex: /^([0-9]{8})$/,
      length: 8,
      startingNumber: [],
      startingLength: 0,
    },
  ];
  if (countryCodes.filter((r) => r.countryCode == countryCode).length == 0)
    return returnModel;

  //All SMS receivable phone numbers
  // +XXXXXXXXXXX = (/^\+?([0-9]{3})\)?[-. ]?([0-9]{8})$/) verifing this format - Phone format for Mongolian Phone number providers
  // will add different formats for different countries
  // XXXXXXXX (/^?([0-9]{8})\)$/)
  const country = countryCodes.filter((r) => r.countryCode == countryCode)[0];
  returnModel.fullPhoneNumber = country.phonePrefix + phoneNumber;
  if (
    country.regex.test(phoneNumber.toLowerCase()) &&
    (country.startingNumber.length === 0 ||
      (country.startingNumber.length > 0 &&
        country.startingNumber.filter(
          (r) => r == phoneNumber.substring(0, country.startingLength)
        ).length > 0))
  ) {
    returnModel.isValid = true;
    returnModel.fullPhoneNumber = country.phonePrefix + phoneNumber;
  }

  return returnModel;
};
