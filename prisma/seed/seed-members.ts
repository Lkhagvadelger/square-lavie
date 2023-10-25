import { teamApi } from "../../lib/square/api/squareClient";
import { PrismaClient } from "@prisma/client";

export const seedMembers = async (prisma: PrismaClient) => {
  const resp = await teamApi.searchTeamMembers({
    limit: 100,
  });
  const members = resp.result.teamMembers;
  if (!members) {
    console.log("NO MEMBERS WERE FOUND");
    return members;
  }
  const existing = await prisma.teamMember.findMany({
    where: {
      id: {
        in: members?.map((l) => l.id as string) ?? [],
      },
    },
  });
  const newMembers = members?.filter(
    (order) => !existing.some((existingOrder) => existingOrder.id === order.id)
  );

  if (newMembers.length === 0) {
    console.log(`NO NEW MEMBERS TO ADD TO DB`);
    return members;
  }

  await prisma.teamMember.createMany({
    data: newMembers as any,
  });
  console.log(`${newMembers?.length} MEMBERS WERE ADDED TO DB`);
  return members;
};
