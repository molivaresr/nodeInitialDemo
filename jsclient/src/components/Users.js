// Listado de Usuarios
//import React, {useState, useEffect, useRef} from 'react';

import {socket } from '../context/socket.context'
import '../styles/App.css';

const Users = () => {

    return(
        <div className='wrapper row'>
            <div className='chat'>
                <div className='chat__userList'>
                    <p className='chat__title'>Usuarios</p>
                        <ul>
                            <li> User 1</li>
                            <li> User 2</li>
                            <li> User 3</li>
                        </ul>
                    </div>
                </div>               
        </div>
    )
}

export default Users;