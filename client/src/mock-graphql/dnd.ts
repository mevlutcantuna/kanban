import { UPDATE_COLUMN } from "../graphql/column";

export const updateColumnSuccessDND = {
  request: {
    query: UPDATE_COLUMN,
    variables: {
      column: {
        id: "column-1",
        taskIds: ["2", "1"],
      },
    },
  },
  result: {
    data: {
      updateColumn: {
        id: "column-1",
        name: "To do",
        taskIds: ["1", "2"],
        user: "1",
      },
    },
  },
};
