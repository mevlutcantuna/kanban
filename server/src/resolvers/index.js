const User = require("../models/user.model");
const authResolver = require("./auth");
const columnResolver = require("./column");

const resolvers = {
  Query: {
    ...authResolver.Query,
    ...columnResolver.Query,
  },

  Mutation: {
    ...authResolver.Mutation,
    ...columnResolver.Mutation,
  },
};

module.exports = resolvers;
