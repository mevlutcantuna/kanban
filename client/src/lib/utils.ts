import { message } from "antd";

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

export const successMessage = (msg: String) => {
  return message.success(msg);
};

export const errorMessage = (msg: String) => {
  return message.error(msg);
};

export const isAuthanticated = () => {
  const token = localStorage.getItem("token");
  if (token) return true;
  else return false;
};
