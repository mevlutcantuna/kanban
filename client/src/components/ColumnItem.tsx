import { Draggable } from "react-beautiful-dnd";

const ColumnItem = (props: any) => {
    return (
        <div >
            <Draggable draggableId={props.item.id} index={props.index}>
                {(provided) => (
                    <div
                        className="bg-red-50 p-1 text-black mb-2 cursor-pointer"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {props.item.name}
                    </div>
                )}
            </Draggable>
        </div>
    );
};

export default ColumnItem;
