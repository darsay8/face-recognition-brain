import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import 'regenerator-runtime/runtime'

import Particles from 'react-particles-js'

import Navigation from './components/Navigation'

import SignIn from './views/SignIn'
import Register from './views/Register'
import FaceRecognition from './views/FaceRecognition'
import Error404 from './views/Error404'

import SecurityProvider from './utils/auth/SecurityProvider'
import SecureRoute from './utils/auth/SecureRoute'

import { particlesOptions } from './utils/particlesOptions'

import useSecurity from './hooks/useSecurity'
import useUser from './hooks/useUser'

const App = () => {
  return (
    <>
      <div className="container">
        <Particles className="particles" params={particlesOptions} />

        <Router>
          <SecurityProvider>
            <Navigation />
            <Switch>
              <Route exact path="/">
                <SignIn />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <SecureRoute exact path="/home">
                <FaceRecognition />
              </SecureRoute>
              <Route path="*">
                <Error404 />
              </Route>
            </Switch>
          </SecurityProvider>
        </Router>
      </div>
    </>
  )
}

export default App
