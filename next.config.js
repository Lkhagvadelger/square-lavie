const nextTranslate = require("next-translate-plugin");

const nextConfig = {
  headers: async () => [
    {
      source: "/(.*)?",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: "*",
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET,HEAD,PUT,PATCH,POST,DELETE",
        },
      ],
    },
  ],
  // async redirects() {
  //   return [
  //     {
  //       // source: "/widget",
  //       // destination: "/app/patient",
  //       // permanent: true,
  //     },
  //   ];
  // },
  eslint: {},
  reactStrictMode: true,
};

module.exports = nextTranslate(nextConfig);
