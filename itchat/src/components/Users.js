import React, {useEffect, useState}from 'react';
import Users_style from '../styles/Users_style.css'

export default function Users({userList}) {
 
  
    return (
      <div className='users'>
          <h2>Usuarios</h2>
          <ul>
            {userList.map((e) => 
              <li key={e._id}>{e.user}
              </li>
            )}
          </ul>
        </div>      
  )};