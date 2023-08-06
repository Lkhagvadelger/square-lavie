import { getUserById } from "@lib/user/api/service";

export const serializeUser = (user: any, callback: any) => {
  callback(null, user.id);
};

export const deserializeUser = async (id: string, callback: any) => {
  const user = await getUserById(id);
  callback(null, user);
};

export * from "./strategies/facebook";
export * from "./strategies/google";
export * from "./strategies/local";
