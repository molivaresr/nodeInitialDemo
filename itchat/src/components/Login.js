import React, { useEffect, useRef} from "react";
import useLogin from '../hooks/useLogin'

export default function Login({onLogin}) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
//   const [, navigate] = useLocation()
  const {isLoginLoading, hasLoginError, login, isLogged} = useLogin();
  const userRef = useRef(null);
  const passRef = useRef(null);
  useEffect(() => {
    if (isLogged) {
    //   navigate('/')
      onLogin && onLogin()
    }
  }, [isLogged, /*navigate,*/ onLogin])

  const handleSubmit = (e) => {
    const userValue = userRef.current.value
    const passValue = passRef.current.value
    e.preventDefault();
    console.log(userValue, passValue);
    login(userValue, passValue)
    
  };

  return (
    <>
      {isLoginLoading && <strong>Checking credentials...</strong>}
      {!isLoginLoading &&
        <form className='form' onSubmit={handleSubmit}>
          <label>
            email
            <input placeholder="email" ref={userRef}/>
          </label>

          <label>
            password
            <input type="password" placeholder="password" ref={passRef}/>
          </label>

          <button className='btn'>Login</button>
        </form>
      }
      {
        hasLoginError && <strong>Credentials are invalid</strong>
      }
    </>
  );
}