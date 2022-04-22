import React, {useContext, useEffect, useState, useRef}from 'react';
import EVENTS from "../config/events";
import {socket} from "../context/SocketContext";
import getRooms from '../services/getRooms';
import '../styles/Feed_style.css'

const submit = (e) => {
    e.preventDefault();
  }

export default function Feed({user, roomId, jwt}) {
  // console.log('Render Feed');

    const [roomTitle, setRoomTitle] = useState('')
    const [message, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
    
    useEffect(() => { 
      socket.emit(EVENTS.CLIENT.JOIN_ROOM,  roomId, user)
    },[roomId, user])
    
  //   useEffect(() => {//Actualiza cuando se escucha el nuevo evento ROOM_MSG desde el server
  //     socket.on(EVENTS.SERVER.ROOM_MSG, (msgs) => {
  //       console.log(msgs)
  //       getRooms(jwt)
  //         .then(response => {
  //         setRooms(response.rooms)
  //       })
  //     });
  //     return () => {
  //     socket.off();
  //     };
  // },[rooms, jwt]);

    useEffect ( () => {
      console.log('Feed 22')
      getRooms(jwt)
      .then(response => {
        console.log(response)
        let rooms = response.rooms
        let roomNow = rooms.find(m => m._id === roomId)
        console.log(roomNow)
        let msg = roomNow.messages
        let roomName = roomNow.roomName
        console.log(msg.length)
        setRoomTitle(roomName)
        if(msg.length <= 1) {
          let noMsg = {user: 'iT Bot', message:'Aun no hay mensajes!'}
          setMensajes([noMsg])
        }
        else {
          if(msg.length <= 5 ) {
            let lastMsgs = msg.shift()
          // console.log(lastMsgs)
          setMensajes(lastMsgs)
          } else { 
            let lastMsgs = msg.slice(-5)
            // console.log(lastMsgs)
            setMensajes(lastMsgs) 
          }
      }
      })
    },[setMensajes,jwt,roomId])
  
    useEffect(() => {
      socket.on("mensajes", (message) => {
        setMensajes([...mensajes, message]);
      });
      return() => {
        socket.off();
      }
    }, [mensajes]);
  
    // const divRef = useRef(null);
    // useEffect(() => {
    //   divRef.current.scrollIntoView({ behavior: "smooth" });
    // });
  
    console.log(typeof mensajes)   
    console.log(mensajes)  
    const handleMsg = (e) => {
      e.preventDefault();
      socket.emit("mensaje", roomId, user, message);
      console.log(user, message)
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
              <input type='text' placeholder={`Hola soy ${user}`} value={message} onChange={(e) => setMensaje(e.target.value)}/>
              <button onClick={handleMsg}>Enviar</button>
            </form>
          </div>
      </div>
  )};