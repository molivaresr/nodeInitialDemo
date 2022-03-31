import React, {useEffect, useRef} from 'react';

import EVENTS from '../config/events'
import { useSockets } from '../context/socket.context'
import '../styles/App.css';

const Chat = ({user}) => {
    const { socket, messages, /* roomId, */ username, setMessages } = useSockets();
    
    const newMessageRef = useRef(null);
    const messageEndRef = useRef(null);
  
    function handleSendMessage(event) {
    event.preventDefault()
      const message = newMessageRef.current.value;
  
      if (!String(message).trim()) {
        return;
      }
  
      socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { /* roomId, */ message, username });
  
      const date = new Date();
  
      setMessages([
        ...messages,
        {
          username: "You",
          message,
          time: `${date.getHours()}:${date.getMinutes()}`,
        },
      ]);
  
      newMessageRef.current.value = "";
    }
  
    useEffect(() => {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    
    return(
        <div className='chat'>
            {/* <h2 className='login-title'>iTChat - Hola! {userName} </h2>               */}
                {/* <div className='chat__msgList'><p>Mensaje de usuarios</p></div> */}
                {/* <SendMsg user={user}/> */}
                <div >
            {messages.map(({ message, username, time }, index) => {
                return (
                        <div key={index} >
                        <div key={index} >
                            <span >
                            {username} - {time}
                            </span>
                            <span> {message}</span>
                        </div>
                        </div>
                    );
            })}
            <div ref={messageEndRef}></div>
                <form className='chat__textBox'>
                    <input type={"text"} placeholder={`Hola a aaa todos soy ${user}`} ref={newMessageRef}></input>
                    <button onClick={handleSendMessage}>Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default Chat;