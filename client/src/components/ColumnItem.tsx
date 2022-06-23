const ColumnItem = (props: any) => {
    return (
        <div className="bg-red-50 p-1 text-black mb-2 cursor-pointer">
            {props.item.name}
        </div>
    )
}

export default ColumnItem