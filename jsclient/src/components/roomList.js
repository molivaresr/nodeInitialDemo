import React from "react";
import '../styles/App.css'
const ListRoom = (props) => {
    return <li><button>{props.value}</button></li>;
}

const RoomList = (props) => {
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
        <ul>{listing}</ul>
    )
}

export default RoomList;