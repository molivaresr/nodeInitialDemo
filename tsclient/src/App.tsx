import React, {useRef, useState} from 'react';

import Chat from './components/Chat';
import Rooms from './components/Rooms';
import Users from './components/Users';
import SocketsProvider, { useSockets } from './context/socket.context';
import './styles/App.css';

function App() {
  
  const [login, setLogin] = useState(false);
  
  const { socket, userName, setUsername } = useSockets();
  const usernameRef = useRef<HTMLInputElement>(null);

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
    <SocketsProvider>
      <div className='chat wrapper row'>
         <h2 className='login-title'>iTChat - Hola {user}!!!</h2>
        <Rooms />
        <Chat />
        <Users />
      </div>
    </SocketsProvider>
  )}
}
export default App;