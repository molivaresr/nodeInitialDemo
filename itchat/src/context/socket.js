import React from 'react';
import io from 'socket.io-client';

import {SOCKET_URL} from '../config/default';

export const sockets = io(SOCKET_URL);
const SocketContext = React.createContext(sockets);

export default SocketContext