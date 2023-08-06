module.exports = {
  locales: ["en"],
  defaultLocale: "en",
  pages: {
    "*": ["common", "error", "auth", "account"],
  },
  interpolation: {
    prefix: "${",
    suffix: "}",
  },
};
