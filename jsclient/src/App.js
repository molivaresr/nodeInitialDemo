import React, {useRef, useState, useEffect} from 'react';

import Chat from './components/Chat';
import Rooms from './components/Rooms';
import RoomList from './components/roomList';
import Users from './components/Users';
import EVENTS from './config/events';
import { useSockets } from './context/socket.context';
import './styles/App.css';

// const SocketInfo = () => {
//   let rooms
//   const { socket } = useSockets();
//   socket.on(EVENTS.SERVER.ROOMS, (room) => {
//     console.log(room)
//     rooms = room
//     console.log(rooms)
//   })
//   console.log(rooms)
//   return rooms
// }

function App() {
  
  // let rooms = [
  //     {id:'ID1',
  //     name:'NAME'},
  //     {id:'I2',
  //     name:'NAME'},
  //     {id:'ID3',
  //     name:'NAME'},
  //     {id:'ID4',
  //     name:'NAME'}
  //   ]
  const [login, setLogin] = useState(false);
  const [rooms, setRooms] = useState([]);
    
  const { socket, userName, setUsername } = useSockets();

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOMS, (room) =>{
        setRooms([...room])   
    });

    return () => {
      socket.off();
    };
  }, [rooms]);
  
  
  console.log(rooms)
  const usernameRef = useRef(null);

  const handleSetUsername = () => {
    const userName = usernameRef?.current?.value;
    if(!userName){
      return;
    }
    setUsername(userName);
    setLogin(true);
    localStorage.setItem('username', userName);
    console.log(userName)
  }
  
  const user = localStorage.getItem('username');
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
      
      <div className=' wrapper row'>
         <h2 className='login-title'>iTChat - Hola {user}!!!</h2>
        <Rooms />
        <RoomList rooms={rooms}/>
        <Chat />
        <Users />
      </div>
  )}
}
export default App;