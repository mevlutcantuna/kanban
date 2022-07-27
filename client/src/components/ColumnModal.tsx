import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";

type IProps = {
    column?: {
        name: string,
        id: string
    };
    visible: boolean;
    footer: null;
    onOk: () => void;
    onCancel: () => void;
    title: string;
    submit: (id: string, name: string) => void
    createNewCol: (name: string) => void
};

const ColumnModal: React.FC<IProps> = ({
    visible,
    footer,
    onOk,
    onCancel,
    title,
    submit,
    column,
    createNewCol
}) => {
    const [name, setName] = useState<string>(column ? column.name : '')


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const click = () => {
        if (title === 'Create a new column') {
            createNewCol(name)
            onCancel()
            return setName("")
        }
        submit(column ? column.id : '', name)
        onCancel()
        setName("")
    }

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
                <button onClick={click} className="bg-lightBlack px-4 py-2 rounded-sm text-gray-50" >Submit</button>
            </div>
        </Modal>
    );
};

export default ColumnModal;
