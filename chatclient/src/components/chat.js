import React, {useState, useEffect, useRef} from 'react';

import socket from './Socket'
import '../App';

const Chat = ({userName}) => {
   
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit('conectado')
    })

    return(
        <div className='wrapper row'>
            <h2 className='login-title'>iTChat</h2>
            <div className='chat'>
                <div className='chat__roomList'>
                    <p className='chat__title'>My ChatRooms <button>+</button></p>
                    <ul>
                        <li>Room 1</li>
                        <li>Room 2</li>
                        <li>Room 3</li>
                    </ul>
                </div>
                <div className='chat__msgList'>Mensajes</div>
                <div className='chat__userList'>
                    <p className='chat__title'>Usuarios</p>
                    <ul>
                        <li> User 1</li>
                        <li> User 2</li>
                        <li> User 3</li>
                    </ul>
                </div>
            </div>

            <div className='chat__textBox'><input type={"text"} placeholder="Say Hello!"></input><button>Enviar</button></div>
        </div>
    )
}

export default Chat;