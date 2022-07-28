import Modal from "antd/lib/modal/Modal";
import React, { memo, useState } from "react";
import { useEffect } from "react";
import { errorMessage } from "../lib/utils";
import { IColumn, ITask } from "../types";

type IProps = {
    visible: boolean;
    footer: null;
    onOk: () => void;
    onCancel: () => void;
    title: string;
    createNewTask?: (content: string, columnId: string, tag: string) => void;
    updateTheTask?: (content: string, tag: string, taskId: string) => void;
    columns?: IColumn[]
    task?: ITask
};

const ItemModal: React.FC<IProps> = ({
    visible,
    footer,
    onOk,
    onCancel,
    title,
    columns,
    createNewTask,
    updateTheTask,
    task
}) => {
    const [content, setContent] = useState("");
    const [tag, setTag] = useState<string>("");
    const [column, setColumn] = useState<string>("")

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value)
    }

    const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTag(e.target.value)
    }

    const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setColumn(e.target.value)
    }


    const click = async () => {
        if (content === "" || tag === "") {
            return errorMessage('Please provide all inputs...')
        }

        if (title === 'Create a new task') {
            if (column === "") {
                return errorMessage('Please provide all inputs...')
            }
            const res = await createNewTask?.(content, tag, column)
            if (res) {
                setContent("")
                setTag("")
                setColumn("")
                return onCancel()
            }

        } else {
            const res = await updateTheTask?.(content, tag, task?.id as string)
            if (res) {
                return onCancel()
            }
        }

    }

    useEffect(() => {
        if (title === "Update the task") {
            setContent(task?.content as string)
            setTag(task?.tag as string)
        }
    }, [task?.content, task?.tag, title])

    return (
        <Modal
            bodyStyle={{ backgroundColor: "#cecece" }}
            width={400}
            visible={visible}
            footer={footer}
            onOk={onOk}
            onCancel={onCancel}
        >
            <div className="text-black text-2xl">{title}</div>
            <input
                value={content}
                onChange={handleContentChange}
                type="text"
                className="bg-transparent w-full border-solid border-[1px] border-black rounded p-2 mt-4 text-black placeholder:text-slate-600"
                placeholder="Enter Task"
            />
            <select value={tag} onChange={handleTagChange} className="bg-transparent w-full border-solid border-[1px] border-black rounded p-2 mt-4 text-black">
                <option hidden>Choose Tag</option>
                <option value='Low'>Low</option>
                <option value='Medium'>Medium</option>
                <option value='High'>High</option>
            </select>
            {title === 'Create a new task' &&
                <select value={column} onChange={handleColumnChange} className="bg-transparent w-full border-solid border-[1px] border-black rounded p-2 mt-4 text-black">
                    <option hidden>Choose Column</option>
                    {
                        columns?.map((col: any) => (
                            <option key={col.id} value={col.id}>{col.name}</option>
                        ))
                    }
                </select>
            }
            <div className="flex justify-end">
                <button onClick={click} className="bg-lightBlack px-4 py-2 rounded-sm text-gray-50 mt-4" >Submit</button>
            </div>
        </Modal>
    );
};

export default memo(ItemModal);
