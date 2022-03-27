import React, {useState, useEffect, useRef} from 'react';

// import { useSockets } from '../context/socket.context'
import '../styles/App.css';

const userName = localStorage.getItem('username');

const Chat = () => {
    return(
        <div className='chat'>
            {/* <h2 className='login-title'>iTChat - Hola! {userName} </h2>               */}
                <div className='chat__msgList'><p>Mensaje de usuarios</p></div>
                    <form className='chat__textBox'>
                        <input type={"text"} placeholder={`Hola a todos soy ${userName}`}></input>
                        <button>Enviar</button>
                    </form>
        </div>
    )
}

export default Chat;