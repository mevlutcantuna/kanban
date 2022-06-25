import React, { useState } from 'react'
import DeleteIcon from '../assets/DeleteIcon'
import UpdateIconSM from '../assets/UpdateIconSM'
import ItemModal from './ItemModal'

type IProps = {
    hide: () => void
}

const ButtonContent: React.FC<IProps> = ({ hide }) => {
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

    return (
        <div className='flex flex-col items-start'>
            <button className='w-full flex items-center justify-center py-1 px-3 mb-1 rounded bg-gray-400'>
                <DeleteIcon color='black' />
                <span className='ml-1'>Delete</span>
            </button>
            <button onClick={showModal} className='w-full flex items-center justify-center py-1 px-3 mb-1 rounded bg-gray-400'>
                <UpdateIconSM color='black' />
                <span className='ml-1'>Update</span>
            </button>
            <ItemModal title={"Update the task"}
                footer={null}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel} />
        </div>
    )
}

export default ButtonContent