import React from "react";


import { UserContextProvider } from "./context/UserContext";

import Login from "./components/Login.js";
import Users  from "./components/Users";
import Feed from "./components/Feed";
import Room from "./components/Rooms";


// function Room({usersession, id}) {
//   const jwt = id;
//   const user = usersession;
//   const [rooms, setRooms] = useState([]);
//   const [roomId, setRoomId] = useState('');
//   const newRoomRef = useRef(null);
//   const joinRoomRef = useRef(null);

  

//   useEffect(() => {
//     getRooms(jwt)
//     .then(response => {
//       // console.log(response)
//       setRooms(response.rooms)
      
//     })
//   },[setRooms])

//   const  createRoom = () =>{ 
//     // e.preventDefault();
//     let room = newRoomRef.current.value || '';
//     console.log(room)
//     if(!String(room).trim()) return;
//     socket.emit(EVENTS.CLIENT.CREATE_ROOM, room);
//     room = '';
//   }

//   const joinRoom = () => {
//     socket.emit(EVENTS.CLIENT.JOIN_ROOM,  roomId, user);
//     window.sessionStorage.setItem('RoomNow', roomId);
//   }
// return (
//   <>     
//     <form>
//         <label className='chat__title'>Create a Room</label>
//         <input type='text' placeholder='Nombre de la sala' ref={newRoomRef} />
//         <button onClick={createRoom}>+</button>
//     </form>
//     <form>
//         {/* <label className='chat__title'>Join a room</label> */}
//         <select onChange={(e) => setRoomId(e.target.value)}>
//         {rooms.map((e,i) => 
//             <option key={i} value={e.roomId}>
//             {e.roomName}
//             </option>
//           )}
//         </select>
//         <button onClick={joinRoom}>Join a room</button>
//     </form>
//   </>
// )};

// function Feed({user, roomId}) {
//   let nick = user;
//   let idRoom = roomId;
//   const jwt = window.sessionStorage.getItem('jwt');
//   const [message, setMensaje] = useState("");
//   const [mensajes, setMensajes] = useState([]);
//   socket.emit(EVENTS.CLIENT.JOIN_ROOM,  idRoom, nick)

//   useEffect ( () => {
//     getRooms(jwt)
//     .then(response => {
//       console.log(response)
//       let rooms = response.rooms
//       let roomNow = rooms.find(m => m.roomId === idRoom)
//       console.log(roomNow)
//       let msg = roomNow.messages 
//       console.log(msg)
//       if(msg.lenght < 1) {
//         setMensajes([])
//       }
//       let lastMsgs = msg.slice(-5)
//       console.log(lastMsgs)
//       setMensajes(lastMsgs)
//     })
//   },[setMensajes])

//   useEffect(() => {
//     socket.on("mensajes", (message) => {
//       setMensajes([...mensajes, message]);
//     });
//   }, [mensajes]);

//   useEffect(() => {
//     socket.emit(EVENTS.connection, nick);
//     socket.emit(EVENTS.CLIENT.CONNECTED, idRoom, nick)
//   }, [user]);
//   // const divRef = useRef(null);
  
//   const handleMsg = (e) => {
//     e.preventDefault();
//     socket.emit("mensaje", idRoom, nick, message);
//     console.log(nick, message)
//     setMensaje("");
//   }

//   return(
//     <div>
//       FEED
//       <div>
//         <ul>
//           {mensajes.map((e,i) => 
//             <li key={i}>
//             <span>{e.user}</span>: <span>{e.message}</span>
//             </li>
//           )}
//         </ul>
//       </div>
//       <div>
//           <form onSubmit={submit}>
//             <input type='text' placeholder={`Hola soy ${user}`} value={message} onChange={(e) => setMensaje(e.target.value)}/>
//             <button onClick={handleMsg}>Enviar</button>
//           </form>
//         </div>
//     </div>
// )};

// function Users({id}) {
//   const jwt = id
//   const [users, setUsers] = useState([])
  
//   useEffect(() => {
//     getUsers(jwt)
//     .then(response => {
//       console.log(response)
//       setUsers(response.users)
//     })
//   },[setUsers])

//   return (
//     <div>
//         <p>USUARIOS</p>
//         <ul>
//           {users.map((e,i) => 
//             <li key={i}>
//             <span>{e.nickname}</span>
//             </li>
//           )}
//         </ul>
//       </div>      
// )};

function App () {
  const token = window.sessionStorage.getItem('jwt');
  const usersession = window.sessionStorage.getItem('nickname');
  const idRoom = window.sessionStorage.getItem('RoomNow');

  if (!token) {
    return (
      <UserContextProvider>
        <Login />
      </UserContextProvider>
    );
  }
  return (
    <>
        <Room user={usersession} />
        <Feed user={usersession} roomId={idRoom} />
        <Users user={usersession} roomId={idRoom}/>

    </>
  )
}

export default App;
