import React, {useState, useRef} from 'react';

import { useSockets } from '../context/socket.context';
import '../styles/App.css';

const Login = () => {

    const [login, setLogin] = useState(false);
  
    const { socket, userName, setUsername } = useSockets();
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
    }
}
export default Login;
