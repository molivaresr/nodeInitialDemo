import React, {useState, useRef} from "react";
import login from "../services/login";

 function Home () {

    const [logged, setLogged] = useState (false);
    const userRef = useRef(null);
    const passRef = useRef(null);

    const handleLogin = (e) => {
        e.preventDefault();
        const userValue = userRef.current.value
        const passValue = passRef.current.value
        login(userValue, passValue)
        .then(sessionData => {
            window.sessionStorage.setItem('nickname', sessionData.nickname);
            window.sessionStorage.setItem('jwt', sessionData.token);
            setLogged(true)
        })
    }
    

return (
    <>

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

    </>
  );
}