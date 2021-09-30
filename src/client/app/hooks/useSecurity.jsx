import SecurityContext from '../utils/auth/SecurityContext'
import { useContext } from 'react'

const useSecurity = () => useContext(SecurityContext)

export default useSecurity
