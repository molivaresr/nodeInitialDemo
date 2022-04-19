import React, {useState} from 'react'

const Context = React.createContext({})

export function UserContextProvider ({children}) {
  const [jwt, setJWT] = useState(
    () => window.localStorage.getItem('jwt')
  )
  const [nickname, setNickname] = useState(
    () => window.localStorage.getItem('nickname')
  )

  return <Context.Provider value={{
    jwt,
    nickname,
    setNickname,
    setJWT,
  }}>
    {children}
  </Context.Provider>
}

export default Context