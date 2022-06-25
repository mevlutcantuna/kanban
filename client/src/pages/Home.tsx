import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../components/Column";
import Header from "../components/Header";
import { reorderColumn } from "../lib/utils";

import { initialData } from "../mock-data";

const Home = () => {
  const [state, setState] = useState<any>(initialData);
  //console.log(Object.entries(state.columns))

  const onEndDrag = (result: any) => {
    const { source, destination } = result;

    // if user drops in an unknown place
    if (!destination) return;

    // if user drags and drops in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // get colums infos of source and destination
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];
    // if user drops within the same columns, but in a different position

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumn(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // if user drops in a different colums
  };

  return (
    <div className="w-screen h-screen bg-lightBlack">
      <Header />
      <DragDropContext onDragEnd={onEndDrag}>
        <div className="flex justify-between w-full max-w-[1000px] m-auto mt-4">
          {Object.entries(state.columns).map(([columnId, column]: any) => {
            const tasks = column.taskIds.map(
              (taskId: any) => state.tasks[taskId]
            );
            return <Column key={columnId} column={column} tasks={tasks} />;
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Home;
