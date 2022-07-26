import { useMutation, useQuery } from "@apollo/client";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import Column from "../components/Column";
import CreateButtons from "../components/CreateButtons";
import Header from "../components/Header";
import { GET_USER } from "../graphql/auth";
import { GET_ALL_COLUMNS, UPDATE_COLUMN } from "../graphql/column";
import { GET_ALL_TASKS } from "../graphql/task";
import { createKanbanState, errorMessage, isAuthanticated, reorderColumn } from "../lib/utils";

//import { initialData } from "../mock-data";
//import { IColumn } from "../types";

const Home = () => {
  const [state, setState] = useState<any>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { error, data, loading } = useQuery(GET_USER, {
    variables: { token },
  });

  const allColQuery = useQuery(GET_ALL_COLUMNS, {
    variables: { userId: data?.getUser.id },
    skip: !data
  });

  const allTaskQuery = useQuery(GET_ALL_TASKS, {
    variables: { userId: data?.getUser.id },
    skip: !data
  })

  const [updateCol] = useMutation(UPDATE_COLUMN)

  const onEndDrag = async (result: any) => {
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

      console.log(newColumn)

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      console.log(newState)
      setState(newState);

      // update the DB
      await updateCol({
        variables: {
          column: {
            taskIds: newColumn.taskIds,
            id: newColumn.id
          }
        },
      })
      return;
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
    console.log(allTaskQuery.data?.getAllTasks)
    if (allTaskQuery.data?.getAllTasks && allColQuery.data?.getAllColumns) {
      const kanbanState = createKanbanState(allTaskQuery.data?.getAllTasks, allColQuery.data?.getAllColumns);
      setState(kanbanState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTaskQuery.data?.getAllTasks[0].id, allColQuery.data?.getAllColumns[0].id])


  useEffect(() => {
    // if user is not authanticated, redirects login page
    if (!isAuthanticated()) {
      return navigate("/login", { replace: true });
    }

    // get errors
    if (error) {
      localStorage.removeItem("token");
      return navigate("/login", { replace: true });
    }

    if (allColQuery.error) {
      return errorMessage(allColQuery.error.message)
    }

    if (allTaskQuery.error) {
      return errorMessage(allTaskQuery.error.message)
    }

    console.log('worked')

  }, [navigate, error, token, allColQuery.error, allTaskQuery.error]);

  return (
    <>
      {data && state.tasks && state.columns &&
        <Spin spinning={allColQuery.loading || allTaskQuery.loading || loading}>
          <div className="w-screen h-screen bg-lightBlack">
            <div>
              <Header user={data.getUser} />
              <div className="flex justify-end w-full max-w-[1000px] m-auto mt-8 px-2">
                <CreateButtons />
              </div>
              <DragDropContext onDragEnd={onEndDrag}>
                <div className="flex justify-between w-full max-w-[1000px] m-auto mt-4">
                  {Object.entries(state.columns).map(([columnId, column]: any) => {
                    const tasks = column.taskIds.map(
                      (taskId: string) => state.tasks[taskId]
                    );
                    return <Column key={columnId} column={column} tasks={tasks} />;
                  })}
                </div>
              </DragDropContext>
            </div>
          </div>
        </Spin>}
    </>

  );
};

export default Home;
