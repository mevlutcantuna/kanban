import React, { useState } from "react";

import UpdateIcon from "../assets/UpdateIcon";
import { Button, Popover } from "antd";
import TaskButtonContent from "./TaskButtonContent";
import { ITask } from "../types";

type IProps = {
    task: ITask;
    innerRef: any;
    updateTheTask: (content: string, tag: string, taskId: string) => void;
    deleteTheTask: (taskId: string) => void
}

const ColumnItem: React.FC<IProps> = ({ task, innerRef, updateTheTask, deleteTheTask, ...props }) => {
    const [visible, setVisible] = useState<boolean>(false);

    const hide = () => {
        setVisible(false);
    };

    const handleVisibleChange = (newVisible: boolean) => {
        setVisible(newVisible);
    };

    return (
        <div data-testid='task-item' ref={innerRef} {...props} className="mb-3 bg-gray-300 p-2 rounded-sm">
            <div className="mb-2 text-base">{task.content}</div>
            <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 rounded-md bg-gray-700 text-white">
                    {task.tag}
                </span>
                <Popover
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                    content={<TaskButtonContent updateTheTask={updateTheTask} deleteTheTask={deleteTheTask} task={task} hide={hide} />}
                    placement="bottom"
                    trigger="click"
                >
                    <Button data-testid='task-setting-icon' type="text">
                        <UpdateIcon color="black" />
                    </Button>
                </Popover>
            </div>
        </div>
    );
};

export default ColumnItem;
