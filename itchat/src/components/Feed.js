import React, {useContext, useEffect, useState, useRef}from 'react';
import EVENTS from "../config/events";
import {socket} from "../context/SocketContext";
import Users from './Users';
import getRooms from '../services/getRooms';
import Feed_style from '../styles/Feed_style.css'

const submit = (e) => {
    e.preventDefault();
  }

export default function Feed({user, roomId, jwt}) {

  const [roomTitle, setRoomTitle] = useState('')
  const [message, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(() => {
    socket.emit(EVENTS.CLIENT.JOIN_ROOM,  roomId, user)
  },[roomId, user])
    

    useEffect ( () => {
      getRooms(jwt)
      .then(response => {
        let rooms = response.rooms
        
        let roomNow = rooms.find(m => m._id === roomId)
        // console.log(roomNow)
        let msg = roomNow.messages
        let roomName = roomNow.roomName
        setRoomTitle(roomName)
        msg.shift()
        if(msg.length === 0) {
          let noMsg = {user: 'iT Bot', message:'Aun no hay mensajes!'}
          setMensajes([noMsg])
        }
        else {
          if(msg.length <= 5 ) {
          setMensajes(msg)
          } else { 
            let lastMsgs = msg.slice(-5)
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
    
    useEffect(() => {
      scrollToBottom()
    }, [mensajes]);

    const handleMsg = (e) => {
      e.preventDefault();
      socket.emit("mensaje", roomId, user, message);
      setMensaje("");
    }
  
    return (
      <>
      <div className='chat'>
        <div><h2>Sala: {roomTitle}</h2></div>
        <div className='chat__feed'>
          <ul>
            {mensajes.map((e,i) => 
              <li key={i} className='chat__message'>
              <span >{e.user}</span>: <span>{e.message}</span>
              </li>
            )}
            <div ref={messagesEndRef} />
          </ul>
        </div>
        <div>
            <form onSubmit={submit} className='chat__textBox'>
              <input type='text' placeholder={`Hola soy ${user}`} value={message} onChange={(e) => setMensaje(e.target.value)}/>
              <button onClick={handleMsg}>Enviar</button>
            </form>
          </div>
      </div>

      </>
  )};