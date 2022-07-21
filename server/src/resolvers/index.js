const User = require("../models/user.model");
const { ApolloError } = require("apollo-server-errors");
const { createToken } = require("../../utils/");
const authResolver = require("./auth");

const resolvers = {
  Query: {
    ...authResolver.Query,
  },

  Mutation: {
    ...authResolver.Mutation,
  },
};

module.exports = resolvers;
