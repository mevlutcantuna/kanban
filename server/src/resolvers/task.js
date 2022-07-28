const Task = require("../models/task.model");
const Column = require("../models/column.model");
const { ApolloError } = require("apollo-server-errors");

module.exports = {
  Query: {
    getAllTasks: async (_parent, args, _ctx, _info) => {
      const { userId } = args;
      const tasks = await Task.find({ user: userId });
      return tasks;
    },
  },

  Mutation: {
    createTask: async (_parent, args, _ctx, _info) => {
      const { tag, content, userId, columnId } = args.task;

      // if there is a task with same content, return warning
      const taskExists = await Task.findOne({ content });
      if (taskExists)
        throw new ApolloError(
          "There is a task with same content,change your content..."
        );

      // add a new task
      const task = new Task({ tag, content, user: userId, columnId });
      await task.save();

      // get column details
      const oldCol = await Column.findById(columnId);
      const newTaskIdsArr = [...oldCol.taskIds, task.id];

      // update taskIds of the column
      await Column.findByIdAndUpdate(columnId, {
        taskIds: newTaskIdsArr,
      });

      return task;
    },
    updateTask: async (_parent, args, _ctx, _info) => {
      const { id, ...others } = args.task;

      // if there is no task with the id
      const task = await Task.findById(id);
      if (!task) throw new ApolloError("There is no task with the id");

      // if there is a task with same content, return error
      const isTaskExisted = await Task.findOne({ content: others.content });
      if (isTaskExisted) throw new ApolloError("There is no task with the id");

      // update task
      const updatedTask = await Task.findByIdAndUpdate(id, others, {
        new: true,
      });

      updatedTask.save();
      return updatedTask;
    },
    deleteTask: async (_parent, args, _ctx, _info) => {
      const { id } = args;

      const task = await Task.findByIdAndDelete(id);

      // when deleting task, update the column taskIds
      const col = await Column.findById(task.columnId);

      const updatedColTaskIds = col.taskIds.filter((item) => item !== id);

      await Column.findByIdAndUpdate(task.columnId, {
        taskIds: updatedColTaskIds,
      });

      return task;
    },
  },
};
