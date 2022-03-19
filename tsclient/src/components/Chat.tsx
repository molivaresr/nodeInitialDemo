import React, {useState, useEffect, useRef} from 'react';

import socket from '../context/socket.context'
import '../styles/App.css';
const user = localStorage.getItem('username');
const Chat = (props:any) => {
   
    return(
        <div >
            <h2 className='login-title'>iTChat - Hola! {user} </h2>              
                <div className='chat__msgList'><p>Mensaje de usuarios</p></div>
                    <form className='chat__textBox'>
                        <input type={"text"} placeholder={`Hola a todos soy ${user}`}></input>
                        <button>Enviar</button>
                    </form>
        </div>
    )
}

export default Chat;