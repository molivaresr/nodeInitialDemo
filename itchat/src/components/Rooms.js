import React from "react";
import { useState, useEffect, useRef } from "react";

import EVENTS from "../config/events";
import '../styles/Rooms_style.css'

import {socket} from "../context/SocketContext";
import getRooms from "../services/getRooms";

export default function Room({jwt, user}) {
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [newRoom, setRoom] = useState(true);
  const newRoomRef = useRef(null);  
  
  useEffect(() => {
    getRooms(jwt)
      .then(response => {
      setRooms(response.rooms)
    })
  },[jwt])

  useEffect(() => {//Actualiza cuando se escucha el nuevo evento CREAR desde otros Clientes
    socket.on(EVENTS.SERVER.CREATED_ROOM, (rooms) => {
      setRooms(rooms)
      getRooms(jwt)
        .then(response => {
        setRooms(response.rooms)
      })
      return() => {
        socket.off();
      }
    });
  },[rooms, jwt]);
 
  const  createRoom = () =>{ 
    let room = newRoomRef.current.value || '';
    console.log(room)
    if(!String(room).trim()) return;
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, room);
    room = '';
    setRoom(room)
  }
  
  const joinRoom = () => {
    socket.emit(EVENTS.CLIENT.LEFT_ROOM, (roomId, user))
    window.localStorage.setItem('RoomNow', roomId);
  }
  
  return (
    <div className="rooms">     
      <form>
          <label><h2>Create a Room</h2></label>
          <input type='text' placeholder='Nombre de la sala' ref={newRoomRef} />
          <button onClick={createRoom}>+</button>
      </form>
      <form>
          <label><h2>Unirse a una sala</h2></label>
          <select size='5' onChange={(e) => setRoomId(e.target.value)}>
          <optgroup label="Elige tu sala">
          {rooms.map((e) => 
              <option key={e._id} value={e._id}>
              {e.roomName}
              </option>
            )}
          </optgroup>
          </select><br/>
          <button onClick={joinRoom}>Unete!</button>
      </form>
    </div>
  )};