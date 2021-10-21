import { objectType, extendType, nonNull, stringArg, floatArg, intArg } from 'nexus';

export const Benefit = objectType({
  name: 'Benefit',
  definition(t) {
    t.int('id'), t.string('name'), t.float('benefitCashback');
  },
});

export const BenefitQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('benefits', {
      type: 'Benefit',
      async resolve(_parent, _args, ctx) {
        return ctx.prisma.benefit.findMany();
      },
    });
  },
});

export const AddBenefitMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addBenefit', {
      type: 'Benefit',
      args: {
        benefitName: nonNull(stringArg()),
        benefitCashback: nonNull(floatArg()),
        merchantCodeId: nonNull(intArg()),
      },
      async resolve(_parent, args, ctx) {
        const total = await ctx.prisma.benefit.count();
        const benefitId = total + 1;

        const draft = {
          id: benefitId,
          name: args.benefitName,
          benefitCashback: args.benefitCashback,
        };

        await ctx.prisma.benefit.create({
          data: draft,
        });

        await ctx.prisma.benefitMerchantCategoryCode.create({
          data: {
            benefitId: benefitId,
            merchantCategoryCodeId: args.merchantCodeId,
          },
        });

        return Promise.resolve(draft);
      },
    });
  },
});
