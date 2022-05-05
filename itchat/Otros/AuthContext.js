import React, {useState} from 'react';
import fakeAuthProvider from '../services/auth'
import useLogin from '../hooks/useLogin';

const AuthContext = React.createContext({});

export function useAuth() {
    return React.useContext(AuthContext);
  }

export default function AuthProvider({ children }) {
    const [jwt, setJWT] = useState(
        () => window.localStorage.getItem('jwt')
      )
      const [nickname, setNickname] = useState(
        () => window.localStorage.getItem('nickname')
      )

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setJWT(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setJWT(null);
      callback();
    });
  };

  let value = { jwt, nickname, setNickname, setJWT, signin, signout};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}