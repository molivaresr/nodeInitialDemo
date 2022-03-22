import { createContext, useContext, useState, useEffect} from 'react';
import io, {Socket} from 'socket.io-client';
import { SOCKET_URL } from '../config/defaultConf';
import EVENTS from '../config/events';

interface Context {
    socket: Socket;
    userName?: string;
    setUsername: Function;
    roomId?: string;
    //rooms: {id: string, name:string}[]
    //rooms: object;
    rooms: {[index:string]:any}
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
    socket, 
    setUsername: () => false,
    rooms:{}
});

const SocketsProvider = (props:any) => {
    const [userName, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const [rooms, setRooms] = useState({});
    

    socket.on(EVENTS.SERVER.ROOMS, (value) => {
        setRooms(value);
    });
    
    return <SocketContext.Provider value={{socket, userName, setUsername, rooms, roomId}} {...props} />
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;