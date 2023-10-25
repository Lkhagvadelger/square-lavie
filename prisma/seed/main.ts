import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { seedOrders } from "./seed-orders";
import { seedLocations } from "./seed-locations";
import { seedPayments } from "./seed-payments";
import { seedMembers } from "./seed-members";
import { seedCustomerGroup } from "./seed-customer-group";
import { seedCustomerSegment } from "./seed-customer-segment";
import { seedCustomer } from "./seed-customer";

const prisma = new PrismaClient();

async function main() {
  console.log("-------SEEDING PROCESS STARTS--------");
  await seedCustomer(prisma);
  return;

  await seedCustomerGroup(prisma);
  await seedCustomerSegment(prisma);

  await seedMembers(prisma);

  const locations = await seedLocations(prisma);
  if (!locations) {
    console.error("NO LOCATION FOUND!!!");
    return;
  }
  for (const l of locations) {
    await seedPayments(prisma, l.id!, undefined, (payments) =>
      seedOrders(
        prisma,
        l.id!,
        payments.map((p) => p.orderId ?? "").filter((p) => p != "")
      )
    );
  }
  // await seedOrders();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("prisma seed finished");
    await prisma.$disconnect();
  });
