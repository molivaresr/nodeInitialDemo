import React, {useContext, useEffect, useState}from 'react';

import EVENTS from "../config/events";
import {socket} from "../context/SocketContext";
// import { UserContextProvider } from '../context/UserContext';

import getRooms from '../services/getRooms';
import '../styles/Feed_style.css'

const submit = (e) => {
    e.preventDefault();
  }

export default function Feed({user, roomId}) {
  console.log('Render Feed');


    let nick = user;
    let idRoom = roomId;
    const jwt = window.localStorage.getItem('jwt');
    
    const [roomTitle, setRoomTitle] = useState('')
    const [message, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
    socket.emit(EVENTS.CLIENT.JOIN_ROOM,  idRoom, nick)
  
    useEffect ( () => {
      console.log('Feed 22')
      getRooms(jwt)
      .then(response => {
        console.log(response)
        let rooms = response.rooms
        let roomNow = rooms.find(m => m.roomId === idRoom)
        console.log(roomNow)
        let msg = roomNow.messages
        let roomName = roomNow.roomName
        setRoomTitle(roomName)
        msg.shift()
        if(msg.length <= 5 ) {
          let lastMsgs = msg
        console.log(lastMsgs)
        setMensajes(lastMsgs)
        } else { 
          let lastMsgs = msg.slice(-5)
          setMensajes([lastMsgs]) 
        }
      })
    },[setMensajes,jwt,idRoom])
  
    useEffect(() => {
      socket.on("mensajes", (message) => {
        setMensajes([...mensajes, message]);
      });
    }, [mensajes]);
  
    useEffect(() => {
      socket.emit(EVENTS.connection, nick);
      socket.emit(EVENTS.CLIENT.CONNECTED, idRoom, nick)
    }, [nick,idRoom]);
    // const divRef = useRef(null);
    
    const handleMsg = (e) => {
      e.preventDefault();
      socket.emit("mensaje", idRoom, nick, message);
      console.log(nick, message)
      setMensaje("");
    }
  
    return(
      <div className='chat'>
        <div><h2>Sala: {roomTitle}</h2></div>
        <div className='chat__feed'>
          <ul>
            {mensajes.map((e,i) => 
              <li key={i} className='chat__message'>
              <span >{e.user}</span>: <span>{e.message}</span>
              </li>
            )}
          </ul>
        </div>
        <div>
            <form onSubmit={submit} className='chat__textBox'>
              <input type='text' placeholder={`Hola soy ${nick}`} value={message} onChange={(e) => setMensaje(e.target.value)}/>
              <button onClick={handleMsg}>Enviar</button>
            </form>
          </div>
      </div>
  )};