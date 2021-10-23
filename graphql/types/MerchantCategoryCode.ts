import { objectType, extendType, stringArg, intArg, nonNull } from 'nexus';

export const MerchantCategoryCode = objectType({
  name: 'MerchantCategoryCode',
  definition(t) {
    t.int('id');
    t.int('merchantCategoryCode');
    t.string('merchantCategory');
  },
});

export const MerchantCategoryCodeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('merchantCategoryCodes', {
      type: 'MerchantCategoryCode',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.merchantCategoryCode.findMany();
      },
    });
  },
});

export const AddMerchantCategoryCode = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addMerchantCategoryCode', {
      type: 'MerchantCategoryCode',
      args: {
        merchantCategoryCode: nonNull(intArg()),
        merchantCategory: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        const total = await ctx.prisma.merchantCategoryCode.count();

        const draft = {
          id: total + 1,
          merchantCategoryCode: args.merchantCategoryCode,
          merchantCategory: args.merchantCategory,
        };

        await ctx.prisma.merchantCategoryCode.create({
          data: draft,
        });

        return Promise.resolve(draft);
      },
    });
  },
});
