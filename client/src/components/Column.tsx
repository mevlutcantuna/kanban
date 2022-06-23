/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { todos } from '../mock-data'
import ColumnItem from './ColumnItem'

const Column = (props: any) => {
    const [columnsTodos, setColumnsTodos] = useState<any>([])

    const getColumnTodos = () => {
        const filteredTodos = todos.filter((item: any) => item.column_id === props.item.id)
        setColumnsTodos(filteredTodos)
    }

    useEffect(() => {
        getColumnTodos()
    }, [])

    return (
        <div className='text-white w-72 bg-slate-400 p-2'>
            <h1 className='mb-2'>{props.item.name}</h1>
            {columnsTodos?.map((item: any) => <ColumnItem item={item} key={item.id} />)}
        </div>
    )
}

export default Column