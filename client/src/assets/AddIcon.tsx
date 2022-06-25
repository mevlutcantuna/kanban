import React from "react";

type IProps = {
    color: string;
};

const AddIcon: React.FC<IProps> = ({ color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40">
            <path
                fill={color}
                d="M19.333 30.75V20.667H9.25v-1.334h10.083V9.25h1.375v10.083H30.75v1.334H20.708V30.75Z"
            />
        </svg>
    );
};

export default AddIcon;
