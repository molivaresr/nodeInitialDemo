import React, {useState, useEffect, useRef} from 'react';

import SendMsg from './SendMsg'
// import { useSockets } from '../context/socket.context'
import '../styles/App.css';

const Chat = ({user}) => {
  console.log(user)
    return(
        <div className='chat'>
            {/* <h2 className='login-title'>iTChat - Hola! {userName} </h2>               */}
                <div className='chat__msgList'><p>Mensaje de usuarios</p></div>
                <SendMsg user={user}/>
        </div>
    )
}

export default Chat;