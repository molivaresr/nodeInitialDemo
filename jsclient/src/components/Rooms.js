// Listado de salas
import React, {useRef, useEffect, useState} from 'react';

import RoomList from './roomList';
import EVENTS from '../config/events';
import { useSockets } from '../context/socket.context'
import '../styles/App.css';

const submit = (event) => {
    event.preventDefault();
}

const Rooms = () => {
    // const [update, setUpdate] = useState(false);
    const [rooms, setRooms] = useState([]);
    const {socket} = useSockets();
    const newRoomRef = useRef(null)
      
    useEffect(() => {
        socket.on(EVENTS.SERVER.ROOMS, (room) =>{
            setRooms({...room})   
        });

        return () => {
        socket.off();
        };
    }, [rooms, socket]);
  


    const handleCreateRoom = () => {
        console.log('Creando Salas')
        //Obtener Nombre de la sala
        let roomName = newRoomRef.current.value || '';
        if(!String(roomName).trim()) return;

        socket.on(EVENTS.SERVER.ROOMS, (rooms) => {
            console.log('SERVER',rooms)
         
        })

        // setUpdate(true);
        //Avisar que la sala se ha creado
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName})
                
        //Agregar nombre al listado de salas
        roomName = '';
    }

    return(
        <div className='chat chat__roomList'>
            <div>
                <p className='chat__title'>My ChatRooms</p>
                    <form onSubmit={submit}>
                        <input placeholder='Nombre de la sala' ref={newRoomRef}></input>
                        <button onClick={handleCreateRoom}>+</button>
                    </form>
                <RoomList rooms={rooms} />
            </div>
        </div>
    )
}

export default Rooms;