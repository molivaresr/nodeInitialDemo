import React, { useState, useRef } from "react";


import { UserContextProvider } from "./context/UserContext";
import login from "./services/login";
import SplitPane from "./components/Split";
// import Home from './components/Home'
// import Login from "./components/Login.js";
import Users  from "./components/Users";
import Feed from "./components/Feed";
import Room from "./components/Rooms";
import useLogin from "./hooks/useLogin";

import App_style from './styles/App_style.css'

function Menu () {


  const logout = () => {
    window.sessionStorage.setItem('jwt','')
    window.sessionStorage.setItem('RoomNow','')
    window.sessionStorage.setItem('nickname','')
  }

  return (
    <div>
      <h1>ItChat</h1><button onClick={logout}>Log Out</button>
    </div>
  )
}

function App () {
  // const [token, setToken] = useState("")
  // const {jwt, setJWT, isLogged} = useLogin()
  const [logged, setLogged] = useState (false);
  const [logData, setLogData] = useState ({})
  const userRef = useRef(null);
  const passRef = useRef(null);

  const handleLogin = (e) => {
      e.preventDefault();
      const userValue = userRef.current.value
      const passValue = passRef.current.value
      login(userValue, passValue)
      .then(sessionData => {
          setLogData({
            user: window.sessionStorage.setItem('nickname', sessionData.nickname),
            jwt: window.sessionStorage.setItem('jwt', sessionData.token),
            roomId: window.sessionStorage.setItem('RoomNow', '')
          })
          setLogged(true)
      })
  }

  return (
    <UserContextProvider>
      {!logged && (
        
        <>
        {/* {isLoginLoading && <strong>Checking credentials...</strong>}
        {!isLoginLoading && */}
          <form className='form' onSubmit={handleLogin}>
            <label>
              email
              <input className="login__input" placeholder="email" ref={userRef}/>
            </label>
  
            <label>
              password
              <input className="login__input" type="password" placeholder="password" ref={passRef}/>
            </label>
  
            <button className='login__button'>Login</button>
          </form>
        {/* }
        {
          hasLoginError && <strong>Credentials are invalid</strong>
        } */}
      </>
        
      )} 
      {logged && 
      <>
      <Menu token={logData.jwt} user={logData.user} room={logData.roomId}/>
        <SplitPane
            left={<Room user={logData.user} />}
            middle={<Feed user={logData.user} room={logData.roomId} />}
            right={<Users user={logData.user} room={logData.roomId}/>} 
      /> 
      </>}
    </UserContextProvider>
  )

  // if (!token) {
  //   return (
  //     <UserContextProvider>
  //       <Login />
  //     </UserContextProvider>
  //   );
  // } else {
  // return (
  //   <>
  //     <SplitPane
  //       left={<Room user={usersession} />}
  //       middle={<Feed user={usersession} roomId={idRoom} />}
  //       right={<Users user={usersession} roomId={idRoom}/>} 
  //     />
  //   </>
  // )}
}

export default App;
