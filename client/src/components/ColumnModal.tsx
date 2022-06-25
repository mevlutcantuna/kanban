import Modal from "antd/lib/modal/Modal";
import React from "react";

type IProps = {
    visible: boolean;
    footer: null;
    onOk: () => void;
    onCancel: () => void;
    title: string;
};

const ColumnModal: React.FC<IProps> = ({
    visible,
    footer,
    onOk,
    onCancel,
    title,
}) => {
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
                className="bg-transparent w-full border-solid border-[1px] border-black rounded p-2 my-4 text-black placeholder:text-slate-600"
                placeholder="Enter Column Name"
            />
            <div className="flex justify-end">
                <button className="bg-lightBlack px-4 py-2 rounded-sm text-gray-50" >Submit</button>
            </div>
        </Modal>
    );
};

export default ColumnModal;
