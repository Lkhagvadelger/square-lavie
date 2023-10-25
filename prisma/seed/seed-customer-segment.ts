import { customerSegmentsApi } from "../../lib/square/api/squareClient";
import { PrismaClient } from "@prisma/client";

export const seedCustomerSegment = async (prisma: PrismaClient) => {
  const resp = await customerSegmentsApi.listCustomerSegments(undefined, 50);

  const segments = resp.result.segments;
  if (!segments) {
    console.log("NO segments WERE FOUND");
    return segments;
  }
  const existing = await prisma.customerSegment.findMany({
    where: {
      id: {
        in: segments?.map((l) => l.id as string) ?? [],
      },
    },
  });
  const newsegments = segments?.filter(
    (order) => !existing.some((existingOrder) => existingOrder.id === order.id)
  );

  if (newsegments.length === 0) {
    console.log(`NO NEW segments TO ADD TO DB`);
    return segments;
  }

  await prisma.customerSegment.createMany({
    data: newsegments as any,
  });
  console.log(`${newsegments?.length} segments WERE ADDED TO DB`);
  return segments;
};
