import React from "react";
import { useEffect, useState, useRef } from "react";
import { socket } from "../context/SocketContext";
import EVENTS from "../config/events";

import SplitPane from "./Split";

import getRooms from '../services/getRooms';
import Feed from "./Feed";
import Rooms from "./Rooms";
import Users from "./Users";

const Chat = () => {
    const [rooms, setRooms] = useState([]);
    const [newRoom, setRoom] = useState(true);
    const [roomId, setRoomId] = useState('');   
    const [roomTitle, setRoomTitle] = useState('')

    const [message, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const [userList, setList] = useState([])
    const newRoomRef = useRef(null);
    const messagesEndRef = useRef(null);

    const userdata = {
        nickname:window.localStorage.getItem('nickname'),
        token: window.localStorage.getItem('jwt'),
        roomId: window.localStorage.getItem('RoomNow')
    }
    
    const submit = (e) => {
        e.preventDefault();
    }
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    
    useEffect(() => {
        socket.emit(EVENTS.CLIENT.JOIN_ROOM,  userdata.roomId, userdata.nickname) 
    },[userdata.nickname, userdata.roomId])
    
    useEffect ( () => {
        getRooms(userdata.token)
        .then(response => {
          let rooms = response.rooms
          let roomNow = rooms.find(m => m._id === userdata.roomId)
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
      },[setMensajes, userdata.token, userdata.roomId])
    
    

    useEffect(() => {
        socket.on("mensajes", (message) => {

            setMensajes([...mensajes, message]);
        });
        return() => {
          socket.off();
        }
    }, [mensajes, userList]);

    useEffect(() => {
        scrollToBottom()
    }, [mensajes]);

    const handleMsg = (e) => {
        e.preventDefault();
        socket.emit("mensaje", userdata.roomId, userdata.nickname, message);
        setMensaje("");
    }
    

    
    return (
        <>
        <SplitPane 
        left={<Rooms jwt={userdata.token} user={userdata.nickname} id={userdata.roomId}/>}
        middle={
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
                {userdata.roomId &&  
                <form onSubmit={submit} className='chat__textBox'>
                <input type='text' placeholder={`Hola soy ${userdata.nickname}`} value={message} onChange={(e) => setMensaje(e.target.value)}/>
                <button onClick={handleMsg}>Enviar</button>
                </form>} 
                {!userdata.roomId && <p>Unete a una sala para poder hablar!</p>}              
            </div>
        </div>  }
        right ={
        <div className='users'>
        <h2>Usuarios</h2>
        <ul>
            {/* {userList.map((e,i) => 
            <li key={i}>{e}
            </li>
            )} */}
        </ul>
        </div> }
        />
        </>
    )
}

export default Chat;