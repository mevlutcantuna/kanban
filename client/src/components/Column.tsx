import { Button, Popover } from "antd";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import UpdateIcon from "../assets/UpdateIcon";
import ColumnButtonContent from "./ColumnButtonContent";
import ColumnItem from "./ColumnItem";

type IProps = {
    column: any,
    tasks: any,
    deleteTheCol: (id: string) => void
    updateColumnName: (id: string, name: string) => void
    updateTheTask: (content: string, tag: string, taskId: string) => void;
    deleteTheTask: (taskId: string) => void
}

const Column: React.FC<IProps> = ({ column, tasks, deleteTheCol, updateColumnName, updateTheTask, deleteTheTask }) => {
    const [visible, setVisible] = useState<boolean>(false);

    const hide = () => {
        setVisible(false);
    };

    const handleVisibleChange = (newVisible: boolean) => {
        setVisible(newVisible);
    };

    return (
        <div className="w-full min-w-[300px] bg-[#202020] mx-2 p-6 rounded-md">
            {column && tasks && <>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-white text-xl mb-0">{column.name}</h1>
                    <Popover
                        visible={visible}
                        onVisibleChange={handleVisibleChange}
                        content={<ColumnButtonContent column={column} updateButton={updateColumnName} deleteButton={deleteTheCol} hide={hide} />}
                        placement="bottom"
                        trigger="click"
                    >
                        <Button type="text">
                            <UpdateIcon color="#fff" />
                        </Button>
                    </Popover>

                </div>
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
                                                    updateTheTask={updateTheTask}
                                                    deleteTheTask={deleteTheTask}
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
            </>
            }
        </div>
    );
};

export default Column;
