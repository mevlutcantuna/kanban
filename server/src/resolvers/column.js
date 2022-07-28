const Column = require("../models/column.model");
const Task = require("../models/task.model");
const { ApolloError } = require("apollo-server-errors");

module.exports = {
  Query: {
    getAllColumns: async (_parent, args, _ctx, _info) => {
      const { userId } = args;
      const cols = await Column.find({ user: userId });
      return cols;
    },
  },
  Mutation: {
    createColumn: async (_parent, args, _ctx, _info) => {
      const { name, userId } = args.column;
      // check if there is a same name column
      const col = await Column.findOne({ user: userId, name });
      if (col) {
        throw new ApolloError("You have the same name of a column...");
      }

      const newCol = new Column({ name, user: userId });
      await newCol.save();
      return newCol;
    },
    deleteColumn: async (_parent, args, _ctx, _info) => {
      const { id } = args;

      // get user id of column owner
      const colInfo = await Column.findById(id);
      // if there is only one columns, show error that user must have at least one column
      const colOfUsers = await Column.find({ user: colInfo.user });
      if (colOfUsers.length <= 1)
        throw new ApolloError("You must have one column at least...");

      // delete column
      const col = await Column.findByIdAndDelete(id);
      if (!col) {
        throw new ApolloError("Something went wrong...");
      }

      // delete the tasks depend on the column
      for (let i = 0; i < col.taskIds.length; i++) {
        await Task.findByIdAndDelete(col.taskIds[i]);
      }

      return col;
    },

    updateColumn: async (_parent, args, _ctx, _info) => {
      const { id, ...others } = args.column;

      // if there is no task with the id
      const col = await Column.findById(id);
      if (!col) throw new ApolloError("There is no task with the id");

      // if there is a column with same name, return error
      const cl = await Column.findOne({ name: others.name });
      if (cl) throw new ApolloError("There is a column with same name");

      // update task
      const updatedTask = await Column.findByIdAndUpdate(id, others, {
        new: true,
      });

      updatedTask.save();
      return updatedTask;
    },
  },
};
