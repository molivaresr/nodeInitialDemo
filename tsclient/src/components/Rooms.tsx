// Listado de salas
import {useRef} from 'react';
import EVENTS from '../config/events';
import socket, { useSockets } from '../context/socket.context'
import '../styles/App.css';

const Rooms = () => {
    const {socket, roomId, rooms} = useSockets();
    const newRoomRef = useRef<HTMLInputElement>(null)
    
    const handleCreateRoom = () => {
        //Obtener Nombre de la sala
        let roomName = newRoomRef.current?.value || '';
        if(!String(roomName).trim()) return;
        console.log('Creando Salas')
        
        //Avisar que la sala se ha creado
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName})
        
        //Agregar nombre al listado de salas
        roomName = '';
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
                    {Object.keys(rooms).map((key) => {
                    return(
                    <li key={key}>{rooms[key].name}</li>
                    )})}
                </ul>
            </div>
        </div>
    )
}

export default Rooms;