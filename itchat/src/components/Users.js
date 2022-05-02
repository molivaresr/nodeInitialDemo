import React, {useEffect, useState}from 'react';
import { socket } from '../context/SocketContext';
import Users_style from '../styles/Users_style.css'

export default function Users({roomId}) {
  // const [listUsers, setList] = useState([]);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    socket.on('users', (list) => {
      // console.log(list)
    // const filterUsers = list.filter(e => e.roomId === roomId)
    // console.log(filterUsers)
    setUsers(list)
       
    // return() => {
    //   socket.off();
    // }
  })}, [users, roomId, setUsers]); 

  const filterUsers = users.filter(e => e.roomId === roomId)
  // console.log(filterUsers)
  
    return (
      <div className='users'>
          <h2>Usuarios</h2>
          <ul>
            {filterUsers.map((e) => 
              <li key={e.id}>{e.user}
              </li>
            )}
          </ul>
        </div>      
  )};