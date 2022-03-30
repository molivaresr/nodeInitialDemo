import React from "react";

const ListRoom = (props) => {
    return <option>{props.value}</option>
}

const getRooms = (props) => {
    const rooms = props.rooms;
    const roomName = Object.values(rooms);
    const roomList = Object.values(roomName);

    console.log('5555',roomList);

    const listing = roomList.map((list) => {
        return (
            <ListRoom key={list.id} value={list.name} />
        )
    })
    return (
        <select>{listing}</select>
    )
}

export default getRooms;