import Column from "../components/Column";
import Header from "../components/Header";
import { columns } from "../mock-data";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { reorderColumn } from "../lib/utils";

const Home = () => {
  const [allColumns, setAllColumns] = useState<any>([...columns]);

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    // if user drops todo to unknown destination
    if (!destination) return;

    // if user drags and drops back same destination
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    // get columns infos
    let sourceCol: any;
    let destinationCol: any;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i]._id === source.droppableId) {
        sourceCol = columns[i];
      }
      if (columns[i]._id === destination.droppableId) {
        destinationCol = columns[i];
      }
    }

    // if user drops within the same column but in a different position

    if (sourceCol.id === destinationCol.id) {
      const newColumnsTasksList = reorderColumn(
        sourceCol,
        source.index,
        destination.index
      );

      const newAllColumns = allColumns.map((item: any) => {
        if (item.id === sourceCol.id) {
          return { ...item, tasks: newColumnsTasksList };
        } else return item;
      });

      setAllColumns(newAllColumns);
    }
  };

  return (
    <div className="w-screen h-screen bg-lightBlack">
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-between max-w-[1000px] m-auto mt-10">
          {allColumns.map((item: any) => (
            <div key={item._id}>
              <Droppable droppableId={`${item._id}`}>
                {(provided: any) => (
                  <div>
                    <Column
                      allColumns={allColumns}
                      {...provided.droppableProps}
                      innerRef={provided.innerRef}
                      item={item}
                      key={item.id}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Home;
