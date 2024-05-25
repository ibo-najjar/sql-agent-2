import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  const data = [
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
      phone: "1234567890",
      branch: "Bengaluru",
    },
    {
      name: "sachin Tendulkar",
      email: "sanchin@gmail.com",
      phone: "1234567890",
      branch: "Mumbai",
    },
    {
      name: "Rahul Dravid",
      email: "rahul@gmail.com",
      phone: "1234567890",
      branch: "Bengaluru",
    },
  ];

  const res = await prisma.customers.createMany({
    data,
  });

  console.log({ res });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
