import React, {useEffect, useState}from 'react';

import getUsers from '../services/getUsers';
import '../styles/Users_style.css'

export default function Users({usersession, idRoom}) {
  console.log('Render Users');
    const nick = usersession;
    const roomId = idRoom;
    const jwt = window.localStorage.getItem('jwt');
    const [users, setUsers] = useState([])
    
    // useEffect ( () => {
    //     getRooms(jwt)
    //     .then(response => {
    //       console.log(response)
    //       let rooms = response.rooms
    //       let roomNow = rooms.find(m => m.roomId === idRoom)
    //       console.log(roomNow)
    //       let msg = roomNow.messages
    //       if(msg.length != 1) {
    //         let lastMsgs = msg.slice(-5)
    //       console.log(lastMsgs)
    //       setMensajes(lastMsgs)
    //       } else { 
    //         setMensajes([]) 
    //       }
    //     })
    //   },[setMensajes,jwt,idRoom])

    // useEffect(() => {
    //   getUsers(jwt)
    //   .then(response => {
    //     console.log(response)
    //     let users = response.users
    //     console.log(users)
    //     let roomUsers = users.map((e,i) => {e.rooms[i].roomId})
    //     console.log(roomUsers)
    //     // setUsers(response.users)
    //   })
    // },[setUsers,jwt])
  
    return (
      <div className='user'>
          <h2>USUARIOS</h2>
          <ul>
            {users.map((e,i) => 
              <li key={i}>
              <span>{e.nickname}</span>
              </li>
            )}
          </ul>
        </div>      
  )};