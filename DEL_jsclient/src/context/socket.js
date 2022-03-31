import io from "socket.io-client";
import {SOCKET_URL} from '../config/defaultConf';

export const socket = io(SOCKET_URL);