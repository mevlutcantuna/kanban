import { useMutation, useQuery } from "@apollo/client";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import Column from "../components/Column";
import CreateButtons from "../components/CreateButtons";
import Header from "../components/Header";
import { GET_USER } from "../graphql/auth";
import { CREATE_COLUMN, DELETE_COLUMN, GET_ALL_COLUMNS, UPDATE_COLUMN } from "../graphql/column";
import { CREATE_TASK, DELETE_TASK, GET_ALL_TASKS, UPDATE_TASK } from "../graphql/task";
import { createKanbanState, errorMessage, isAuthanticated, reorderColumn } from "../lib/utils";

//import { initialData } from "../mock-data";
//import { IColumn } from "../types";

const Home = () => {
  const [state, setState] = useState<any>({ tasks: {}, columns: {} });
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
  const [createCol] = useMutation(CREATE_COLUMN)
  const [deleteCol] = useMutation(DELETE_COLUMN)

  const [updateTask] = useMutation(UPDATE_TASK)
  const [deleteTask] = useMutation(DELETE_TASK)
  const [createTask] = useMutation(CREATE_TASK)

  // create new column
  const createNewCol = async (name: string) => {
    if (name === '') {
      return errorMessage('Please provide the text...')
    }
    const res = await createCol({
      variables: {
        column: {
          name: name,
          userId: data.getUser.id
        }
      },
      onError: (err: any) => {
        return errorMessage(err.message)
      }
    })

    if (res.data) {
      let newCol: any = {}
      newCol[res.data.createColumn.id] = res.data.createColumn

      const newState = {
        tasks: { ...state.tasks },
        columns: {
          ...state.columns,
          ...newCol
        }
      }
      setState(newState)
    }
    return;
  }

  // delete column and dependenet tasks to the column
  const deleteTheCol = async (id: string) => {
    // delete the column
    const colRes = await deleteCol({
      variables: {
        deleteColumnId: id
      },
      onError: (err: any) => {
        return errorMessage(err.message)
      }
    });

    const newColumns = Object.fromEntries(
      Object.entries(state.columns).filter((column: any) => column[0] !== colRes.data.deleteColumn.id)
    )

    const removedColumnState = {
      tasks: { ...state.tasks },
      columns: { ...newColumns }
    }

    setState(removedColumnState)

    // delete dependent tasks to the column
    for (let i = 0; i < colRes.data.deleteColumn.taskIds.lenght; i++) {
      const taskRes = await deleteTask({
        variables: {
          deleteTaskId: colRes.data.deleteColumn.taskIds[i].id
        },
        onError: (err: any) => {
          return errorMessage(err.message)
        }
      })

      const newTasks = Object.fromEntries(
        Object.entries(state.tasks).filter((task: any) => task.id !== taskRes.data.deleteTask.id)
      )

      const removedTasksState = {
        tasks: { ...newTasks },
        columns: { ...state.columns }
      }
      setState(removedTasksState)
    }
  }

  // update column name
  const updateColumnName = async (id: string, newName: string) => {
    if (newName === '') {
      return errorMessage('Please provide the name...')
    }

    await updateCol({
      variables: {
        column: {
          id,
          name: newName
        }
      },
      onError: (err: any) => {
        return errorMessage(err.message)
      }
    })

    // change the col and implement to state
    const newColumns = Object.fromEntries(
      Object.entries(state.columns).map((col: any) => {
        if (col[0] === id) {
          const changedCol = { ...col[1], name: newName }
          const newCols = { 0: col[0], 1: changedCol }
          return { ...newCols }
        } else {
          return col;
        }
      })
    )

    const newState = {
      tasks: { ...state.tasks },
      columns: newColumns
    }

    setState(newState)
  }

  // create new task
  const createNewTask = async (content: string, tag: string, columnId: string,) => {
    console.log('create new task', content, columnId, tag)
    /*
    // create task in db
    const newTaskRes = await createTask({
      variables: {
        task: {
          content,
          columnId,
          tag,
          userId: data.getUser.id
        }
      }
    })
    */
    // 
    return 2
  }

  // update the task and dependent column
  const updateTheTask = async (content: string, tag: string, taskId: string) => {
    console.log('update the task', content, tag, taskId)
    console.log("state", state)
    const res = await updateTask({
      variables: {
        task: {
          id: taskId,
          tag,
          content
        }
      },
      onError: ((err: any) => {
        return errorMessage(err.message)
      })
    })

    const newTasks = Object.fromEntries(
      Object.entries(state.tasks).map((task: any) => {
        if (task[0] === res.data?.updateTask?.id) {
          const changedTask = { ...res.data.updateTask }
          const changedTasks = { 0: task[0], 1: { ...changedTask } }
          return { ...changedTasks }
        } else {
          return task;
        }
      })
    )

    const newState = {
      tasks: { ...newTasks },
      columns: { ...state.columns }
    }
    console.log(newState)
    setState(newState)
  }

  // delete the task and update taskIds of dependent column
  const deleteTheTask = async (taskId: string) => {
    console.log(state.tasks.length)
    // delete task from DB
    const deletedTaskRes = await deleteTask({
      variables: {
        deleteTaskId: taskId
      },
      onError: (err) => {
        return errorMessage(err.message)
      }
    })

    // create new taks ids for dependent column
    const deletedTask = deletedTaskRes.data.deleteTask
    const newTaskIds = state.columns[deletedTask.columnId]["taskIds"].filter((id: string) => id !== deletedTask.id)

    // update the dependent column
    await updateCol({
      variables: {
        column: {
          id: deletedTaskRes.data.deleteTask.columnId,
          taskIds: newTaskIds
        }
      },
      onError: (err) => {
        return errorMessage(err.message)
      }
    })

    // remove the task
    const newTasks = Object.fromEntries(
      Object.entries(state.tasks).filter((task: any) => task[0] !== deletedTask.id)
    )

    // update the dependent column
    const newColumns = Object.fromEntries(Object.entries(state.columns).map((col: any) => {
      if (col[0] === deletedTask.columnId) {
        return { 0: col[0], 1: { ...col[1], taskIds: newTaskIds } }
      } else {
        return col
      }
    }))

    // update the state
    const newState = {
      tasks: { ...newTasks },
      columns: { ...newColumns }
    }

    setState(newState)
  }

  // drag and drop works and updates in database
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

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

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

    // startTaskIds means that remains from removed columns
    const startTaskIds = Array.from(sourceCol.taskIds);
    // removed means that id of dragged task 
    const [removed] = startTaskIds.splice(source.index, 1);
    // newStartCol means new values of dragged column 
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    // endTaskIds means task ids of dropped column
    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    // create new state
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
    // update task columnId
    await updateTask({
      variables: {
        task: {
          id: removed,
          columnId: newEndCol.id
        }
      }
    })

    // update colums new taskIds
    await updateCol({
      variables: {
        column: {
          id: newStartCol.id,
          taskIds: newStartCol.taskIds
        }
      }
    })

    await updateCol({
      variables: {
        column: {
          id: newEndCol.id,
          taskIds: newEndCol.taskIds
        }
      }
    })
    return;
  };

  // when component is initiliazed, get tasks and columnsof the user
  useEffect(() => {
    if (allTaskQuery.data?.getAllTasks && allColQuery.data?.getAllColumns) {
      const kanbanState = createKanbanState(allTaskQuery.data?.getAllTasks, allColQuery.data?.getAllColumns);
      setState(kanbanState)
      //console.log('worked')
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
  }, [navigate, error, token, allColQuery.error, allTaskQuery.error]);


  return (
    <>
      <Spin spinning={allColQuery.loading || allTaskQuery.loading || loading}>
        {data &&
          <div className="w-screen h-screen bg-lightBlack">
            <div>
              <Header user={data.getUser} />
              <div className="flex justify-end w-full max-w-[1000px] m-auto mt-8 px-2">
                <CreateButtons columns={allColQuery.data?.getAllColumns} createNewTask={createNewTask} createNewCol={createNewCol} />
              </div>
              <DragDropContext onDragEnd={onEndDrag}>
                <div className="flex justify-between w-full max-w-[1000px] m-auto mt-4 overflow-auto">
                  {Object.entries(state.columns)?.map(([columnId, column]: any) => {
                    const tasks = column.taskIds.map(
                      (taskId: string) => state.tasks[taskId]
                    );
                    return <Column deleteTheTask={deleteTheTask} updateTheTask={updateTheTask} updateColumnName={updateColumnName} deleteTheCol={deleteTheCol} key={columnId} column={column} tasks={tasks} />;
                  })}
                </div>
              </DragDropContext>
            </div>
          </div>
        }
      </Spin>
    </>

  );
};

export default Home;
