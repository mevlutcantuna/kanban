import Column from "../components/Column";
import Header from "../components/Header";
import { columns, todos } from "../mock-data";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { reorderColumn } from "../lib/utils";

const Home = () => {
  const [allTodos, setAllTodos] = useState<any>([...todos]);

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    // if user drops todo to unknown destination
    if (!destination) return;

    // if user drags and drops back same destination 
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) return;

    // get columns infos
    let sourceCol;
    let destinationCol;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].id === source.droppableId) {
        sourceCol = columns[i]
      }
      if (columns[i].id === destination.droppableId) {
        destinationCol = columns[i]
      }
    }

    // if user drops within the same column but in a different position

    if (sourceCol?.id === destinationCol?.id) {
      const newColumn = reorderColumn(
        sourceCol,
        source.index,
        destination.index
      )
    }

    console.log('source', sourceCol, 'des', destinationCol)

    //console.log(result);
  };



  return (
    <div className="w-screen h-screen bg-lightBlack">
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-between max-w-[1000px] m-auto mt-10">
          {columns.map((item: any) => (
            <div key={item.id}>
              <Droppable droppableId={`${item.id}`}>
                {(provided: any) => (
                  <div>
                    <Column
                      allTodos={allTodos}
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
