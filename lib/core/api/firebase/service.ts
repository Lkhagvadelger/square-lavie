import { prisma } from "@api/prisma";

export const saveFirebaseToken = async (token: string) => {
  const existingToken = await prisma.firebaseToken.findFirst({
    where: {
      token: token,
    },
  });
  !existingToken &&
    (await prisma.firebaseToken.create({
      data: {
        token,
      },
    }));
  return {};
};
