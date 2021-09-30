import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import useSecurity from '../hooks/useSecurity'
import useUser from '../hooks/useUser'

const Navigation = () => {
  const { logout, isSignedIn } = useSecurity()

  return (
    <nav className="nav">
      <div className="navigation">
        {isSignedIn ? (
          <div>
            {' '}
            <button onClick={logout} className="btn btn--blue">
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <Link to="/" className="btn btn--blue">
              Sign In
            </Link>

            <Link to="/register" className="btn btn--blue">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
