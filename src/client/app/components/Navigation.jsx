const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="navigation">
        <p onClick={() => onRouteChange('signout')} className="btn btn--blue">
          Sign Out
        </p>
      </nav>
    )
  } else {
    return (
      <nav className="navigation">
        <p onClick={() => onRouteChange('signin')} className="btn btn--blue">
          Sign In
        </p>
        <p onClick={() => onRouteChange('register')} className="btn btn--blue">
          Register
        </p>
      </nav>
    )
  }
}

export default Navigation
