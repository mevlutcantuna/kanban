export const reorderColumn = (
  sourceCol: any,
  startIndex: any,
  endIndex: any
) => {
  const [removed] = sourceCol.tasks.splice(startIndex, 1);
  sourceCol.tasks.splice(endIndex, 0, removed);

  return sourceCol.tasks;
};
