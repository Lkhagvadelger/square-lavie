import { prisma } from "@api/prisma";
const convertIpAddressToNumber = (ip: string) => {
  const parts: string[] = ip.split(".");
  const total: any =
    Number.parseInt(parts[0]) * 16777216 +
    Number.parseInt(parts[1]) * 65536 +
    Number.parseInt(parts[2]) * 256 +
    Number.parseInt(parts[3]) * 1;
  return total;
};
const isIPv4Format = (ip: string) => {
  return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
    ip
  );
};

export const getCountryCodeByIpAddress = async (ip: string) => {
  console.log(ip, "getCountryCodeByIpAddress");
  if (isIPv4Format(ip) === false) return "us";
  const ipNumber = convertIpAddressToNumber(ip);
  console.log(ipNumber, "ip number");
  const data = await prisma.iP2Location.findFirst({
    where: {
      ipFrom: {
        lte: ipNumber,
      },
      ipTo: {
        gte: ipNumber,
      },
    },
  });
  console.log(data, "ip data");

  if (data) {
    return data.countryCode.toLocaleLowerCase();
  } else {
    return "us";
  }
};
