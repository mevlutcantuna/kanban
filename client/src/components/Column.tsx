/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo } from "react";
import ColumnItem from "./ColumnItem";

import { tasks } from "../mock-data";


const Column = ({ item, allColumns, innerRef }: any) => {
    const [columnTasks, setColumnTasks] = useState<any>([]);

    const getColumnTodos = () => {
        const filteredTasks = tasks?.filter(
            (i: any) => item.tasks.includes(i._id)
        );
        setColumnTasks(filteredTasks);
    }

    useEffect(() => {
        getColumnTodos();
    }, []);

    return (
        <div ref={innerRef} className="text-white w-72 bg-slate-400 p-2">
            <h1 className="mb-2">{item.name}</h1>
            {columnTasks.map((item: any, index: any) => (
                <ColumnItem
                    item={item}
                    key={item._id}
                    index={index}
                />
            ))}
        </div>
    );
};

export default memo(Column);
