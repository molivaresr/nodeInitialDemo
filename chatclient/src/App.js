import React, {useState} from 'react';

import Login from './components/login'
import Chat from './components/chat'
import './App.css';

function App() {

  // const [on, setOn] = useState(0)
  // const handleClick = () => {
  //   console.log('Clicked')
  // }
  let on = 1
  if (on === 0) {
    return (
      <Login />
    )
  }
  return (
    <Chat />
  );
}

export default App;
