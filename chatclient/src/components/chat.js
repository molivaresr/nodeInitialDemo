import React, {useState, useEffect, useRef} from 'react';

import socket from './Socket'
import '../styles/App.css';

const Chat = ({userName}) => {
   
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit('conectado', userName)
    },[userName]);

    useEffect(() => {
        socket.on('mensajes', message => {
            setMessages([...messages, message])
        })
        return () => {socket.off()}
    }, [messages])
    
    const submit = (e) => {
        e.preventDefault();
        socket.emit('mensaje',userName, message);

    }

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
                <div className='chat__msgList'>{messages.map((e,i) => <p key={i}>{e.message}</p>)}</div>
                <div className='chat__userList'>
                    <p className='chat__title'>Usuarios</p>
                    <ul>
                        <li> User 1</li>
                        <li> User 2</li>
                        <li> User 3</li>
                    </ul>
                </div>
            </div>

            <div >
                <form onSubmit={submit} className='chat__textBox'>
                <input type={"text"} placeholder="Say Hello!" value={message} onChange={e => setMessage(e.target.value)}></input>
                <button>Enviar</button>
                </form>
            </div>
                
        </div>
    )
}

export default Chat;