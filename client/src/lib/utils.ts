import { message } from "antd";
import { IColumn, ITask } from "../types";

export const reorderColumn = (
  sourceCol: any,
  startIndex: any,
  endIndex: any
) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

export const successMessage = (msg: string) => {
  return message.success(msg);
};

export const errorMessage = (msg: string) => {
  return message.error(msg);
};

export const isAuthanticated = () => {
  const token = localStorage.getItem("token");
  if (token) return true;
  else return false;
};

export const generateUserLogo = (name: string) => {
  const namewords = name.split(" ");
  const letters =
    namewords[0].split("")[0] +
    (namewords[1]?.split("") ? namewords[1]?.split("")[0] : "") +
    (namewords[2]?.split("") ? namewords[2]?.split("")[0] : "");
  return letters;
};

export const createKanbanState = (tasks: ITask[], columns: IColumn[]) => {
  let newTasks: any = {};
  let newColumns: any = {};

  for (let i = 0; i < tasks?.length; i++) {
    newTasks[tasks[i].id as string] = tasks[i];
  }

  for (let i = 0; i < columns?.length; i++) {
    newColumns[columns[i].id as string] = columns[i];
  }

  const kanbanState = {
    tasks: newTasks,
    columns: newColumns,
  };

  return kanbanState;
};
