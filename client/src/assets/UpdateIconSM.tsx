import React from "react";

type IProps = {
    color: string;
};

const UpdateIconSM: React.FC<IProps> = ({ color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
            <path fill={color} d="M6 16.25 2.75 13 6 9.75l.292.312-2.73 2.73h12.896v.416H3.562l2.73 2.73Zm8-6-.292-.312 2.73-2.73H3.542v-.416h12.896l-2.73-2.73L14 3.75 17.25 7Z" />
        </svg>
    );
};

export default UpdateIconSM;
