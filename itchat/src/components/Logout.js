import React, {useState} from 'react';
import logOut from '../services/logout';
import Logout_style from '../styles/logout_style.css'


export default function Logout() {
    
    const [logout, setLogout] = useState(false);
    const user = window.localStorage.getItem('nickname')

    const handleLogout = (e) => {
        e.preventDefault();
        logOut(user)
        .then(sessionData => {
    
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
        <form onSubmit={handleLogout}>
          <button type="submit">Logout</button>
        </form>
      
    </>
  )
}