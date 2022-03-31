import React, { useState, useRef } from "react";

import User from './components/Users'
import Feed from "./components/Feed";
// import { socket } from "./context/socket";
import "./App.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  console.log('Inicio')

  const usernameRef = useRef(null); 

  const registrar = (e) => {
    e.preventDefault();
    const value = usernameRef.current.value;
    if (!value) {
      return;
    }
    setNombre(value)
    setRegistrado(true);
  }

  return (
    <div className="App">
      {!registrado && (
        <form onSubmit={registrar}>
          <label htmlFor="">Introduzca su nombre</label>
          <input ref={usernameRef} /* value={nombre} onChange={(e) => setNombre(e.target.value) }*/ />
          <button >Ir al chat</button>
        </form>
      )}

      {registrado && 
      <>
      <Feed nombre={nombre} />
      <User />
      </>}
    </div>
  );
}

export default App;
