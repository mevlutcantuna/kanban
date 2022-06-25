import React from "react";

type IProps = {
    color: string;
};

const DeleteIcon: React.FC<IProps> = ({ color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
            <path fill={color} d="M6.438 16.542q-.563 0-.959-.396t-.396-.979v-10h-.791v-.855h3.27v-.666h4.876v.666h3.291v.855h-.812v10q0 .583-.396.979t-.979.396Zm7.624-11.375H5.938v10q0 .208.156.364.156.157.344.157h7.104q.187 0 .354-.157.166-.156.166-.364Zm-5.874 8.791h.854V6.896h-.854Zm2.75 0h.854V6.896h-.854Zm-5-8.791v10.521-.521Z" />
        </svg>
    );
};

export default DeleteIcon;
