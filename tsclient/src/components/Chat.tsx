import React, {useState, useEffect, useRef} from 'react';

import socket from '../context/socket.context'
import '../styles/App.css';

const Chat = () => {
   
    return(
        <div className='wrapper row'>
            <h2 className='login-title'>iTChat - Hola!  </h2>
            <div className='chat'>                
            <div className='chat__msgList'><p>Mensaje de usuarios</p></div>
                <form className='chat__textBox'>
                <input type={"text"} placeholder={`Hola a todos soyzzzz`}></input>
                <button>Enviar</button>
                </form>
            </div>
                
        </div>
    )
}

export default Chat;