import { objectType, extendType } from 'nexus';

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
