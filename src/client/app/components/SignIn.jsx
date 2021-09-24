import { useState } from 'react'
import axios from 'axios'

const SignIn = ({ loadUser, onRouteChange }) => {
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const onEmailChange = (e) => {
    setSignInEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setSignInPassword(e.target.value)
  }

  const onSubmitSignIn = () => {
    const optionsSignIn = {
      url: '/api/signin',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        email: signInEmail,
        password: signInPassword,
      },
    }

    axios(optionsSignIn)
      .then((response) => response.data)
      .then((user) => {
        if (user.id) {
          loadUser(user)
          onRouteChange('home')
        }
      })
  }

  return (
    <div className="login__form mt-l">
      <div className="login__form__container">
        <form action="" className="form">
          <h2 className="mb-s">Sign In</h2>
          <div className="form__group">
            <label className="form__label">
              Email
              <input
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
                className="form__input"
              />
            </label>

            <label className="form__label">
              Password
              <input
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
                className="form__input"
              />
            </label>
          </div>
        </form>
        <div className="form__submit">
          <button
            onClick={onSubmitSignIn}
            className="btn btn--blue"
            type="submit"
          >
            Sign In
          </button>
        </div>

        <div className="mt-s">
          <p>Do you haven't a account yet?</p>
          <p
            onClick={() => onRouteChange('register')}
            className="btn btn--text"
          >
            Register
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
