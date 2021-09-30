import { useState } from 'react'

const useUser = () => {
  const getUser = () => {
    const user = localStorage.getItem('user')
    return user
  }

  const getAuth = () => {
    const auth = localStorage.getItem('auth')
    return auth
  }

  const [user, setUser] = useState(getUser)
  const [isSignedIn, setIsSignedIn] = useState(getAuth)

  const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  const saveSigned = (auth) => {
    localStorage.setItem('auth', auth)
    setIsSignedIn(auth)
  }

  return {
    setUser: saveUser,
    user,
    setIsSignedIn: saveSigned,
    isSignedIn,
  }
}

export default useUser
