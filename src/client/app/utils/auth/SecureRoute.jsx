import SignIn from '../../views/SignIn'
import { Route, Redirect } from 'react-router-dom'
import useSecurity from '../../hooks/useSecurity'

const SecureRoute = ({ children, loadUser, loadToken }) => {
  const { isSignedIn } = useSecurity()

  return <Route>{isSignedIn ? children : <Redirect to="/" />}</Route>
}

export default SecureRoute
