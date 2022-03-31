// import React, { createContext, useContext, useState, useEffect} from 'react';
// import io, { Socket } from 'socket.io-client';
// import { SOCKET_URL } from '../config/defaultConf';
// import EVENTS from '../config/events';

// // const socket = io(SOCKET_URL);

// const SocketContext = createContext({
//   socket,
//   setUsername: () => false,
//   setMessages: () => false,
//   setRooms: () => false,
//   rooms: {},
//   messages: [],
// });

// function SocketsProvider(props) {
//   const [username, setUsername] = useState("");
//   const [roomId, setRoomId] = useState("");
//   const [rooms, setRooms] = useState({});
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     window.onfocus = function () {
//       document.title = "Chat app";
//     };
//   }, []);

//   socket.on(EVENTS.SERVER.ROOMS, (value) => {
//     setRooms(value);
//   });

//   socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
//     setRoomId(value);
//     setMessages([]);
//   });

//   useEffect(() => {
//     socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
//       if (!document.hasFocus()) {
//         document.title = "New message...";
//       }

//       setMessages((messages) => [...messages, { message, username, time }]);
//     });
//   }, []);

//   return (
//     <SocketContext.Provider
//       value={{
//         socket,
//         username,
//         setUsername,
//         rooms,
//         roomId,
//         messages,
//         setMessages,
//       }}
//       {...props}
//     />
//   );
// }

// export const useSockets = () => useContext(SocketContext);

// export default SocketsProvider;
