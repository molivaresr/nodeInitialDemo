import React, {useState, useRef} from 'react';

import Chat from './components/Chat';
import Rooms from './components/Rooms';
import Users from './components/Users';
import { useSockets } from './context/socket.context';
import './styles/App.css';

function App() {
  const {socket, userName, setUsername} = useSockets();
  const [login, setLogin] = useState(false);

  const usernameRef = useRef(null);
  
  const handleSetUsername = () => {
    const username = usernameRef.current.value;
    console.log(username);
    if(!userName){
      return;
    }
    setUsername(username);
    setLogin(true);
    localStorage.setItem('usuario', username);
  }
  
  const user = localStorage.getItem('usuario');
  //console.log(user);

  if (!login && !user) {
    return (
      <div className='wrapper row'>
          <h2 className='login-title'>Bienvenido al iTChat</h2>
          <form className="form">
              <input type="text" className='login-input' placeholder='Nombre de usuario' ref={usernameRef}></input>
              <button className='login-button' onClick={handleSetUsername}>Entrar</button>
          </form>
      </div>
    )
  } else { 
    return (
      <div className='chat wrapper row'>
        <Rooms />
        <Chat userName = {user}/>
        <Users />
      </div>
    )  
  }
}
export default App;