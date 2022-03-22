import React, {useState} from 'react';
import '../styles/App.css';

const Login = () => {

    return(
        <div>
            <h2 className='login-title'>Bienvenido al iTChat</h2>
            <form className="form" >
                <input type="text" className='login-input' placeholder='Nombre de usuario'></input>
                {/* <input type="password" className='login-input' placeholder='Password'></input> */}
                {/* <button className='login-button'>Registro</button> */}
                <button className='login-button'>Entrar</button>
            </form>
        </div>
    )
}

export default Login;
