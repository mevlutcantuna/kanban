import React from "react";

type IProps = {
    color: string;
};

const UpdateIcon: React.FC<IProps> = ({ color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
            <path fill={color} d="m8.458 17.375-.291-2.333q-.188-.084-.677-.344-.49-.26-.948-.573l-2.146.896-1.542-2.709 1.834-1.395q-.021-.188-.042-.427-.021-.24-.021-.469 0-.188.021-.438t.042-.541L2.854 7.667 4.396 5l2.146.896q.333-.25.77-.511.438-.26.855-.427l.291-2.333h3.084l.291 2.333q.417.188.802.417.386.229.761.521L15.604 5l1.542 2.667-1.896 1.458.042.448q.02.219.02.427 0 .188-.02.406-.021.219-.042.511l1.875 1.395-1.542 2.709-2.187-.938q-.354.292-.74.521-.385.229-.823.417l-.291 2.354Zm1.459-5.292q.854 0 1.468-.604Q12 10.875 12 10q0-.875-.615-1.479-.614-.604-1.468-.604-.855 0-1.469.604-.615.604-.615 1.479 0 .875.615 1.479.614.604 1.469.604Zm0-.854q-.5 0-.865-.364-.364-.365-.364-.865t.364-.865q.365-.364.865-.364.479 0 .854.364.375.365.375.865t-.375.865q-.375.364-.854.364Zm.104-1.25Zm-.854 6.542h1.645l.271-2.229q.584-.167 1.073-.459.49-.291 1.011-.791l2.041.896.834-1.355-1.813-1.375q.104-.354.136-.635.031-.281.031-.573 0-.271-.031-.521-.032-.25-.115-.625l1.854-1.437-.833-1.375-2.104.916q-.375-.396-.99-.76-.615-.365-1.094-.49l-.25-2.25H9.146l-.229 2.25q-.605.146-1.105.417t-1.02.813L4.75 6.042l-.833 1.375 1.75 1.354q-.084.312-.125.635Q5.5 9.729 5.5 10q0 .271.042.562.041.292.104.646l-1.729 1.375.833 1.355 2.021-.855q.5.479 1.01.771.511.292 1.115.438Z" />
        </svg>
    );
};

export default UpdateIcon;