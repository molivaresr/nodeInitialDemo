import '../App.css';

const Chat = () => {
    return(
        <div className='wrapper row'>
            <h2 className='login-title'>iTChat</h2>
            <div className='chatFeed'>
                <div className='roomList'>
                    <p>My Rooms<button>New Room</button></p>
                </div>
                <div className='msgList'>Mensajes</div>
                <div className='userList'>Usuarios</div>
            </div>
            <div className='textBox'><input type={"text"} placeholder="Hola!"></input><button>Enviar</button></div>
        </div>
    )
}

export default Chat;