import React from "react";
import { useState, useEffect} from "react";

import EVENTS from "../config/events";
import '../styles/Rooms_style.css'

import {socket} from "../context/SocketContext";
import getRooms from "../services/getRooms";

export default function Room({jwt, user, id}) {
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [newRoom, setRoom] = useState('');
  
  useEffect(() => { 
        socket.on(EVENTS.SERVER.CREATED_ROOM, (rooms) => {
      setRooms(rooms)
    });
  })
  

  useEffect(() => {
    getRooms(jwt)
      .then(response => {
      setRooms(response.rooms)
    })
  },[jwt])

  const  createRoom = (e) =>{ 
    e.preventDefault();
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, newRoom);
    setRoom('');
  }
  
  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit(EVENTS.CLIENT.LEFT_ROOM, id, user)
    window.localStorage.setItem('RoomNow', roomId);
    window.location.reload();
  }
  
  return (
    <div className="rooms">     
      <h2>Salas</h2>
      <div className="rooms__create">
      <form >
 
          <input type='text' placeholder='Nombre de la sala' value={newRoom} onChange={(e) => setRoom(e.target.value)} />
          <button onClick={createRoom}>Crear nueva sala</button>
      </form>
      </div>
      <div className="rooms__join">
      <form >
          <h2>Unirse</h2>
          <select className="rooms__List" size='5' onChange={(e) => setRoomId(e.target.value)}>
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
    </div>
  )};