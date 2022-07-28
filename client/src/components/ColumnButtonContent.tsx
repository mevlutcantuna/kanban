import React, { useState } from 'react'
import DeleteIcon from '../assets/DeleteIcon'
import UpdateIconSM from '../assets/UpdateIconSM'
import { IColumn } from '../types'
import ColumnModal from './ColumnModal'

type IProps = {
    hide: () => void;
    deleteButton: (id: string) => void;
    column: IColumn;
    updateButton: (id: string, name: string) => void;
}

const ColumnButtonContent: React.FC<IProps> = ({ hide, deleteButton, column, updateButton }) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const showModal = () => {
        hide()
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const clickDelete = () => {
        deleteButton(column.id as string)
        setIsModalVisible(false)
    }

    return (
        <div className='flex flex-col items-start'>
            <button onClick={clickDelete} className='w-full flex items-center justify-center py-1 px-3 mb-1 rounded bg-gray-400'>
                <DeleteIcon color='black' />
                <span className='ml-1'>Delete</span>
            </button>
            <button onClick={showModal} className='w-full flex items-center justify-center py-1 px-3 mb-1 rounded bg-gray-400'>
                <UpdateIconSM color='black' />
                <span className='ml-1'>Update</span>
            </button>
            <ColumnModal
                title={"Update the column"}
                column={column}
                updateCol={updateButton}
                footer={null}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default ColumnButtonContent