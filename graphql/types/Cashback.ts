import { objectType, extendType, nonNull, intArg, floatArg } from 'nexus';

export const Cashback = objectType({
  name: 'Cashback',
  definition(t) {
    t.int('creditCardId');
    t.int('merchantId');
    t.float('cashback');
    t.string('merchantName');
    t.string('creditCardName');
    t.string('benefitName');
  },
});

export const CashbackCalculator = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('calculateCashback', {
      type: 'Cashback',
      description: 'Calculates the cashback amount of a purchase given a merchant, credit card, and purchase amount.',
      args: {
        creditCardId: nonNull(intArg()),
        merchantId: nonNull(intArg()),
        purchaseAmount: nonNull(floatArg()),
      },
      async resolve(_parent, args, ctx) {
        const merchant = await ctx.prisma.merchant.findUnique({
          where: {
            id: args.merchantId,
          },
        });

        const benefit = await ctx.prisma.benefit.findFirst({
          where: {
            creditCards: {
              some: {
                creditCardId: args.creditCardId,
              },
            },
            merchantCategoryCode: {
              some: {
                merchantCategoryCodeId: merchant.merchantCodeId,
              },
            },
          },
          include: {
            creditCards: {
              where: {
                creditCardId: {
                  equals: args.creditCardId,
                },
              },
              include: {
                creditCard: true,
              },
            },
          },
        });

        if (!benefit) {
          return Promise.reject(new Error('No benefits associated between credit card and merchant category'));
        }

        const cashback = +(benefit.benefitCashback * args.purchaseAmount).toFixed(2);

        return Promise.resolve({
          creditCardId: args.creditCardId,
          merchantId: args.merchantId,
          cashback,
          merchantName: merchant.merchantName,
          creditCardName: benefit.creditCards[0].creditCard.creditCardName,
          benefitName: benefit.name,
        });
      },
    });
  },
});
