import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ColumnItem from "./ColumnItem";

const Column = ({ column, tasks }: any) => {
    return (
        <div className="w-full bg-red-50 mx-2 p-2">
            <Droppable droppableId={column.id}>
                {(provided: any) => {
                    return (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <h1 className="mb-4">{column.title}</h1>
                            {tasks.map((task: any, index: number) => (
                                <Draggable draggableId={task.id} key={task.id} index={index}>
                                    {(provided) => {
                                        return <ColumnItem innerRef={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={task.id} task={task} />;
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
