import {useCallback, useContext, useState} from 'react'
import Context from '../context/UserContext'
import loginService from '../services/login'

export default function useLogin () {
  const {/*favs,*/ jwt, /*setFavs,*/ setJWT} = useContext(Context)
  const [state, setState] = useState({ loading: false, error: false })

  const login = useCallback((email, password) => {
    console.log(email,password)
    setState({loading: true, error: false })
    // console.log(email, password)
    loginService(email, password)
      .then(sessionData => {
        window.sessionStorage.setItem('nickname', sessionData.nickname)
        window.sessionStorage.setItem('jwt', sessionData.token)
        setState({loading: false, error: false })
        setJWT(jwt)
      })
      .catch(err => {
        window.sessionStorage.removeItem('jwt')
        setState({loading: false, error: true })
        console.error(err)
      })
  }, [setJWT,jwt])

  // const addFav = useCallback(({id}) => {
  //   addFavService({id, jwt})
  //     .then(setFavs)
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }, [jwt, setFavs]) 

  const logout = useCallback(() => {
    window.sessionStorage.removeItem('jwt')
    setJWT(null)
  }, [setJWT])

  return {
    // addFav,
    // favs,
    isLogged: Boolean(jwt),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout
  }
} 