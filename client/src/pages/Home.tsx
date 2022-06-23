import Column from "../components/Column";
import Header from "../components/Header";
import { colums } from '../mock-data'
import { DragDropContext } from 'react-beautiful-dnd'


const Home = () => {
  return (
    <div className="w-screen h-screen bg-lightBlack">
      <Header />
      <DragDropContext>
        <div className="flex justify-between max-w-[1000px] m-auto mt-10">
          {
            colums.map((item: any) => <Column item={item} key={item.id} />)
          }
        </div>
      </DragDropContext>

    </div>
  );
};

export default Home;
