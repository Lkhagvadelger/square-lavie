import { locationsApi } from "../../lib/square/api/squareClient";
import { Prisma, PrismaClient } from "@prisma/client";

export const seedLocations = async (prisma: PrismaClient) => {
  var resp = await locationsApi.listLocations();

  if (!resp.result.locations) return [];
  //db seed locations
  const existing = await prisma.location.findMany({
    where: {
      id: {
        in: resp.result.locations.map((l) => l.id as string),
      },
    },
  });
  if (existing.length > 0) return resp.result.locations;
  await prisma.location.createMany({
    data: resp.result.locations as Prisma.LocationCreateManyInput[],
  });

  return resp.result.locations;
};
