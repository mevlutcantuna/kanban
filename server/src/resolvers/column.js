const Column = require("../models/column.model");
const { ApolloError } = require("apollo-server-errors");

module.exports = {
  Query: {
    getAllColumns: async (_parent, args, _ctx, _info) => {
      const { userId } = args;

      const cols = await Column.find({ user: userId });

      if (!cols) throw new ApolloError("Something went wrong...");

      return cols;
    },
  },
  Mutation: {
    createColumn: async (_parent, args, _ctx, _info) => {
      const { name, userId } = args.column;
      // check if there is a same name column
      const col = await Column.findOne({ id: userId, name });
      if (col) {
        throw new ApolloError("You have the same name of a column...");
      }

      const newCol = new Column({ name, user: userId });
      await newCol.save();
      return newCol;
    },
    deleteColumn: async (_parent, args, _ctx, _info) => {
      const { id } = args;

      const col = await Column.findByIdAndDelete(id);

      if (!col) {
        throw new ApolloError("Something went wrong...");
      }

      return col;
    },
  },
};
