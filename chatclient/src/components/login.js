import '../App.css';

const Login = () => {
    return(
        <div className='wrapper'>
            <h2 className='Login-title'>Bienvenido al iTChat</h2>
            <form>
                <input type="text" className='Login-input' placeholder='Nombre de usuario'></input>
                <input type="password" className='Login-input' placeholder='Password'></input>
                <button className='Login-button'>Registro</button>
                <button className='Login-button'>Entrar</button>
            </form>
        </div>
    )
}

export default Login;
