import Modal from "antd/lib/modal/Modal";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { IColumn } from "../types";

type IProps = {
    column?: IColumn;
    visible: boolean;
    footer: null;
    onOk: () => void;
    onCancel: () => void;
    title: string;
    updateCol?: (id: string, name: string) => void
    createNewCol?: (name: string) => void
};

const ColumnModal: React.FC<IProps> = ({
    visible,
    footer,
    onOk,
    onCancel,
    title,
    updateCol,
    column,
    createNewCol
}) => {
    const [name, setName] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const click = async () => {
        setLoading(true)
        if (title === 'Create a new column') {
            const res = await createNewCol?.(name)
            if (res) {
                setLoading(false)
                onCancel()
                return setName("")
            } else {
                return setLoading(false)
            }
        } else {
            const res = await updateCol?.(column ? column.id as string : '', name)
            if (res) {
                setLoading(false)
                return onCancel()
            } else {
                return setLoading(false)
            }
        }
    }


    useEffect(() => {
        // when component is initiliazed, set initail name of the columns 
        if (column?.name) {
            setName(column.name)
        }
    }, [column])

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
                onChange={handleNameChange}
                value={name}
                type='text'
                className="bg-transparent w-full border-solid border-[1px] border-black rounded p-2 my-4 text-black placeholder:text-slate-600"
                placeholder="Enter Column Name"
            />
            <div className="flex justify-end">
                <button onClick={click} disabled={loading} className="flex items-center bg-lightBlack px-4 py-2 rounded-sm text-gray-50 disabled:bg-slate-500 disabled:text-gray-800" >
                    Submit
                    {loading && <div className="ml-4 flex items-center justify-center"><Spin size="small" /></div>}
                </button>
            </div>
        </Modal>
    );
};

export default ColumnModal;
