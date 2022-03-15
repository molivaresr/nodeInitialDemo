import React, {useState} from 'react';

import Login from './components/Login'
import Chat from './components/Chat'
import './App.css';

function App() {
  
  const [userName, setName] = useState("");
  const [login, setLogin] = useState(false);
  
  const register = (e) => {
      e.preventDefault();
      console.log('Entrar')
      if(!userName) {
          setLogin(true)
      }
  }
  if (login === true) {
    return (
      <Chat />
    )
  }
  return (
    <Login props = {register}/>
  );

}

export default App;
