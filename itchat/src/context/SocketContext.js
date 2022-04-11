import React from 'react';
import { useState } from 'react';
import io, { Socket } from 'socket.io-client';

import {SOCKET_URL} from '../config/default';

export const socket = io(SOCKET_URL);

const SocketContext = React.createContext({
    socket,
    setUser: () => false,
    setMessages: () => false,
    rooms: [],
    messages: [],
});

export const SocketProvider = ({children}) => {

    const [user, setUser] = useState([]);
    const [rooms, setRoom] = useState([]);
    const [message, setMessages] = useState([]);

    return <Socket.Provider value ={{
        user,
        rooms,
        message,
        setUser,
        setRoom,
        setMessages
    }}>
        {children}
    </Socket.Provider>
}

export default SocketContext
