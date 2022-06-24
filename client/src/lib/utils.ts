export const reorderColumn = (
  sourceCol: any,
  startIndex: any,
  endIndex: any
) => {
  const [removed] = sourceCol.todos.splice(startIndex, 1);
  sourceCol.todos.splice(endIndex, 0, removed);

  return sourceCol.todos;
};
