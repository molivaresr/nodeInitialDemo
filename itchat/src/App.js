import React, { useState, useRef } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import { UserContextProvider } from "./context/UserContext";
// import useLogin from "./hooks/useLogin";
import SplitPane from "./components/Split";
// import Home from './components/Home'
import Login from "./components/Login.js";
import Users  from "./components/Users";
import Feed from "./components/Feed";
import Room from "./components/Rooms";
// import useLogin from "./hooks/useLogin";

import App_style from './styles/App_style.css'

function Menu () {
  const logout = () => {
    window.localStorage.setItem('jwt','')
    window.localStorage.setItem('RoomNow','')
    window.localStorage.setItem('nickname','')
  }

  return (
    <div>
      <h1>ItChat</h1><button onClick={logout}>Log Out</button>
    </div>
  )
}

function App () {
  const token = window.localStorage.getItem('jwt');
  const usersession = window.localStorage.getItem('nickname');
  const idRoom = window.localStorage.getItem('RoomNow');
  
  if (!token) {
    return (
      <UserContextProvider>
        <Login />
      </UserContextProvider>
    );
  } else {
  return (
   
      <SplitPane
        left={<Room user={usersession} />}
        middle={<Feed user={usersession} roomId={idRoom}  />}
        right={<Users user={usersession} roomId={idRoom}/>} 
      />
    
  )}
}

// RUTAS TEST
// import Layout from "./pages/Layout";
// import Chat from "./pages/Chat";
// import Profile from './pages/Profile';
// import NoPage from './pages/NoPage'

// export  function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Chat />} />
//           <Route path="myaccount" element={<Profile />} />
//           <Route path="*" element={<NoPage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }


export default App;
