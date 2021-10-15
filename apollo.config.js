module.exports = {
  client: {
    includes: ["./components/**", "./pages/**"],
    service: {
      name: "credit-card",
      localSchemaFile: __dirname + "/graphql.schema.json",
    },
  },
};
