import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import CSVToJSON from "csvtojson";

const prisma = new PrismaClient();

async function addUsers() {
  const users = await CSVToJSON().fromFile("prisma/seed-data/users.csv");
  for (const user of users) {
    await addUser(
      user.email,
      user.phoneNumber,
      user.password,
      user.role as any
    );
  }
}
const addUser = async (
  email: string,
  phoneNumber: string,
  password: string,
  role: any
) =>
  prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordDigest: await bcrypt.hash(password, 10),
      role: role,
      phoneNumber,
    },
  });

addUsers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("prisma seed finished");
    await prisma.$disconnect();
  });
