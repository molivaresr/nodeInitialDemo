import React, {useState} from 'react';
// import PropTypes from 'prop-types';
import login from '../services/login';
import useToken from '../hooks/useToken';

export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useState();
    // const {setToken} = useToken();

    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password)
        .then(sessionData => {
            window.localStorage.setItem('nickname', sessionData.nickname)
            window.localStorage.setItem('jwt', sessionData.token)
            let jwt =  window.localStorage.getItem('jwt', sessionData.token)
            setToken(jwt)
            window.location.reload()
            // setNickname(nickname)
          })
          .catch(err => {
            window.localStorage.removeItem('jwt')
            console.error(err)
          })

          
    }

  return(
    <form onSubmit={handleLogin}>
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
  )
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }