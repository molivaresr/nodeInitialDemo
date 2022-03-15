import React, {useState} from 'react';
import '../App.css';

const Login = ({register}) => {
    
    return(
        <div className='wrapper row'>
            <h2 className='login-title'>Bienvenido al iTChat</h2>
            <form className="form" onSubmit={register}>
                <input type="text" className='login-input' placeholder='Nombre de usuario' value={userName} onChange={e => setName(e.target.value)}></input>
                {/* <input type="password" className='login-input' placeholder='Password'></input> */}
                {/* <button className='login-button'>Registro</button> */}
                <button className='login-button'>Entrar</button>
            </form>
        </div>
    )
}

export default Login;
