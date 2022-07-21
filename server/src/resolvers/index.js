const { ApolloError } = require("apollo-server-errors");
const User = require("../models/user.model");
const { createToken } = require("../../utils/");

const resolvers = {
  Query: {
    hello: () => "Hi",
    getUser: async (_parent, { id }, _ctx, _info) => {
      const user = await User.findById(id);
      if (!user) {
        throw new ApolloError("User does not found...");
      }
      return user;
    },
  },

  Mutation: {
    register: async (_parent, args, _ctx, _info) => {
      const { fullName, email, password } = args.user;

      // if user still exists,return error message
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new ApolloError("User Exists...");
      }

      // create new user
      const user = new User({ fullName, email, password });

      // create token
      const token = createToken(user.id);
      user.token = token;

      // save user
      await user.save();
      return user;
    },

    login: async (_parent, args, _ctx, _info) => {
      const { email, password } = args.user;

      const user = await User.findOne({ email });

      //if user does not found, return error message
      if (!user) {
        throw new ApolloError("User does not found...");
      }

      // check password is correct
      const isPasswordCorrect = await user.checkPassword(password);
      if (!isPasswordCorrect) {
        throw new ApolloError("Password is wrong, try again...");
      }

      return user;
    },
  },
};

module.exports = resolvers;
