import { createContext, useContext } from 'react';
import io from 'socket.io-client';
import { SOCKET_URL } from '../config/defaultConf';

const socket = io(SOCKET_URL);

const SocketContext = createContext ({socket});

const SocketsProvider = (props) => {
    const [userName, setUserName] = useState("");
    return <SocketContext.Provider value={{socket, userName, setUserName}} {...props} />
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;