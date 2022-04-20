import Room from "../components/Rooms";
import Feed from "../components/Feed";
import Users from "../components/Users";
import SplitPane from "../components/Split";
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
  // const token = window.localStorage.getItem('jwt');
  const usersession = window.localStorage.getItem('nickname');
  const idRoom = window.localStorage.getItem('RoomNow');
  console.log('Render Chat');
 return (
  <SplitPane 
    left={<Room user={usersession} />}
    middle={<Feed user={usersession} roomId={idRoom}  />}
    right={<Users user={usersession} roomId={idRoom}/>} 
  />
 
 
 )
}
  export default Chat;