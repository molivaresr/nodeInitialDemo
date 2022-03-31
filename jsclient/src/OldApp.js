import React, {useEffect, useRef, useState} from 'react';

// import Chat from './components/Chat'
import Feed from './components/Feed'
// import Rooms from './components/Rooms';
// import Users from './components/Users';
// import Login from './components/Login';

// import RoomList from './components/roomList';
import EVENTS from './config/events';

import SocketsProvider from './context/socket.context';
import { useSockets } from './context/socket.context';

import './styles/App.css';

const submit = (event) => {
  event.preventDefault();
}

const App = () => {
  const [login, setLogin] = useState(false);
  const { socket, userName, setUsername } = useSockets();
 
  // console.log('Front', typeof rooms);

  const usernameRef = useRef(null);

  const handleSetUsername = () => {
    const value = usernameRef.current.value;
    if(!value){
      return;
    }
    setUsername(userName);
    
    setLogin(true);
    localStorage.setItem('username', value);
    console.log(userName);
  }
  
  const user = localStorage.getItem('username');
  socket.emit(EVENTS.CLIENT.USER, {user});
  // console.log(user);


  if(!login && !user) {
    return (
      <div className='wrapper row'>
      <h2 className='login-title'>Bienvenido al iTChat</h2>
        <form className="form" onSubmit={submit}>
          <input  className='login-input' placeholder='Nombre de usuario' ref={usernameRef}></input>
          <button className='login-button' onClick={handleSetUsername}>Entrar</button>
        </form>
        <div>
          <section>
                      
          </section>
        </div>
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
              {/* <Chat username={user}/> */}
              <Feed />
              <Users />
            </div>
            {/* <SendMsg user={user}/> */}
          </div>
        </div>
    </SocketsProvider>
  )}
}
export default App;