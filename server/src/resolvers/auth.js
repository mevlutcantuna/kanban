const User = require("../models/user.model");
const { ApolloError } = require("apollo-server-errors");
const { createToken, verifyToken } = require("../../utils/");

module.exports = {
  Query: {
    getUser: async (_parent, { token }, _ctx, _info) => {
      // verify token and get id
      const id = verifyToken(token);

      const user = await User.findById(id);
      if (!user) {
        throw new ApolloError("User does not found...", "NOT_FOUND");
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
        throw new ApolloError("User Exists...", "ALREADY_EXISTS");
      }

      // create new user
      const user = new User({ fullName, email, password });

      // save user
      await user.save();
      return user;
    },

    login: async (_parent, args, _ctx, _info) => {
      const { email, password } = args.user;

      const user = await User.findOne({ email });

      //if user does not found, return error message
      if (!user) {
        throw new ApolloError("User does not found...", "NOT_FOUND");
      }

      // check password is correct
      const isPasswordCorrect = await user.checkPassword(password);
      if (!isPasswordCorrect) {
        throw new ApolloError(
          "Password is wrong, try again...",
          "INCORRECT_PASSWORD"
        );
      }
      // create token
      const token = createToken(user.id);
      user.token = token;
      return user;
    },
  },
};
