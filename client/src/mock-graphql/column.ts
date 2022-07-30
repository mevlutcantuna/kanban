import { CREATE_COLUMN, GET_ALL_COLUMNS } from "../graphql/column";

export const getAllColumns = {
  request: {
    query: GET_ALL_COLUMNS,
    variables: {
      userId: "1",
    },
  },
  result: {
    data: {
      getAllColumns: [
        {
          id: "column-1",
          name: "To do",
          taskIds: ["1", "2"],
        },
        {
          id: "column-2",
          name: "In progress",
          taskIds: [],
        },
        {
          id: "column-3",
          name: "Done",
          taskIds: [],
        },
      ],
    },
  },
};

export const createColumnSuccess = {
  request: {
    query: CREATE_COLUMN,
    variables: {
      column: {
        name: "New Col 44",
        userId: "1",
      },
    },
  },
  result: {
    data: {
      createColumn: {
        id: "1",
        userId: "1",
        taskIds: [],
        name: "New Col 44",
      },
    },
  },
};

export const createColumnError = {
  request: {
    query: CREATE_COLUMN,
    variables: {
      column: {
        name: "To do",
        userId: "1",
      },
    },
  },
  error: new Error("You have the same name of a column..."),
};
