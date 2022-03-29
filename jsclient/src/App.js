import React, {useRef, useState, useEffect} from 'react';

// import Chat from './components/Chat'
import Rooms from './components/Rooms';
import Users from './components/Users';

import RoomList from './components/roomList';
import EVENTS from './config/events';
import SocketsProvider from './context/socket.context';
import { useSockets } from './context/socket.context';
import './styles/App.css';

const submit = (event) => {
  event.preventDefault();
}

const SendMsg = ({user}) => {
  return (
  <form className='chat__textBox'>
          <input type={"text"} placeholder={`Hola a todos soy ${user}`}></input>
          <button>Enviar</button>
  </form>
  )
}

const Chat = ({username}) => {
  return(
      <div className='chat__feed'>
          <div className='chat__msgList'><p>Mensaje de usuarios</p></div>
      </div>
  )
}

// const Rooms = () => {
//   // const [update, setUpdate] = useState(false);
//   const {socket, rooms, setRooms} = useSockets();
//   const newRoomRef = useRef(null)
    
//   useEffect(() => {
//       socket.on(EVENTS.SERVER.ROOMS, (room) =>{
//           setRooms({...room})   
//       });
//       return () => {
//       socket.off();
//       };
//   }, [rooms, socket]);

//   const handleCreateRoom = () => {
//       console.log('Creando Salas')
//       //Obtener Nombre de la sala
//       let roomName = newRoomRef.current.value || '';
//       if(!String(roomName).trim()) return;

//       socket.on(EVENTS.SERVER.ROOMS, (rooms) => {
//           console.log('SERVER',rooms)
       
//       })

//       // setUpdate(true);
//       //Avisar que la sala se ha creado
//       socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName})
              
//       //Agregar nombre al listado de salas
//       roomName = '';
//   }

//   return(
//       // <div className='chat chat__roomList'>
//           <div className='chat__roomList'>
//               <p className='chat__title'>Create a Room!</p>
//                   <form className='chat__newRoom' onSubmit={submit}>
//                       <input placeholder='Nombre de la sala' ref={newRoomRef}></input>
//                       <button onClick={handleCreateRoom}>+</button>
//                   </form>
//                   <p className='chat__title'>Join!</p>
//               <RoomList rooms={rooms} />
//           </div>
//       // </div>
//   )
// }

const App = () => {
  const [login, setLogin] = useState(false);
  const { socket, userName, setUsername } = useSockets();
 
  console.log('Front', typeof rooms);

  const usernameRef = useRef(null);

  const handleSetUsername = () => {
    userName = usernameRef.current.value;
    if(!userName){
      return;
    }
    setUsername(userName);
    
    setLogin(true);
    localStorage.setItem('username', userName);
    console.log(userName);
  }
  
  const user = localStorage.getItem('username');
  socket.emit(EVENTS.CLIENT.USER, {user});
  console.log(user);


  if(!login && !user) {
    return (
      <div className='wrapper row'>
        <h2 className='login-title'>Bienvenido al iTChat</h2>
          <form className="form">
            <input  className='login-input' placeholder='Nombre de usuario' ref={usernameRef}></input>
            <button className='login-button' onClick={handleSetUsername}>Entrar</button>
          </form>
      </div>
    ) 
  } else  {
  return (
    <SocketsProvider >
        <div className='wrapper row'>
            <h2 className='login-title'>iTChat - Hola {user}!!!</h2>
          <div className='chat'>
            <div className='chat__container'>
              <Rooms />
              <Chat username={user}/>
              <Users />
            </div>
            <SendMsg user={user}/>
          </div>
        </div>
    </SocketsProvider>
  )}
}
export default App;