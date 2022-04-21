import React, {useEffect, useState} /* , { useState, useRef } */ from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";

// import { UserContextProvider } from "./context/UserContext";
// // import useLogin from "./hooks/useLogin";
// import SplitPane from "./components/Split";
// // import Home from './components/Home'
// import Login from "./components/Login.js";
// import Users  from "./components/Users";
// import Feed from "./components/Feed";
// import Room from "./components/Rooms";
// // import useLogin from "./hooks/useLogin";

// import App_style from './styles/App_style.css'

// function Menu () {
//   const logout = () => {
//     window.localStorage.setItem('jwt','')
//     window.localStorage.setItem('RoomNow','')
//     window.localStorage.setItem('nickname','')
//   }

//   return (
//     <div>
//       <h1>ItChat</h1><button onClick={logout}>Log Out</button>
//     </div>
//   )
// }

// function App () {
//   const token = window.localStorage.getItem('jwt');
//   const usersession = window.localStorage.getItem('nickname');
//   const idRoom = window.localStorage.getItem('RoomNow');
  
//   if (!token) {
//     return (
//       <UserContextProvider>
//         <Login />
//       </UserContextProvider>
//     );
//   } else {
//   return (
   
//       <SplitPane
//         left={<Room user={usersession} />}
//         middle={<Feed user={usersession} roomId={idRoom}  />}
//         right={<Users user={usersession} roomId={idRoom}/>} 
//       />
    
//   )}
// }

// RUTAS TEST
// import LoginPage from './components/LoginForm'
// import Login from './components/Login'
// import RequiredAuth from './hooks/useAuth'
// import { UserContextProvider } from "./context/UserContext";

import useToken from "./hooks/useToken";
import Login from './components/Login'
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import NoPage from './pages/NoPage';


  
function App() {
  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(window.localStorage.getItem('jwt'))
    console.log(token)
  },[token])
  
    if(!token) {
      return <Login />
    }

  return (
    <>
      <h1>iT Chat</h1>
      <BrowserRouter>
            {/* Menu */}
            <Routes>

                <Route path='/register' element={<Profile />}/>
           
              
                <Route path='/login' element={<Login />}/>
              
              
                <Route path="*" element={<NoPage />} />
              
              
                <Route path="/chat" element={<Chat />} />
              
            </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;

