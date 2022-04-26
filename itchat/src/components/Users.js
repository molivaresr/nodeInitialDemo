import React, {useEffect, useState}from 'react';
import { socket } from '../context/SocketContext';
import '../styles/Users_style.css'

export default function Users({user, roomId}) {
  
  const [listUsers, setList] = useState([]);
  const [users, setUsers] = useState([]);
  
  socket.on("users", (user) => {
    console.log(user)
  });

  useEffect(() => {
    socket.on("users", (user) => {
      setUsers(users.concat(user))
    });
    // return() => {
    //   socket.off();
    // }
  }, [users]);

  // useEffect(() => { 
  //   setList(listUsers.concat(users))
  // },[listUsers,users])

  let find = listUsers.filter(e => e.roomId === roomId)
  // console.log(find)
  let uniqueUsers = [...new Set(listUsers)]
  // useEffect(() => {
  //   socket.on('users', (array) => {
  //   console.log(array)
  //   // setUsers(users.concat(array))  
  //   return() => {
  //     socket.off();
  //   }
  // })}, []);

  // console.log(users)
  // console.log('Render Users');    
  
    return (
      <div className='user'>
          <h2>Usuarios</h2>
          <ul>
            {/* {uniqueUsers.map((e,i) => 
              <li key={i}><button>{e.user}</button>
              </li>
            )} */}
          </ul>
        </div>      
  )};