// import Room from "../components/Rooms";
// import Feed from "../components/Feed";
// import Users from "../components/Users";
// import SplitPane from "../components/Split";
// import Split from '../styles/Split.css'

// const Chat = () => {
//     let nick = user;
//     let idRoom = roomId;
//     const jwt = window.localStorage.getItem('jwt');

//     return (
//         <SplitPane
//         left={<Room user={usersession} />}
//         middle={<Feed user={usersession} roomId={idRoom}  />}
//         right={<Users user={usersession} roomId={idRoom}/>} 
//       />
//     );
//   };
  
//   export default Chat;

const Chat = () => {
    return (
    <div className="SplitPane">
        <div className="SplitPane-left">     
        <form>
            <label><h2>Create a Room</h2></label>
            {/* <input type='text' placeholder='Nombre de la sala' ref={newRoomRef} />
            <button onClick={createRoom}>+</button> */}
        </form>
        <form>
            <label><h2>Join a room</h2></label>
            {/* <select onChange={(e) => setRoomId(e.target.value)}>
            {rooms.map((e,i) => 
                <option key={i} value={e.roomId}>
                {e.roomName}
                </option>
              )}
            </select> */}
            {/* <button onClick={joinRoom}>Join a room</button> */}
        </form>
      </div>
        <div className='chat SplitPane-middle'>
        {/* <div><h2>Sala: {roomTitle}</h2></div> */}
        <div className='chat__feed'>
          <ul>
            {/* {mensajes.map((e,i) => 
              <li key={i} className='chat__message'>
              <span >{e.user}</span>: <span>{e.message}</span>
              </li>
            )} */}
          </ul>
        </div>
        <div>
            {/* <form onSubmit={submit} className='chat__textBox'> */}
              {/* <input type='text' placeholder={`Hola soy ${nick}`} value={message} onChange={(e) => setMensaje(e.target.value)}/> */}
              {/* <button onClick={handleMsg}>Enviar</button> */}
            {/* </form> */}
          </div>
      </div>
         <div className='user SplitPane-right' >
          <h2>USUARIOS</h2>
          <ul>
            {/* {users.map((e,i) => 
              <li key={i}>
              <span>{e.nickname}</span>
              </li>
            )} */}
          </ul>
        </div> 
      </div>
    );
  };
  
  export default Chat;