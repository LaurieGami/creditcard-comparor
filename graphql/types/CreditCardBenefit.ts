import { objectType, extendType, nonNull, intArg } from 'nexus';

export const CreditCardBenefit = objectType({
  name: 'CreditCardBenefit',
  definition(t) {
    t.int('benefitId'), t.int('creditCardId');
  },
});

export const CreditCardBenefitQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('creditCardBenefits', {
      type: 'CreditCardBenefit',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.creditCardBenefit.findMany();
      },
    });
  },
});

export const CreditCardBenefitMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addCreditCardBenefit', {
      type: 'CreditCardBenefit',
      args: {
        benefitId: nonNull(intArg()),
        creditCardId: nonNull(intArg()),
      },
      async resolve(_parent, args, ctx) {
        const draft = {
          benefitId: args.benefitId,
          creditCardId: args.creditCardId,
        };

        await ctx.prisma.creditCardBenefit.create({
          data: draft,
        });

        return Promise.resolve(draft);
      },
    });
  },
});
