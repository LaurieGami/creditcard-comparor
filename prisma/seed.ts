import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // await prisma.creditCardBenefit.create({
  //   data: {
  //     benefitId: 1,
  //     creditCardId: 1,
  //   },
  // });

  await prisma.benefitMerchantCategoryCode.create({
    data: {
      benefitId: 1,
      merchantCategoryCodeId: 1,
    },
  });
  // await prisma.merchant.create({
  //   data: {
  //     merchantName: "Starbucks",
  //     merchantCodeId: 1,
  //   },
  // });

  // // .merchantCategoryCode.create({
  // //   data: {
  // //     merchantCategoryCode: 5812,
  // //     merchantCategory: "Eating Places and Restaurants",
  // //   },
  // // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
