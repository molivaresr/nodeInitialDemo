import React, {useState} from 'react';
import { socket } from '../context/SocketContext';
import logOut from '../services/logout';
import EVENTS from '../config/events';
import Logout_style from '../styles/logout_style.css'


export default function Logout() {
    const [logout, setLogout] = useState(false);
    const user = window.localStorage.getItem('nickname')
    const roomId = window.localStorage.getItem('RoomNow')
    const handleLogout = (e) => {
        e.preventDefault();
        logOut(user)
        .then(sessionData => {
          
          socket.emit(EVENTS.CLIENT.LEFT_ROOM, roomId, user);
          window.localStorage.removeItem('nickname')
          window.localStorage.removeItem('jwt')
          window.localStorage.removeItem('RoomNow')
   
            setLogout(true)
            window.location.reload()
  
          })
          .catch(err => {
            console.log(err)
     
          })
    }

  return(
    <>
        
          <button type="submit" onClick={handleLogout}>Logout</button>
        
      
    </>
  )
}