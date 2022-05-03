import React, {useState} from 'react';
import { Link, Navigate, Redirect } from 'react-router-dom';
import login from '../services/login';

export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [respuesta, setResp] = useState('');
    const [token, setToken] = useState();
    


    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password)
        .then(sessionData => {

            window.localStorage.setItem('nickname', sessionData.nickname)
            window.localStorage.setItem('jwt', sessionData.token)
            let jwt =  window.localStorage.getItem('jwt', sessionData.token)
            setToken(jwt)
            setResp(sessionData.msg)
            window.location.reload()
        

          })
          .catch(sessionData => {
            window.localStorage.removeItem('jwt')
            // setResp(sessionData)
          })
    }
    if(token) {
      return <Navigate to='/'/>
    }
  return(
    <>
      <form onSubmit={handleLogin}>
        <label>{respuesta}</label>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <p>Eres nuevo?  <Link to="/register">Registrate aquí!</Link></p>
    </>
  )
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }