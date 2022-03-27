// Listado de salas
import React, {useRef} from 'react';
import EVENTS from '../config/events';
import { useSockets } from '../context/socket.context'
import '../styles/App.css';

const submit = (event) => {
    event.preventDefault();
}

const Rooms = () => {
    const {socket} = useSockets();
    const newRoomRef = useRef(null)
    
    const handleCreateRoom = () => {
        console.log('Creando Salas')
        //Obtener Nombre de la sala
        let roomName = newRoomRef.current.value || '';
        if(!String(roomName).trim()) return;

        socket.on(EVENTS.SERVER.ROOMS, (rooms) => {
            console.log('SERVER',rooms)
         
        })
        //Avisar que la sala se ha creado
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName})
                
        //Agregar nombre al listado de salas
        roomName = '';
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
                </ul>
            </div>
        </div>
    )
}

export default Rooms;