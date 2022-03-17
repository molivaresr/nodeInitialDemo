import { createContext, useContext, useState } from 'react';
import io, {Socket} from 'socket.io-client';
import { SOCKET_URL } from '../config/defaultConf';

interface Context {
    socket: Socket;
    userName?: string;
    setUsername: Function
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({socket, setUsername: () => false});

const SocketsProvider = (props:any) => {
    const [userName, setUserName] = useState("");
    return <SocketContext.Provider value={{socket, userName, setUserName}} {...props} />
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;