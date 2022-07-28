import { IState } from "../types";

export const initialData: IState = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Take out the garbage",
      tag: "Medium",
      user: "dsa",
      __typename: "dsad",
    },
    "task-2": {
      id: "task-2",
      content: "Watch my favorite show",
      tag: "Medium",
      user: "dsa",
      __typename: "dsad",
    },
    "task-3": {
      id: "task-3",
      content: "Charge my phone",
      tag: "Low",
      user: "dsa",
      __typename: "dsad",
    },
    "task-4": {
      id: "task-4",
      content: "Cook dinner",
      tag: "High",
      user: "dsa",
      __typename: "dsad",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      name: "To do",
      taskIds: ["task-1", "task-2", "task-3"],
      __typename: "dsad",
    },
    "column-2": {
      id: "column-2",
      name: "In progress",
      taskIds: ["task-4"],
      __typename: "dsad",
    },
    "column-3": {
      id: "column-3",
      name: "Done",
      taskIds: [],
      __typename: "dsad",
    },
  },
};
