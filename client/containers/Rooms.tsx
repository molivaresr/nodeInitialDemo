// Listado de salas
import {useRef} from 'react';
import EVENTS from '../config/events';
import { useSockets } from '../context/socket.context'
// import '../styles/globals.css';

const Rooms = () => {
    const {socket} = useSockets();
    const newRoomRef = useRef<HTMLInputElement>(null)
    let roomList = new Array();

    const handleCreateRoom = () => {
        console.log('Creando Salas');

        socket.on(EVENTS.SERVER.ROOMS, (room) => {
            roomList.push(room);
        })
        //Obtener Nombre de la sala
        let roomName = newRoomRef.current?.value || '';
        if(!String(roomName).trim()) return;

        
        //Avisar que la sala se ha creado
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName})

        //Agregar nombre al listado de salas
        roomName = '';
        console.log(roomList) 
    }
    
    return(
        <div className='chat'>
            <div>
                <input placeholder='Nombre de la sala' ref={newRoomRef}></input>
                <button onClick={handleCreateRoom}>+</button>
            </div>
            <div className='chat__roomList'>
                <p className='chat__title'>My ChatRooms</p>
                <ul>
                    {Object.keys(roomList).map((key,  i) => { 
                    <li key={key[i]}>{roomList[i].name}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Rooms;