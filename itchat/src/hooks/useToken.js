import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = window.localStorage.getItem('jwt');
    console.log(tokenString)
    return tokenString
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    window.localStorage.setItem('jwt', userToken);
    setToken(userToken);
    console.log(userToken)
  };
  
  return {
    setToken: saveToken,
    token
  }
}