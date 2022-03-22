// Listado de salas
import {useRef} from 'react';
import EVENTS from '../config/events';
import { useSockets } from '../context/socket.context'
import '../styles/App.css';

const roomList = new Array(0);

const Rooms = () => {
    const {socket, roomId, rooms} = useSockets();
    const newRoomRef = useRef(null)
    
    const handleCreateRoom = () => {

        //Obtener Nombre de la sala
        let roomName = newRoomRef.current?.value || '';

        if(!String(roomName).trim()) return;

        roomList.push(roomName);

        console.log('Creando Salas')
        
        //Avisar que la sala se ha creado
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName})
        console.log(rooms)
        
        //Agregar nombre al listado de salas
        roomName = '';
        console.log(roomList);
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
                    {roomList.map((name, index) => {
                        return (
                        <li key={index}>{name}</li>
                        )
                    })}
                                  
                     {/* {roomList.map(key => {
                        return (
                            <li key={key}>{key}</li>
                        )})} */}

                    {/* {Object.keys(rooms).map((i) => {
                    return(
                    <li key={rooms[i].id}>{rooms[i].name}</li>
                    )})} */}
                </ul>
            </div>
        </div>
    )
}

export default Rooms;