import { stringArg, nonNull, objectType, extendType, intArg } from 'nexus';

export const Merchant = objectType({
  name: 'Merchant',
  definition(t) {
    t.int('id');
    t.string('merchantName');
    t.int('merchantCodeId');
  },
});

export const MerchantQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('merchants', {
      type: 'Merchant',
      async resolve(_parent, _args, ctx) {
        return ctx.prisma.merchant.findMany({
          include: {
            merchantCategoryCode: true,
          },
        });
      },
    });
  },
});

export const AddMerchantMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addMerchant', {
      type: 'Merchant',
      args: {
        merchantName: nonNull(stringArg()),
        merchantCategoryCode: nonNull(intArg()),
      },
      async resolve(_parent, args, ctx) {
        const total = await ctx.prisma.merchant.count();

        try {
          const unique = await ctx.prisma.merchantCategoryCode.findUnique({
            where: {
              id: args.merchantCategoryCode,
            },
          });

          if (unique === null) {
            throw new Error('Unable to find merchant category code');
          }
        } catch (e) {
          return Promise.reject(e instanceof Error ? e : new Error('Unable to find associated category code'));
        }

        const draft = {
          id: total + 1,
          merchantName: args.merchantName,
          merchantCodeId: args.merchantCategoryCode,
        };

        await ctx.prisma.merchant.create({
          data: draft,
        });

        return Promise.resolve(draft);
      },
    });
  },
});
