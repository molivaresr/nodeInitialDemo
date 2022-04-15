import React, { useState, useRef, useEffect } from "react";
import EVENTS from "./config/events";

import Login from "./components/Login.js";

import { UserContextProvider } from "./context/UserContext";
import {SocketProvider, socket} from "./context/SocketContext";
import useLogin from './hooks/useLogin'
import getUsers from "./services/getUsers";
import getRooms from "./services/getRooms";


const submit = (e) => {
  e.preventDefault();
}

function Room() {
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState('');
  const newRoomRef = useRef(null);
  const joinRoomRef = useRef(null);
  const jwt = window.sessionStorage.getItem('jwt');
  const user = window.sessionStorage.getItem('nickname')
  

  useEffect(() => {
    getRooms(jwt)
    .then(response => {
      // console.log(response)
      setRooms(response.rooms)
      
    })
  },[setRooms])

  const  createRoom = () =>{ 
    // e.preventDefault();
    let room = newRoomRef.current.value || '';
    console.log(room)
    if(!String(room).trim()) return;
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, room);
    room = '';
  }

  const joinRoom = () => {
    socket.emit(EVENTS.CLIENT.JOIN_ROOM,  roomId, user);
    window.sessionStorage.setItem('RoomNow', roomId);
  }
return (
  <>     
    <form>
        <label className='chat__title'>Create a Room</label>
        <input type='text' placeholder='Nombre de la sala' ref={newRoomRef} />
        <button onClick={createRoom}>+</button>
    </form>
    <form>
        {/* <label className='chat__title'>Join a room</label> */}
        <select onChange={(e) => setRoomId(e.target.value)}>
        {rooms.map((e,i) => 
            <option key={i} value={e.roomId}>
            {e.roomName}
            </option>
          )}
        </select>
        <button onClick={joinRoom}>Join a room</button>
    </form>
  </>
)};

function Feed({user, id}) {
  let nick = user;
  let idRoom = id;
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
      console.log(msg)
      let lastMsgs = msg.slice(-5)
      console.log(lastMsgs)
      setMensajes(lastMsgs)
    })
  },[setMensajes])

  useEffect(() => {
    socket.on("mensajes", (message) => {
      setMensajes([...mensajes, message]);
    });
  }, [mensajes]);

  useEffect(() => {
    socket.emit(EVENTS.connection, nick);
    socket.emit(EVENTS.CLIENT.CONNECTED, idRoom, nick)
  }, [user]);
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
            <input type='text' placeholder={`Hola soy ${user}`} value={message} onChange={(e) => setMensaje(e.target.value)}/>
            <button onClick={handleMsg}>Enviar</button>
          </form>
        </div>
    </div>
)};

function Users() {
  const jwt = window.sessionStorage.getItem('jwt');
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    getUsers(jwt)
    .then(response => {
      console.log(response)
      setUsers(response.users)
    })
  },[setUsers])

  return (
    <div>
        <p>USUARIOS</p>
        <ul>
          {users.map((e,i) => 
            <li key={i}>
            <span>{e.nickname}</span>
            </li>
          )}
        </ul>
      </div>      
)};

// function App() {
//   const [username, setUsername] = useState('');
//   const [login, setLogin] = useState('');

//   const usernameRef = useRef(null);
  
//   const handleUsername = (e) => {
//     e.preventDefault();
//     const value = usernameRef.current.value;
//     if(!value) {
//       return;
//     }
//     setUsername(value);
//     setLogin(true);
//     sessionStorage.setItem('usuario',username);
//   }

//   const usersession = sessionStorage.getItem('usuario')

//   if(!usersession) {
//     return (
//       <div>
//          <form onSubmit={submit}>
//            <input ref={usernameRef} />
//            <button onClick={handleUsername}>Login</button>
//          </form>
//       </div>
//     )}
//   return (

//       <div>
//         {/* Salas */}
//         <Room />
//         {/* Chat Feed */}
//         <Feed usersession={usersession}/>
//         {/* Usuarios */}
//         <Users />  
//       </div>

//   )
// }

function App () {
  const token = window.sessionStorage.getItem('jwt');
  const usersession = window.sessionStorage.getItem('nickname');
  const idRoom = window.sessionStorage.getItem('RoomNow');

  if (!token) {
    return (
      <UserContextProvider>
        <Login />
      </UserContextProvider>
    );
  }
  return (
    <>

        <Room />
        <Feed user={usersession} id={idRoom}/>
        {/* <Users /> */}
   
    </>
  )
}

export default App;
