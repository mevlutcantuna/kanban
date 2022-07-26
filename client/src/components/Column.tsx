import { Draggable, Droppable } from "react-beautiful-dnd";
import ColumnItem from "./ColumnItem";

const Column = ({ column, tasks }: any) => {
    return (
        <div className="w-full bg-[#202020] mx-2 p-6 rounded-md">
            <h1 className="text-white text-xl">{column.name}</h1>
            <Droppable droppableId={column.id}>
                {(provided: any) => {
                    return (
                        <div
                            className="w-full h-full"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {tasks?.map((task: any, index: number) => (
                                <Draggable draggableId={task.id} key={task.id} index={index}>
                                    {(provided) => {
                                        return (
                                            <ColumnItem
                                                innerRef={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                key={task.id}
                                                task={task}
                                            />
                                        );
                                    }}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
        </div>
    );
};

export default Column;
