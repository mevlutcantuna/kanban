import React, { useState } from 'react'
import DeleteIcon from '../assets/DeleteIcon'
import UpdateIconSM from '../assets/UpdateIconSM'
import ItemModal from './ItemModal'

type IProps = {
    task: any;
    hide: () => void;
    updateTheTask?: (content: string, tag: string, taskId: string) => void;
    deleteTheTask?: (taskId: string) => void;
}

const ButtonContent: React.FC<IProps> = ({ hide, deleteTheTask, task, updateTheTask }) => {
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

    const click = () => {
        deleteTheTask?.(task?.id)
        setIsModalVisible(false)
    }

    return (
        <div className='flex flex-col items-start'>
            <button onClick={click} className='w-full flex items-center justify-center py-1 px-3 mb-1 rounded bg-gray-400'>
                <DeleteIcon color='black' />
                <span className='ml-1'>Delete</span>
            </button>
            <button onClick={showModal} className='w-full flex items-center justify-center py-1 px-3 mb-1 rounded bg-gray-400'>
                <UpdateIconSM color='black' />
                <span className='ml-1'>Update</span>
            </button>
            <ItemModal title={"Update the task"}
                task={task}
                footer={null}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                updateTheTask={updateTheTask}
            />
        </div>
    )
}

export default ButtonContent