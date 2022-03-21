// Listado de salas
//import React, {useState, useEffect, useRef} from 'react';
import { socket } from '../context/socket.context'
import '../styles/App.css';

const Rooms = () => {
    return(
        <div className='wrapper row'>
            <div className='chat'>
                <div className='chat__roomList'>
                    <p className='chat__title'>My ChatRooms <button>+</button></p>
                    <ul>
                        <li>Room 1</li>
                        <li>Room 2</li>
                        <li>Room 3</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Rooms;