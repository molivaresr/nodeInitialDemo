import React, {useRef, useState, useEffect} from 'react';

// import Chat from './components/Chat'
// import Rooms from './components/Rooms';
import Users from './components/Users';

import RoomList from './components/roomList';
import EVENTS from './config/events';
import { useSockets } from './context/socket.context';
import './styles/App.css';

const submit = (event) => {
  event.preventDefault();
}

const Chat = ({username}) => {
  return(
      <div className='chat__feed'>
          {/* <h2 className='login-title'>iTChat - Hola! {username} </h2>               */}
          <div className='chat__msgList'><p>Mensaje de usuarios</p></div>
              <form className='chat__textBox'>
                <input type={"text"} placeholder={`Hola a todos soy ${username}`}></input>
                <button>Enviar</button>
              </form>
      </div>
  )
}

const Rooms = () => {
  // const [update, setUpdate] = useState(false);
  const [rooms, setRooms] = useState([]);
  const {socket} = useSockets();
  const newRoomRef = useRef(null)
    
  useEffect(() => {
      socket.on(EVENTS.SERVER.ROOMS, (room) =>{
          setRooms({...room})   
      });

      return () => {
      socket.off();
      };
  }, [rooms, socket]);

  const handleCreateRoom = () => {
      console.log('Creando Salas')
      //Obtener Nombre de la sala
      let roomName = newRoomRef.current.value || '';
      if(!String(roomName).trim()) return;

      socket.on(EVENTS.SERVER.ROOMS, (rooms) => {
          console.log('SERVER',rooms)
       
      })

      // setUpdate(true);
      //Avisar que la sala se ha creado
      socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName})
              
      //Agregar nombre al listado de salas
      roomName = '';
  }

  return(
      // <div className='chat chat__roomList'>
          <div className='chat__roomList'>
              <p className='chat__title'>My ChatRooms</p>
                  <form onSubmit={submit}>
                      <input placeholder='Nombre de la sala' ref={newRoomRef}></input>
                      <button onClick={handleCreateRoom}>+</button>
                  </form>
              <RoomList rooms={rooms} />
          </div>
      // </div>
  )
}

const App = () => {
  const [login, setLogin] = useState(false);
     
  var { socket, userName, setUsername } = useSockets();
 
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
      // <Login />
    ) 
  } else  {
  return (
      
    <div className=' wrapper row'>
         <h2 className='login-title'>iTChat - Hola {user}!!!</h2>
      <div className='chat'>
        <Rooms />
      <div className='contenedor'>
      <Chat username={user}/>
      <Users />
        
      </div>
      </div>
    </div>
  )}
}
export default App;