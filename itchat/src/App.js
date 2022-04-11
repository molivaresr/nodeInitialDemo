import React, { useState, useRef, useEffect } from "react";
import EVENTS from "./config/events";

import Login from "./components/Login.js";

import { UserContextProvider } from "./context/UserContext";
import {SocketProvider, socket} from "./context/SocketContext";
import getUser from "./services/userdata";

const submit = (event) => {
  event.preventDefault();
}

// function Room() {
//   const [rooms, setRooms] = useState([]);
//   const [roomId, setRoomId] = useState('');
//   const newRoomRef = useRef(null);

//   useEffect(() => {
//     socket.on(EVENTS.SERVER.ROOMS, (rooms) => {
//       setRooms({...rooms})
//     });
//     return () => {socket.off()};
//   },[rooms, setRooms]);

//   const  createRoom = (event) =>{ 
//     event.preventDefault();
//     let room = newRoomRef.current.value || '';
//     console.log(room)
//     if(!String(room).trim()) return;

//     socket.on(EVENTS.SERVER.ROOMS, (rooms) => {
//       console.log('Escuchando salas del server', rooms)
//     })

//     socket.emit(EVENTS.CLIENT.CREATE_ROOM, {room})
//     room = '';

//   }
//   // tryLogin() 
// return (
//   <>
//       <label className='chat__title'>Create a Room</label>
//         <form onSubmit={submit}>
//             <input placeholder='Nombre de la sala' ref={newRoomRef}></input>
//               <button onClick={createRoom}>+</button>
//         </form>
//         <label className='chat__title'>Join a room</label>
//         {/* <form onSubmit={submit}>
//           <RoomList rooms={rooms} />
//         </form> */}
//   </>
// )};

function Feed({usersession}) {
  let nombre = usersession;
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  
  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]);
    });

    // return () => {socket.off()};
  }, [mensajes]);


  useEffect(() => {
    socket.emit(EVENTS.connection, nombre);
  }, [nombre]);
  // const divRef = useRef(null);
  
  const handleMsg = (e) => {
    e.preventDefault();
    socket.emit("mensaje", nombre, mensaje);
    console.log(nombre, mensaje)
    setMensaje("");
  }

  return(
    <div>
      FEED
      <div>
        <ul>
          {mensajes.map((e,i) => 
            <li key={i}>
            <span>{e.nombre}</span>: <span>{e.mensaje}</span>
            </li>
          )}
        </ul>
      </div>
      <div>
          <form onSubmit={submit}>
            <input type='text' placeholder={`Hola soy ${nombre}`} value={mensaje} onChange={(e) => setMensaje(e.target.value)}/>
            <button onClick={handleMsg}>Enviar</button>
          </form>
        </div>
    </div>
)};

// function Users() {
//   return (
//     <div>
//         <p>USUARIOS</p>
//       </div>      
// )};

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
//     localStorage.setItem('usuario',username);
//   }

//   const usersession = localStorage.getItem('usuario')

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
  const token = window.localStorage.getItem('jwt');
  const usersession = window.localStorage.getItem('nickname');
  
  if (!token) {
    return (
      <UserContextProvider>
        <Login />
      </UserContextProvider>
    );
  }
  return (
    <>
      <Feed usersession={usersession}/>
    </>
  )
}

export default App;
