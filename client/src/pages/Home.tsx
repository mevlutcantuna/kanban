import Column from "../components/Column";
import Header from "../components/Header";
import { colums, todos } from "../mock-data";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState } from "react";


const Home = () => {
  const [allTodos, setAllTodos] = useState<any>([...todos])

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    console.log(result)
  }

  return (
    <div className="w-screen h-screen bg-lightBlack">
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-between max-w-[1000px] m-auto mt-10">
          {colums.map((item: any) => (
            <div key={item.id}>
              <Droppable droppableId={item.id}>
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
                )
                }
              </Droppable>
            </div>

          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Home;
