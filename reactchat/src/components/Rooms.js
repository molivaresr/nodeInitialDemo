// Listado de salas
import {useRef} from 'react';
import EVENTS from '../config/events';
import { useSockets } from '../context/socket.context'
import '../styles/App.css';
import RoomList from './roomList';

// let roomList = new Array(0);

const submit = (event) => {
    event.preventDefault();
}

const Rooms = () => {
    const {socket} = useSockets();
    const newRoomRef = useRef(null)
    const [rooms, setRooms] = useState([]);
    
      useEffect(() => {
        socket.on(EVENTS.SERVER.ROOMS, (room) =>{
            console.log(room)
            setRooms([...room])   
        }); return () => socket.off();},[rooms]);
    
    const handleCreateRoom = () => {
        console.log('Creando Salas')
        //Obtener Nombre de la sala
        let roomName = newRoomRef?.current?.value || '';
        if(!String(roomName).trim()) return;
        console.log(roomName);
        
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName})//Agregar nombre al listado de salas
        
        socket.on(EVENTS.SERVER.ROOMS, (rooms) => { //Avisar que la sala se ha creado
            console.log(rooms)
        })                      
        
        roomName = '';
        // console.log(`Hola ${roomList.name}`)
        // console.log('O',roomList);
    }
   
    return(
        <div className='chat'>
            <div>
                <form onSubmit={submit}>
                    <input placeholder='Nombre de la sala' ref={newRoomRef}></input>
                    <button onClick={handleCreateRoom}>+</button>
                </form>
            </div>
            <div className='chat__roomList'>
                <p className='chat__title'>My ChatRooms</p>
                <ul> 
                <RoomList rooms={rooms}/>
                </ul>
            </div>
        </div>
    )
}

export default Rooms;