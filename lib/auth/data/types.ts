import { UserRole } from "@prisma/client";

export const getRootUrl = (
  user: { role: UserRole } | undefined | null
): string => {
  if (!user || !user.role) return "";
  if (user.role === UserRole.USER) return "/";
  if (user.role === UserRole.ADMIN) return "/admin";
  return "";
};

export const CountryNames = () => [
  {
    value: "AF",
    label: "Afghanistan",
    code: "",
  },
  {
    value: "AX",
    label: "Åland Islands",
    code: "",
  },
  {
    value: "AL",
    label: "Albania",
    code: "",
  },
  {
    value: "DZ",
    label: "Algeria",
    code: "",
  },
  {
    value: "AS",
    label: "American Samoa",
    code: "",
  },
  {
    value: "AD",
    label: "Andorra",
    code: "",
  },
  {
    value: "AO",
    label: "Angola",
    code: "",
  },
  {
    value: "AI",
    label: "Anguilla",
    code: "",
  },
  {
    value: "AQ",
    label: "Antarctica",
    code: "",
  },
  {
    value: "AG",
    label: "Antigua and Barbuda",
    code: "",
  },
  {
    value: "AR",
    label: "Argentina",
    code: "",
  },
  {
    value: "AM",
    label: "Armenia",
    code: "",
  },
  {
    value: "AW",
    label: "Aruba",
    code: "",
  },
  {
    value: "AU",
    label: "Australia",
    code: "",
  },
  {
    value: "AT",
    label: "Austria",
    code: "",
  },
  {
    value: "AZ",
    label: "Azerbaijan",
    code: "",
  },
  {
    value: "BS",
    label: "Bahamas",
    code: "",
  },
  {
    value: "BH",
    label: "Bahrain",
    code: "",
  },
  {
    value: "BD",
    label: "Bangladesh",
    code: "",
  },
  {
    value: "BB",
    label: "Barbados",
    code: "",
  },
  {
    value: "BY",
    label: "Belarus",
    code: "",
  },
  {
    value: "BE",
    label: "Belgium",
    code: "",
  },
  {
    value: "BZ",
    label: "Belize",
    code: "",
  },
  {
    value: "BJ",
    label: "Benin",
    code: "",
  },
  {
    value: "BM",
    label: "Bermuda",
    code: "",
  },
  {
    value: "BT",
    label: "Bhutan",
    code: "",
  },
  {
    value: "BO",
    label: "Bolivia, Plurinational State of",
    code: "",
  },
  {
    value: "BQ",
    label: "Bonaire, Sint Eustatius and Saba",
    code: "",
  },
  {
    value: "BA",
    label: "Bosnia and Herzegovina",
    code: "",
  },
  {
    value: "BW",
    label: "Botswana",
    code: "",
  },
  {
    value: "BV",
    label: "Bouvet Island",
    code: "",
  },
  {
    value: "BR",
    label: "Brazil",
    code: "",
  },
  {
    value: "IO",
    label: "British Indian Ocean Territory",
    code: "",
  },
  {
    value: "BN",
    label: "Brunei Darussalam",
    code: "",
  },
  {
    value: "BG",
    label: "Bulgaria",
    code: "",
  },
  {
    value: "BF",
    label: "Burkina Faso",
    code: "",
  },
  {
    value: "BI",
    label: "Burundi",
    code: "",
  },
  {
    value: "CV",
    label: "Cabo Verde",
    code: "",
  },
  {
    value: "KH",
    label: "Cambodia",
    code: "",
  },
  {
    value: "CM",
    label: "Cameroon",
    code: "",
  },
  {
    value: "CA",
    label: "Canada",
    code: "",
  },
  {
    value: "KY",
    label: "Cayman Islands",
    code: "",
  },
  {
    value: "CF",
    label: "Central African Republic",
    code: "",
  },
  {
    value: "TD",
    label: "Chad",
    code: "",
  },
  {
    value: "CL",
    label: "Chile",
    code: "",
  },
  {
    value: "CN",
    label: "China",
    code: "",
  },
  {
    value: "CX",
    label: "Christmas Island",
    code: "",
  },
  {
    value: "CC",
    label: "Cocos (Keeling) Islands",
    code: "",
  },
  {
    value: "CO",
    label: "Colombia",
    code: "",
  },
  {
    value: "KM",
    label: "Comoros",
    code: "",
  },
  {
    value: "CG",
    label: "Congo",
    code: "",
  },
  {
    value: "CD",
    label: "Congo, Democratic Republic of the",
    code: "",
  },
  {
    value: "CK",
    label: "Cook Islands",
    code: "",
  },
  {
    value: "CR",
    label: "Costa Rica",
    code: "",
  },
  {
    value: "HR",
    label: "Croatia",
    code: "",
  },
  {
    value: "CU",
    label: "Cuba",
    code: "",
  },
  {
    value: "CW",
    label: "Curaçao",
    code: "",
  },
  {
    value: "CY",
    label: "Cyprus",
    code: "",
  },
  {
    value: "CZ",
    label: "Czechia",
    code: "",
  },
  {
    value: "CI",
    label: "Côte d'Ivoire",
    code: "",
  },
  {
    value: "DK",
    label: "Denmark",
    code: "",
  },
  {
    value: "DJ",
    label: "Djibouti",
    code: "",
  },
  {
    value: "DM",
    label: "Dominica",
    code: "",
  },
  {
    value: "DO",
    label: "Dominican Republic",
    code: "",
  },
  {
    value: "EC",
    label: "Ecuador",
    code: "",
  },
  {
    value: "EG",
    label: "Egypt",
    code: "",
  },
  {
    value: "SV",
    label: "El Salvador",
    code: "",
  },
  {
    value: "GQ",
    label: "Equatorial Guinea",
    code: "",
  },
  {
    value: "ER",
    label: "Eritrea",
    code: "",
  },
  {
    value: "EE",
    label: "Estonia",
    code: "",
  },
  {
    value: "SZ",
    label: "Eswatini",
    code: "",
  },
  {
    value: "ET",
    label: "Ethiopia",
    code: "",
  },
  {
    value: "FK",
    label: "Falkland Islands (Malvinas)",
    code: "",
  },
  {
    value: "FO",
    label: "Faroe Islands",
    code: "",
  },
  {
    value: "FJ",
    label: "Fiji",
    code: "",
  },
  {
    value: "FI",
    label: "Finland",
    code: "",
  },
  {
    value: "FR",
    label: "France",
    code: "",
  },
  {
    value: "GF",
    label: "French Guiana",
    code: "",
  },
  {
    value: "PF",
    label: "French Polynesia",
    code: "",
  },
  {
    value: "TF",
    label: "French Southern Territories",
    code: "",
  },
  {
    value: "GA",
    label: "Gabon",
    code: "",
  },
  {
    value: "GM",
    label: "Gambia",
    code: "",
  },
  {
    value: "GE",
    label: "Georgia",
    code: "",
  },
  {
    value: "DE",
    label: "Germany",
    code: "",
  },
  {
    value: "GH",
    label: "Ghana",
    code: "",
  },
  {
    value: "GI",
    label: "Gibraltar",
    code: "",
  },
  {
    value: "GR",
    label: "Greece",
    code: "",
  },
  {
    value: "GL",
    label: "Greenland",
    code: "",
  },
  {
    value: "GD",
    label: "Grenada",
    code: "",
  },
  {
    value: "GP",
    label: "Guadeloupe",
    code: "",
  },
  {
    value: "GU",
    label: "Guam",
    code: "",
  },
  {
    value: "GT",
    label: "Guatemala",
    code: "",
  },
  {
    value: "GG",
    label: "Guernsey",
    code: "",
  },
  {
    value: "GN",
    label: "Guinea",
    code: "",
  },
  {
    value: "GW",
    label: "Guinea-Bissau",
    code: "",
  },
  {
    value: "GY",
    label: "Guyana",
    code: "",
  },
  {
    value: "HT",
    label: "Haiti",
    code: "",
  },
  {
    value: "HM",
    label: "Heard Island and McDonald Islands",
    code: "",
  },
  {
    value: "VA",
    label: "Holy See",
    code: "",
  },
  {
    value: "HN",
    label: "Honduras",
    code: "",
  },
  {
    value: "HK",
    label: "Hong Kong",
    code: "",
  },
  {
    value: "HU",
    label: "Hungary",
    code: "",
  },
  {
    value: "IS",
    label: "Iceland",
    code: "",
  },
  {
    value: "IN",
    label: "India",
    code: "",
  },
  {
    value: "ID",
    label: "Indonesia",
    code: "",
  },
  {
    value: "IR",
    label: "Iran, Islamic Republic of",
    code: "",
  },
  {
    value: "IQ",
    label: "Iraq",
    code: "",
  },
  {
    value: "IE",
    label: "Ireland",
    code: "",
  },
  {
    value: "IM",
    label: "Isle of Man",
    code: "",
  },
  {
    value: "IL",
    label: "Israel",
    code: "",
  },
  {
    value: "IT",
    label: "Italy",
    code: "",
  },
  {
    value: "JM",
    label: "Jamaica",
    code: "",
  },
  {
    value: "JP",
    label: "Japan",
    code: "",
  },
  {
    value: "JE",
    label: "Jersey",
    code: "",
  },
  {
    value: "JO",
    label: "Jordan",
    code: "",
  },
  {
    value: "KZ",
    label: "Kazakhstan",
    code: "",
  },
  {
    value: "KE",
    label: "Kenya",
    code: "",
  },
  {
    value: "KI",
    label: "Kiribati",
    code: "",
  },
  {
    value: "KP",
    label: "Korea, Democratic People's Republic of",
    code: "",
  },
  {
    value: "KR",
    label: "Korea, Republic of",
    code: "",
  },
  {
    value: "KW",
    label: "Kuwait",
    code: "",
  },
  {
    value: "KG",
    label: "Kyrgyzstan",
    code: "",
  },
  {
    value: "LA",
    label: "Lao People's Democratic Republic",
    code: "",
  },
  {
    value: "LV",
    label: "Latvia",
    code: "",
  },
  {
    value: "LB",
    label: "Lebanon",
    code: "",
  },
  {
    value: "LS",
    label: "Lesotho",
    code: "",
  },
  {
    value: "LR",
    label: "Liberia",
    code: "",
  },
  {
    value: "LY",
    label: "Libya",
    code: "",
  },
  {
    value: "LI",
    label: "Liechtenstein",
    code: "",
  },
  {
    value: "LT",
    label: "Lithuania",
    code: "",
  },
  {
    value: "LU",
    label: "Luxembourg",
    code: "",
  },
  {
    value: "MO",
    label: "Macao",
    code: "",
  },
  {
    value: "MG",
    label: "Madagascar",
    code: "",
  },
  {
    value: "MW",
    label: "Malawi",
    code: "",
  },
  {
    value: "MY",
    label: "Malaysia",
    code: "",
  },
  {
    value: "MV",
    label: "Maldives",
    code: "",
  },
  {
    value: "ML",
    label: "Mali",
    code: "",
  },
  {
    value: "MT",
    label: "Malta",
    code: "",
  },
  {
    value: "MH",
    label: "Marshall Islands",
    code: "",
  },
  {
    value: "MQ",
    label: "Martinique",
    code: "",
  },
  {
    value: "MR",
    label: "Mauritania",
    code: "",
  },
  {
    value: "MU",
    label: "Mauritius",
    code: "",
  },
  {
    value: "YT",
    label: "Mayotte",
    code: "",
  },
  {
    value: "MX",
    label: "Mexico",
    code: "",
  },
  {
    value: "FM",
    label: "Micronesia, Federated States of",
    code: "",
  },
  {
    value: "MD",
    label: "Moldova, Republic of",
    code: "",
  },
  {
    value: "MC",
    label: "Monaco",
    code: "",
  },
  {
    value: "MN",
    label: "Mongolia",
    code: "+976",
  },
  {
    value: "ME",
    label: "Montenegro",
    code: "",
  },
  {
    value: "MS",
    label: "Montserrat",
    code: "",
  },
  {
    value: "MA",
    label: "Morocco",
    code: "",
  },
  {
    value: "MZ",
    label: "Mozambique",
    code: "",
  },
  {
    value: "MM",
    label: "Myanmar",
    code: "",
  },
  {
    value: "NA",
    label: "Namibia",
    code: "",
  },
  {
    value: "NR",
    label: "Nauru",
    code: "",
  },
  {
    value: "NP",
    label: "Nepal",
    code: "",
  },
  {
    value: "NL",
    label: "Netherlands",
    code: "",
  },
  {
    value: "NC",
    label: "New Caledonia",
    code: "",
  },
  {
    value: "NZ",
    label: "New Zealand",
    code: "",
  },
  {
    value: "NI",
    label: "Nicaragua",
    code: "",
  },
  {
    value: "NE",
    label: "Niger",
    code: "",
  },
  {
    value: "NG",
    label: "Nigeria",
    code: "",
  },
  {
    value: "NU",
    label: "Niue",
    code: "",
  },
  {
    value: "NF",
    label: "Norfolk Island",
    code: "",
  },
  {
    value: "MK",
    label: "North Macedonia",
    code: "",
  },
  {
    value: "MP",
    label: "Northern Mariana Islands",
    code: "",
  },
  {
    value: "NO",
    label: "Norway",
    code: "",
  },
  {
    value: "OM",
    label: "Oman",
    code: "",
  },
  {
    value: "PK",
    label: "Pakistan",
    code: "",
  },
  {
    value: "PW",
    label: "Palau",
    code: "",
  },
  {
    value: "PS",
    label: "Palestine, State of",
    code: "",
  },
  {
    value: "PA",
    label: "Panama",
    code: "",
  },
  {
    value: "PG",
    label: "Papua New Guinea",
    code: "",
  },
  {
    value: "PY",
    label: "Paraguay",
    code: "",
  },
  {
    value: "PE",
    label: "Peru",
    code: "",
  },
  {
    value: "PH",
    label: "Philippines",
    code: "",
  },
  {
    value: "PN",
    label: "Pitcairn",
    code: "",
  },
  {
    value: "PL",
    label: "Poland",
    code: "",
  },
  {
    value: "PT",
    label: "Portugal",
    code: "",
  },
  {
    value: "PR",
    label: "Puerto Rico",
    code: "",
  },
  {
    value: "QA",
    label: "Qatar",
    code: "",
  },
  {
    value: "RO",
    label: "Romania",
    code: "",
  },
  {
    value: "RU",
    label: "Russian Federation",
    code: "",
  },
  {
    value: "RW",
    label: "Rwanda",
    code: "",
  },
  {
    value: "RE",
    label: "Réunion",
    code: "",
  },
  {
    value: "BL",
    label: "Saint Barthélemy",
    code: "",
  },
  {
    value: "SH",
    label: "Saint Helena, Ascension and Tristan da Cunha",
    code: "",
  },
  {
    value: "KN",
    label: "Saint Kitts and Nevis",
    code: "",
  },
  {
    value: "LC",
    label: "Saint Lucia",
    code: "",
  },
  {
    value: "MF",
    label: "Saint Martin (French part)",
    code: "",
  },
  {
    value: "PM",
    label: "Saint Pierre and Miquelon",
    code: "",
  },
  {
    value: "VC",
    label: "Saint Vincent and the Grenadines",
    code: "",
  },
  {
    value: "WS",
    label: "Samoa",
    code: "",
  },
  {
    value: "SM",
    label: "San Marino",
    code: "",
  },
  {
    value: "ST",
    label: "Sao Tome and Principe",
    code: "",
  },
  {
    value: "SA",
    label: "Saudi Arabia",
    code: "",
  },
  {
    value: "SN",
    label: "Senegal",
    code: "",
  },
  {
    value: "RS",
    label: "Serbia",
    code: "",
  },
  {
    value: "SC",
    label: "Seychelles",
    code: "",
  },
  {
    value: "SL",
    label: "Sierra Leone",
    code: "",
  },
  {
    value: "SG",
    label: "Singapore",
    code: "",
  },
  {
    value: "SX",
    label: "Sint Maarten (Dutch part)",
    code: "",
  },
  {
    value: "SK",
    label: "Slovakia",
    code: "",
  },
  {
    value: "SI",
    label: "Slovenia",
    code: "",
  },
  {
    value: "SB",
    label: "Solomon Islands",
    code: "",
  },
  {
    value: "SO",
    label: "Somalia",
    code: "",
  },
  {
    value: "ZA",
    label: "South Africa",
    code: "",
  },
  {
    value: "GS",
    label: "South Georgia and the South Sandwich Islands",
    code: "",
  },
  {
    value: "SS",
    label: "South Sudan",
    code: "",
  },
  {
    value: "ES",
    label: "Spain",
    code: "",
  },
  {
    value: "LK",
    label: "Sri Lanka",
    code: "",
  },
  {
    value: "SD",
    label: "Sudan",
    code: "",
  },
  {
    value: "SR",
    label: "Suriname",
    code: "",
  },
  {
    value: "SJ",
    label: "Svalbard and Jan Mayen",
    code: "",
  },
  {
    value: "SE",
    label: "Sweden",
    code: "",
  },
  {
    value: "CH",
    label: "Switzerland",
    code: "",
  },
  {
    value: "SY",
    label: "Syrian Arab Republic",
    code: "",
  },
  {
    value: "TW",
    label: "Taiwan, Province of China",
    code: "",
  },
  {
    value: "TJ",
    label: "Tajikistan",
    code: "",
  },
  {
    value: "TZ",
    label: "Tanzania, United Republic of",
    code: "",
  },
  {
    value: "TH",
    label: "Thailand",
    code: "",
  },
  {
    value: "TL",
    label: "Timor-Leste",
    code: "",
  },
  {
    value: "TG",
    label: "Togo",
    code: "",
  },
  {
    value: "TK",
    label: "Tokelau",
    code: "",
  },
  {
    value: "TO",
    label: "Tonga",
    code: "",
  },
  {
    value: "TT",
    label: "Trinidad and Tobago",
    code: "",
  },
  {
    value: "TN",
    label: "Tunisia",
    code: "",
  },
  {
    value: "TR",
    label: "Turkey",
    code: "",
  },
  {
    value: "TM",
    label: "Turkmenistan",
    code: "",
  },
  {
    value: "TC",
    label: "Turks and Caicos Islands",
    code: "",
  },
  {
    value: "TV",
    label: "Tuvalu",
    code: "",
  },
  {
    value: "UG",
    label: "Uganda",
    code: "",
  },
  {
    value: "UA",
    label: "Ukraine",
    code: "",
  },
  {
    value: "AE",
    label: "United Arab Emirates",
    code: "",
  },
  {
    value: "GB",
    label: "United Kingdom",
    code: "",
  },
  {
    value: "UM",
    label: "United States Minor Outlying Islands",
    code: "",
  },
  {
    value: "US",
    label: "United States",
    code: "+1",
  },
  {
    value: "UY",
    label: "Uruguay",
    code: "",
  },
  {
    value: "UZ",
    label: "Uzbekistan",
    code: "",
  },
  {
    value: "VU",
    label: "Vanuatu",
    code: "",
  },
  {
    value: "VE",
    label: "Venezuela, Bolivarian Republic of",
    code: "",
  },
  {
    value: "VN",
    label: "Viet Nam",
    code: "",
  },
  {
    value: "VG",
    label: "Virgin Islands, British",
    code: "",
  },
  {
    value: "VI",
    label: "Virgin Islands, U.S.",
    code: "",
  },
  {
    value: "WF",
    label: "Wallis and Futuna",
    code: "",
  },
  {
    value: "EH",
    label: "Western Sahara",
    code: "",
  },
  {
    value: "YE",
    label: "Yemen",
    code: "",
  },
  {
    value: "ZM",
    label: "Zambia",
    code: "",
  },
  {
    value: "ZW",
    label: "Zimbabwe",
  },
];
