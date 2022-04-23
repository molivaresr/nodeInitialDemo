import React, {useEffect, useState}from 'react';
import {socket} from '../context/SocketContext';
import EVENTS  from '../config/events';
import getUsers from '../services/getUsers';
import '../styles/Users_style.css'

export default function Users({usersession, idRoom}) {
  // const [user, setUser] = useState('')
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('users', (user) => {
      setUsers([...users, user]);
    });

    return() => {
      socket.off();
    }
  }, [users]);
  console.log(users)
  console.log('Render Users');    
  
    return (
      <div className='user'>
          <h2>USUARIOS</h2>
          <ul>
            {users.map((e,i) => 
              <li key={e.id}><button>{e.user}</button>
              </li>
            )}
          </ul>
        </div>      
  )};