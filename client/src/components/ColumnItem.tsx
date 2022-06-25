import React from 'react'

const ColumnItem = ({ task, innerRef, ...props }: any) => {
    return (
        <div ref={innerRef} {...props} className="mb-2 bg-gray-300 p-2" >
            {task.content}
        </div>
    )
}

export default ColumnItem