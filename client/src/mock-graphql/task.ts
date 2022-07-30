import { GET_ALL_TASKS } from "../graphql/task";

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
