import {useCallback, useContext, useState} from 'react'
import Context from '../context/UserContext'
import loginService from '../services/login'

export default function useLogin () {
  const {jwt, setJWT} = useContext(Context)
  const [state, setState] = useState({ loading: false, error: false })

  const login = useCallback((email, password) => {
    console.log(email,password)
    setState({loading: true, error: false })
   
    loginService(email, password)
      .then(sessionData => {
        window.localStorage.setItem('nickname', sessionData.nickname)
        window.localStorage.setItem('jwt', sessionData.token)
        setState({loading: false, error: false })
        setJWT(jwt)
      })
      .catch(err => {
        window.localStorage.removeItem('jwt')
        setState({loading: false, error: true })
        console.error(err)
      })
  }, [setJWT,jwt])

  const logout = useCallback(() => {
    window.localStorage.removeItem('jwt')
    setJWT(null)
  }, [setJWT])

  return {
    isLogged: Boolean(jwt),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout
  }
} 