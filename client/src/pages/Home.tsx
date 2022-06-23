import Column from "../components/Column";
import Header from "../components/Header";
import { colums } from "../mock-data";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Home = () => {
  const onDragEnd = (result: any) => {
    console.log(result)
  };

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
