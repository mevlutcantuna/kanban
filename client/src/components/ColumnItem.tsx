import React, { useState } from "react";

import UpdateIcon from "../assets/UpdateIcon";
import { Button, Popover } from "antd";
import ButtonContent from "./TaskButtonContent";

const ColumnItem = ({ task, innerRef, ...props }: any) => {
    const [visible, setVisible] = useState<boolean>(false);

    const hide = () => {
        setVisible(false);
    };

    const handleVisibleChange = (newVisible: boolean) => {
        setVisible(newVisible);
    };

    return (
        <div ref={innerRef} {...props} className="mb-3 bg-gray-300 p-2 rounded-sm">
            <div className="mb-2 text-base">{task.content}</div>
            <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 rounded-md bg-gray-700 text-white">
                    {task.tag}
                </span>
                <Popover
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                    content={<ButtonContent updateButton={() => console.log('')} id={"dsa"} deleteButton={() => console.log('')} hide={hide} />}
                    placement="bottom"
                    trigger="click"
                >
                    <Button type="text">
                        <UpdateIcon color="black" />
                    </Button>
                </Popover>
            </div>
        </div>
    );
};

export default ColumnItem;
