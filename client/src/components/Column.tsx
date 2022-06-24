/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ColumnItem from "./ColumnItem";


const Column = (props: any) => {
    const [columnsTodos, setColumnsTodos] = useState<any>([]);

    console.log()

    const getColumnTodos = (id: any) => {
        const filteredTodos = props.allTodos.filter(
            (item: any) => props.item.todos.includes(item.id)
        );
        setColumnsTodos(filteredTodos);
    };

    useEffect(() => {
        getColumnTodos(props.item.id);
    }, []);

    return (
        <div ref={props.innerRef} className="text-white w-72 bg-slate-400 p-2">
            <h1 className="mb-2">{props.item.name}</h1>
            {columnsTodos.map((item: any, index: any) => (
                <ColumnItem
                    item={item}
                    key={item.id}
                    index={index}
                />
            ))}
        </div>
    );
};

export default Column;
