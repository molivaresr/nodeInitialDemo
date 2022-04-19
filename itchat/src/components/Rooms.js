import React from "react";
import { useState, useEffect, useRef } from "react";

import EVENTS from "../config/events";
import Rooms_style from '../styles/Rooms_style.css'

import {socket} from "../context/SocketContext";
import getRooms from "../services/getRooms";

export default function Room({usersession}) {
    // const jwt = token;
    const user = usersession;
    const [rooms, setRooms] = useState([]);
    const [roomId, setRoomId] = useState('');
    const newRoomRef = useRef(null);

    const jwt = window.localStorage.getItem('jwt');
    // const user = window.localStorage.getItem('nickname')
    // console.log(jwt)
    useEffect(() => {
      getRooms(jwt)
      .then(response => {
        // console.log(response)
        setRooms(response.rooms)
      })
    },)
  
    const  createRoom = (e) =>{ 
      e.preventDefault();
      let room = newRoomRef.current.value || '';
      console.log(room)
      if(!String(room).trim()) return;
      socket.emit(EVENTS.CLIENT.CREATE_ROOM, room);

      room = '';
    }
  
    const joinRoom = () => {
      
      socket.emit(EVENTS.CLIENT.JOIN_ROOM,  roomId, user);
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
          <label><h2>Join a room</h2></label>
          <select onChange={(e) => setRoomId(e.target.value)}>
          {rooms.map((e,i) => 
              <option key={i} value={e.roomId}>
              {e.roomName}
              </option>
            )}
          </select>
          <button onClick={joinRoom}>Join a room</button>
      </form>
    </div>
  )};