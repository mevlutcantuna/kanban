import { useState } from "react";
import ColumnModal from "./ColumnModal";
import ItemModal from "./ItemModal";


type IProps = {
    createNewCol: (name: string) => void;
    createNewTask: (content: string, columnId: string, tag: string) => void;
    columns: any
}

const CreateButtons: React.FC<IProps> = ({ createNewCol, createNewTask, columns }) => {
    const [isTaskModalVisible, setIsTaskModalVisible] = useState<boolean>(false);
    const [isColumnModalVisible, setIsColumnModalVisible] =
        useState<boolean>(false);

    const showTaskModal = () => {
        setIsTaskModalVisible(true);
    };

    const handleTaskOk = () => {
        setIsTaskModalVisible(false);
    };

    const handleTaskCancel = () => {
        setIsTaskModalVisible(false);
    };

    const showColumnModal = () => {
        setIsColumnModalVisible(true);
    };

    const handleColumnOk = () => {
        setIsColumnModalVisible(false);
    };

    const handleColumnCancel = () => {
        setIsColumnModalVisible(false);
    };

    return (
        <div>
            <button
                onClick={showColumnModal}
                className="bg-[#9BA3AF] rounded p-2 mb-4 hover:bg-[#65686b] mr-4"
            >
                Create Column
            </button>
            <button
                onClick={showTaskModal}
                className="bg-[#9BA3AF] rounded p-2 mb-4 hover:bg-[#65686b]"
            >
                Create Task
            </button>
            <ItemModal
                columns={columns}
                title={"Create a new task"}
                footer={null}
                visible={isTaskModalVisible}
                onOk={handleTaskOk}
                onCancel={handleTaskCancel}
                createNewTask={createNewTask}
            />
            <ColumnModal
                createNewCol={createNewCol}
                title={"Create a new column"}
                footer={null}
                visible={isColumnModalVisible}
                onOk={handleColumnOk}
                onCancel={handleColumnCancel}
            />
        </div>
    );
};

export default CreateButtons;
