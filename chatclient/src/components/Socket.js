import io from 'socket.io-client';

let Socket = io('//localhost:3001');

export default Socket;