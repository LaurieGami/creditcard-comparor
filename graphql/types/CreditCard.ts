import { objectType, extendType, nonNull, stringArg } from "nexus";

export const CreditCard = objectType({
  name: "CreditCard",
  definition(t) {
    t.int("id");
    t.string("creditCardName");
  },
});

export const CreditCardQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("creditCards", {
      type: "CreditCard",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.creditCard.findMany();
      },
    });
  },
});

export const AddCreditCardMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("addCreditCard", {
      type: "CreditCard",
      args: {
        creditCardName: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        const total = await ctx.prisma.creditCard.count();

        const draft = {
          id: total + 1,
          creditCardName: args.creditCardName,
        };

        await ctx.prisma.creditCard.create({
          data: draft,
        });

        return Promise.resolve(draft);
      },
    });
  },
});
