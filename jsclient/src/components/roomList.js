const ListRoom = (props) => {
    return <li>{props.value}</li>;
}

const RoomList = (props) => {
    const rooms = props.rooms;
    const listRooms = rooms.map((readRooms) => {
        return (
            <ListRoom key={readRooms.id} value={readRooms.name}/>
        )
    })
    return (
        <ul>{listRooms}</ul>
    )
}

export default RoomList;