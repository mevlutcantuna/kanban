import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import Column from "../components/Column";
import CreateButtons from "../components/CreateButtons";
import Header from "../components/Header";
import { GET_USER } from "../graphql/auth";
import { isAuthanticated, reorderColumn } from "../lib/utils";

import { initialData } from "../mock-data";

const Home = () => {
  const [state, setState] = useState<any>(initialData);
  //console.log(Object.entries(state.columns))
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const { error, data } = useQuery(GET_USER, {
    variables: { token }
  })


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
      // update the DB


      return 2;
    }

    // if user drops in a different colums
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);

    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setState(newState);

    // update the DB

  };


  useEffect(() => {
    // if user is not authanticated, redirects login page
    if (!isAuthanticated()) {
      return navigate('/login', { replace: true })
    }
    if (error) {
      localStorage.removeItem('token')
      return navigate('/login', { replace: true })
    }
  }, [navigate, error, token])

  return (
    <div className="w-screen h-screen bg-lightBlack">
      {data ? <div>
        <Header user={data.getUser} />
        <div className="flex justify-end w-full max-w-[1000px] m-auto mt-8 px-2">
          <CreateButtons />
        </div>
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

      </div> : <Spin />}

    </div>
  );
};

export default Home;
