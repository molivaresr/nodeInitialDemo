import React, {useEffect, useState}from 'react';
import EVENTS from "../config/events";
import {socket} from "../context/SocketContext";
import getRooms from '../services/getRooms';

const submit = (e) => {
    e.preventDefault();
  }

export default function Feed({user, roomId}) {
    let nick = user;
    let idRoom = roomId;

    // let jwt = token;
    const jwt = window.sessionStorage.getItem('jwt');
    const [message, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);
    socket.emit(EVENTS.CLIENT.JOIN_ROOM,  idRoom, nick)
  
    useEffect ( () => {
      getRooms(jwt)
      .then(response => {
        console.log(response)
        let rooms = response.rooms
        let roomNow = rooms.find(m => m.roomId === idRoom)
        console.log(roomNow)
        let msg = roomNow.messages
        if(msg.length != 1) {
          let lastMsgs = msg.slice(-5)
        console.log(lastMsgs)
        setMensajes(lastMsgs)
        } else { 
          setMensajes([]) 
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
      <div>
        FEED
        <div>
          <ul>
            {mensajes.map((e,i) => 
              <li key={i}>
              <span>{e.user}</span>: <span>{e.message}</span>
              </li>
            )}
          </ul>
        </div>
        <div>
            <form onSubmit={submit}>
              <input type='text' placeholder={`Hola soy ${nick}`} value={message} onChange={(e) => setMensaje(e.target.value)}/>
              <button onClick={handleMsg}>Enviar</button>
            </form>
          </div>
      </div>
  )};