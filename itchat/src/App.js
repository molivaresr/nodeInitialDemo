import React/* , { useState, useRef } */ from "react";
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
import Login from './components/Login'
import RequiredAuth from './hooks/useAuth'
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import NoPage from './pages/NoPage'

import { UserContextProvider } from "./context/UserContext";

  
  export  function App() {

  return (
    <BrowserRouter>
      <UserContextProvider>
          <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Profile />}/>
            <Route path="/" element={
              <RequiredAuth>
                  <Layout />
              </RequiredAuth>  
                }>
              <Route index element={<Chat />} />
                {/* <Route path="myaccount" element={<Profile />} /> */}
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
    
      </UserContextProvider>
    </BrowserRouter>
  );
}


export default App;

