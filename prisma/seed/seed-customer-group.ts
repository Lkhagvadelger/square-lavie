import { customerGroupsApi } from "../../lib/square/api/squareClient";
import { PrismaClient } from "@prisma/client";

export const seedCustomerGroup = async (prisma: PrismaClient) => {
  const resp = await customerGroupsApi.listCustomerGroups(undefined, 50);

  const groups = resp.result.groups;
  if (!groups) {
    console.log("NO groups WERE FOUND");
    return groups;
  }
  const existing = await prisma.customerGroup.findMany({
    where: {
      id: {
        in: groups?.map((l) => l.id as string) ?? [],
      },
    },
  });
  const newgroups = groups?.filter(
    (order) => !existing.some((existingOrder) => existingOrder.id === order.id)
  );

  if (newgroups.length === 0) {
    console.log(`NO NEW groups TO ADD TO DB`);
    return groups;
  }

  await prisma.customerGroup.createMany({
    data: newgroups as any,
  });
  console.log(`${newgroups?.length} groups WERE ADDED TO DB`);
  return groups;
};
