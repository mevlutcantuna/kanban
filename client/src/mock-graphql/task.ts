import { CREATE_TASK, GET_ALL_TASKS } from "../graphql/task";

export const getAllTasks = {
  request: {
    query: GET_ALL_TASKS,
    variables: {
      userId: "1",
    },
  },
  result: {
    data: {
      getAllTasks: [
        {
          id: "1",
          content: "Take out the garbage",
          tag: "Medium",
          columnId: "column-1",
          user: "1",
        },
        {
          id: "2",
          content: "Watch my favorite show",
          tag: "Medium",
          columnId: "column-1",
          user: "1",
        },
      ],
    },
  },
};

export const createTaskSuccess = {
  request: {
    query: CREATE_TASK,
    variables: {
      task: {
        content: "New Task 44",
        columnId: "column-2",
        tag: "High",
        userId: "1",
      },
    },
  },
  result: {
    data: {
      createTask: {
        id: "3",
        content: "New Task 44",
        user: "1",
        columnId: "column-2",
        tag: "High",
      },
    },
  },
};
