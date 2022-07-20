const User = require("../models/user.model");

const resolvers = {
  Query: {
    hello: () => "Hi",
    getUser: async (_parent, { id }, _ctx, _info) => {
      return await User.findById(id);
    },
  },

  Mutation: {
    register: async (_parent, args, _ctx, _info) => {
      const { fullName, email, password } = args.user;
      const user = new User({ fullName, email, password });
      await user.save();
      return user;
    },
  },
};

module.exports = resolvers;
