import React, {useEffect, useState}  from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";

// import useToken from "./hooks/useToken";
import Login from "./components/Login";
import LoginPage from './pages/Login'
import Layout from "./pages/Layout";
import RegisterPage from "./pages/Register";

import NoPage from './pages/NoPage';

// import Chat from "./components/Chat";
// export default function App () {
//   return <Chat />

// }  
function App() {
  const [token, setToken] = useState('')
  // setToken(window.localStorage.getItem('jwt'))
  useEffect(() => {
    setToken(window.localStorage.getItem('jwt'))
    console.log(token)
  },[token])
  
    if(!token) {
      return (
        <BrowserRouter>
          <Routes>
              <Route path='/register' element={<RegisterPage/>}/>  
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/' element={<LoginPage/>}/> 
              <Route path="*" element={<LoginPage/>} />     
          </Routes>
        </BrowserRouter>
  )}

  return (
    <>
      <BrowserRouter>
            
            <Routes>

                <Route path='/register' element={<RegisterPage/>}/>
                      
                <Route path='/login' element={<LoginPage/>}/>
             
                <Route path="/" element={<Layout/>} />

                <Route path="*" element={<NoPage/>} />
              
            </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;

