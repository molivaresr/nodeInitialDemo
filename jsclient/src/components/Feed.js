import React, { useState, useEffect, useRef } from "react";
// import socket from "./Socket";
import {socket} from '../context/socket';
import "../App.css";

const Feed = ({ nombre }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.emit("conectado", nombre);
  }, [nombre]);

  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]);
    });

    return () => {
      socket.off();
    };
  }, [mensajes]);

  const divRef = useRef(null);
  
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const submit = (e) => {
    e.preventDefault();
    socket.emit("mensaje", nombre, mensaje);
    setMensaje("");
  };

  return (
    <>
      <div>
      
          <ul>
          {mensajes.map((e, i) => (
            <li key={i}>
              [<span>{e.nombre}</span>]
              <span>{e.mensaje}</span>
            </li>
          ))}
          </ul>
          <div ref={divRef}></div>
      </div>
      <form onSubmit={submit}>
        <label htmlFor="">Escriba su mensaje</label>
        <input type='text' value={mensaje}
           onChange={(e) => setMensaje(e.target.value)}/>
         <button>Enviar</button>
      </form>
    </>
  );
};

export default Feed;
