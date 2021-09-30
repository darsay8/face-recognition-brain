import { useState, useEffect } from 'react'
import SecurityContext from './SecurityContext'
import useToken from '../../hooks/useToken'
import useUser from '../../hooks/useUser'

const SecurityProvider = ({ children }) => {
  const { token, setToken } = useToken()
  const { user, setUser, isSignedIn, setIsSignedIn } = useUser()

  return (
    <SecurityContext.Provider
      value={{
        login: (token, user, auth) => {
          if (token) {
            setToken(token)
            setUser(user)
            setIsSignedIn(auth)
          }
        },
        logout: () => {
          setIsSignedIn(false)
          localStorage.clear()
        },
        isSignedIn,
        user,
      }}
    >
      {children}
    </SecurityContext.Provider>
  )
}

export default SecurityProvider
