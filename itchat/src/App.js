import React, { useState, useRef, useEffect } from "react";

import SocketContext, {sockets} from "./context/socket";

function Room() {
return (
  <div>
    <p>ROOMS</p>
  </div>
)};

function Feed({usersession}) {
  let nombre = usersession;
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    sockets.emit("conectado", nombre);
  }, [nombre]);

  useEffect(() => {
    sockets.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]);
    });

    return () => {
      sockets.off();
    };
  }, [mensajes]);

  const divRef = useRef(null);
  
  // useEffect(() => {
  //   divRef.current.scrollIntoView({ behavior: "smooth" });
  // });
  const handleMsg = (e) => {
    e.preventDefault();
    sockets.emit("mensaje", nombre, mensaje);
    setMensaje("");
  }

  return(
    <div>
      FEED
      <div>
        <ul>
          {mensajes.map((e,i) => 
            <li key={i}>
            <span>{e.nombre}</span>: <span>{e.mensaje}</span>
            </li>
          )}
        </ul>
      </div>
      <div>
          <form onSubmit={handleMsg}>
            <input type='text' placeholder={`Hola soy ${nombre}`} value={mensaje} onChange={(e) => setMensaje(e.target.value)}/>
            <button>Enviar</button>
          </form>
        </div>
    </div>
)};

function Users() {
  return (
    <div>
        <p>USUARIOS</p>
      </div>      
)};

function App() {
  const [username, setUsername] = useState('');
  const [login, setLogin] = useState('');

  const usernameRef = useRef(null);
  
  const handleUsername = (e) => {
    e.preventDefault();
    const value = usernameRef.current.value;
    if(!value) {
      return;
    }
    setUsername(value);
    setLogin(true);
    localStorage.setItem('usuario',value);
  }

  const usersession = localStorage.getItem('usuario')

  if(!usersession) {
    return (
      <div>
         <form onSubmit={handleUsername}>
           <input ref={usernameRef} />
           <button>Login</button>
         </form>
      </div>
    )}
  return (
    
      <div>
        {/* Salas */}
        <Room />
        {/* Chat Feed */}
        <Feed usersession={usersession}/>
        {/* Usuarios */}
        <Users />  
      </div>
    
  )
}

export default App;
