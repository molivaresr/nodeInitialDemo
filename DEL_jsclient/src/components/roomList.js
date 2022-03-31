import React from "react";
// import EVENTS from "../config/events";
// import { useSockets } from "../context/socket.context";
import '../styles/App.css'

const ListRoom = (props) => {
    return <option>{props.value}</option>
}

// const ListRoom = (props) => {
//     return <li><button 
//     disabled={props.key === props.id} 
//     title={`Unirme a ${props.value}`}
//     onClick={() => (props.key)}
//     >{props.value}</button></li>
// }

const RoomList = (props) => {
    // const {roomId, socket} = useSockets;

    // // function handleJoinRoom(key) {
    // //     if (key === roomId) return;
    // //     socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
    // // }

    const rooms = props.rooms;
    const roomName = Object.values(rooms);
    const roomList = Object.values(roomName);

    console.log('5555',roomList);

    const listing = roomList.map((list) => {
        return (
            // <li key={list.id}><button 
            // disabled={list === list.id} 
            // title={`Unirme a ${list.value}`}
            // onClick={handleJoinRoom(list.id)}
            // >{list.name}</button></li>
            <ListRoom key={list.id} value={list.name}/>
        )
    })
    return (
        <>
        <select>{listing}</select>
        {/* <button onClick={handleJoinRoom(listing.key)}>Unirse</button> */}
        </>
    )
}

export default RoomList;