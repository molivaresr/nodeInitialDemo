import React, {useState} from 'react';

//import Login from './components/Login'
import Chat from './components/Chat';
import Rooms from './components/Rooms';
import Users from './components/Users';
import { useSockets } from './context/socket.context';
import './styles/App.css';

function App() {
  const [userName, setName] = useState("");
  const [login, setLogin] = useState(false);
  
  const { socket } = useSockets();

  const register = (e) => {
      e.preventDefault();
      //console.log('Entrar')
      if(userName) {
        console.log(userName)
          setLogin(true)
      }
  }
  if (login === true) {
    return (
        <div>
        <Rooms />
        <Chat userName = {userName}/>
        <Users />
      </div>
    )
  } else {   
      return(
            <div className='wrapper row'>
                <h2 className='login-title'>Bienvenido al iTChat</h2>
                <form className="form" onSubmit={register}>
                    <input type="text" className='login-input' placeholder='Nombre de usuario' value={userName} onChange={e => setName(e.target.value)}></input>
                    {/* <input type="password" className='login-input' placeholder='Password'></input> */}
                    {/* <button className='login-button'>Registro</button> */}
                    <button className='login-button'>Entrar</button>
                </form>
            </div>
        )
      }
}
export default App;
