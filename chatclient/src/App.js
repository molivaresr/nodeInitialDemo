import React, {useState} from 'react';

import Login from './components/Login'
import Chat from './components/Chat'
import './App.css';

function App() {
  // const [login, setLogin] = useState(false)
  // const handleClick = () => {
  //   console.log('Clicked')
  // }

  let login = false;
  if (login === true) {
    return (
      <Login />
    )
  }
  return (
    <Chat />
  );

}

export default App;
