import React, {useEffect, useState}from 'react';
import {socket} from '../context/SocketContext';
import EVENTS  from '../config/events';
import getUsers from '../services/getUsers';
import '../styles/Users_style.css'

export default function Users({usersession, idRoom}) {
  const [user, setUser] = useState('')
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on(EVENTS.CLIENT.JOIN_ROOM, (message) => {
      setUsers([...users, user]);
    });
  }, [user, users]);

  console.log('Render Users');    
  
    return (
      <div className='user'>
          <h2>USUARIOS</h2>
          <ul>
            {users.map((e,i) => 
              <li key={i}>
              <span>{users[i]}</span>
              </li>
            )}
          </ul>
        </div>      
  )};