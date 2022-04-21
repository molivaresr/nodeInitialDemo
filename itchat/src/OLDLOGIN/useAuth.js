import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Context from '../context/UserContext';

export default function RequireAuth({ children }) {
    let {jwt} = useContext(Context);
    // const jwt = window.localStorage.getItem('jwt')
    // let location = useLocation();
  
    if (!jwt) {

      return <Navigate to="/login" />;
    }
    else {
      
    }
      
    return children;
  }