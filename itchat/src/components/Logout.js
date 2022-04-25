import React, {useState} from 'react';
import logOut from '../services/logout';



export default function Logout({user}) {
    // const [token, setToken] = useState();
    const [logout, setLogout] = useState('');
    window.localStorage.getItem('nickname')

    const handleLogout = (e) => {
        e.preventDefault();
        logOut(user)
        .then(sessionData => {
    
            window.localStorage.removeItem('nickname')
            window.localStorage.removeItem('jwt')
            window.localStorage.removeItem('RoomNow')
   
            setLogout(sessionData)
            window.location.reload()
            // setNickname(nickname)
          })
          .catch(err => {
            console.log(err)
            // setResp(sessionData)
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