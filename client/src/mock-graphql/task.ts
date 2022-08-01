import {
  CREATE_TASK,
  DELETE_TASK,
  GET_ALL_TASKS,
  UPDATE_TASK,
} from "../graphql/task";

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

export const createTaskError = {
  request: {
    query: CREATE_TASK,
    variables: {
      task: {
        content: "Take out the garbage",
        columnId: "column-2",
        tag: "High",
        userId: "1",
      },
    },
  },
  error: new Error("There is a task with same content."),
};

export const updateTaskSuccess = {
  request: {
    query: UPDATE_TASK,
    variables: {
      task: {
        id: "1",
        content: "Updated Task 44",
        tag: "High",
      },
    },
  },
  result: {
    data: {
      updateTask: {
        id: "1",
        content: "Updated Task 44",
        tag: "High",
        columnId: "column-1",
        user: "1",
      },
    },
  },
};

export const updateTaskError = {
  request: {
    query: UPDATE_TASK,
    variables: {
      task: {
        content: "Watch my favorite show",
        tag: "High",
        id: "1",
      },
    },
  },
  error: new Error("There is a task with same content."),
};

export const deleteTask = {
  request: {
    query: DELETE_TASK,
    variables: {
      deleteTaskId: "1",
    },
  },
  result: {
    data: {
      deleteTask: {
        id: "1",
        columnId: "column-1",
        user: "1",
        content: "Take out the garbage",
        tag: "Medium",
      },
    },
  },
};
