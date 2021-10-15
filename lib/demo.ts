import { PrismaClient } from "@prisma/client";

const execute = (fn, name) => {
  return fn().then((result) => {
    console.log(name, result);
    return result;
  });
};

const demoDb = async (prisma: PrismaClient) => {
  const merchant = await execute(
    () =>
      prisma.merchant.findFirst({
        where: {
          merchantName: "Starbucks",
        },
      }),
    "Starbucks"
  );

  const creditCard = await execute(
    () =>
      prisma.creditCard.findFirst({
        where: {
          creditCardName: "Discover It",
        },
      }),
    "Credit Card Discover It"
  );

  const result = await execute(
    () =>
      prisma.benefit.findFirst({
        where: {
          creditCards: {
            every: {
              creditCardId: creditCard.id,
            },
          },
          merchantCategoryCode: {
            every: {
              merchantCategoryCodeId: merchant.merchantCodeId,
            },
          },
        },
      }),
    "credit card benefit"
  );

  console.log(
    `The estimated benefit when spending $5 is \$${result.benefitCashback * 5}`
  );
};

export default demoDb;
