import React, { useEffect, useRef} from "react";
import useLogin from '../hooks/useLogin'
import Login_Style from '../styles/Login_Style.css'

export default function Login({onLogin}) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
//   const [, navigate] = useLocation()
  const {isLoginLoading, hasLoginError, login, isLogged, } = useLogin();
  const userRef = useRef(null);
  const passRef = useRef(null);
  useEffect(() => {
    if (isLogged) {
    //   navigate('/')
      onLogin && onLogin()
    }
  }, [isLogged, /*navigate,*/ onLogin])

  const handleSubmit = (e) => {
    e.preventDefault();
    const userValue = userRef.current.value
    const passValue = passRef.current.value
  
    // console.log(userValue, passValue);
    login(userValue, passValue)
    
  };

  return (
    <>
      {isLoginLoading && <strong>Checking credentials...</strong>}
      {!isLoginLoading &&
        <form className='form' onSubmit={handleSubmit}>
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
      }
      {
        hasLoginError && <strong>Credentials are invalid</strong>
      }
    </>
  );
}