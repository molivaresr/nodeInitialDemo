import React, {useState} from 'react'
import { useEffect } from 'react'

const Context = React.createContext({})

export function UserContextProvider ({children}) {
  // const [favs, setFavs] = useState([])
  const [jwt, setJWT] = useState(
    () => window.sessionStorage.getItem('jwt')
  )
  const [nickname, setNickname] = useState(
    () => window.sessionStorage.getItem('nickname')
  )
  // useEffect(() => {
  //   if (!jwt) return setFavs([])
  //   getFavs({jwt}).then(setFavs)
  // }, [jwt])

  return <Context.Provider value={{
    // favs,
    jwt,
    // setFavs,
    setJWT
  }}>
    {children}
  </Context.Provider>
}

export default Context