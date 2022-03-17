import React, {useRef, useState} from 'react';

//import Login from './components/Login'
//import Chat from './components/Chat';
import Rooms from './components/Rooms';
import Users from './components/Users';
import { useSockets } from './context/socket.context';
import './styles/App.css';

function App() {
  
  const [login, setLogin] = useState(false);
  
  const { socket, userName, setUsername } = useSockets();
  const usernameRef = useRef<HTMLInputElement>(null);

  const handleSetUsername = () => {
    const value = usernameRef?.current?.value;
    if(!value){
      return;
    }
    setUsername(value);
    setLogin(true);
    localStorage.setItem('userName', value);
  }
  
  if(!login) {
    return (
      <div className='wrapper row'>
      <h2 className='login-title'>Bienvenido al iTChat</h2>
        <form className="form">
          <input  className='login-input' placeholder='Nombre de usuario' ref={usernameRef}></input>
            {/* <input type="password" className='login-input' placeholder='Password'></input> */}
            {/* <button className='login-button'>Registro</button> */}
            <button className='login-button' onClick={handleSetUsername}>Entrar</button>
        </form>
    </div>
    )
  } else {
  return (
      <div>
        <Rooms />
        <Users />
      </div>
  )}
}
export default App;