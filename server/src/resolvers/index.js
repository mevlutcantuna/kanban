const authResolver = require("./auth");
const columnResolver = require("./column");
const taskResolver = require("./task");

const resolvers = {
  Query: {
    ...authResolver.Query,
    ...columnResolver.Query,
    ...taskResolver.Query,
  },

  Mutation: {
    ...authResolver.Mutation,
    ...columnResolver.Mutation,
    ...taskResolver.Mutation,
  },
};

module.exports = resolvers;
