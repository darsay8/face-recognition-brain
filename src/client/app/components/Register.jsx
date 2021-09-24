import { useState } from 'react'
import axios from 'axios'

const Register = ({ loadUser, onRouteChange }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmitRegister = () => {
    const optionsRegister = {
      url: '/api/register',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        name: name,
        email: email,
        password: password,
      },
    }

    axios(optionsRegister)
      .then((response) => response.data)
      .then((user) => {
        if (user.id) {
          loadUser(user)
          onRouteChange('home')
        }
      })
  }

  return (
    <div className="register__form mt-l">
      <div className="register__form__container">
        <form action="" className="form">
          <h2 className="mb-s">Register</h2>
          <div className="form__group">
            <label className="form__label">
              Name
              <input
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
                className="form__input"
                required
              />
            </label>

            <label className="form__label">
              Email
              <input
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
                className="form__input"
                required
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
                required
              />
            </label>
          </div>
        </form>
        <div className="form__submit">
          <button
            onClick={onSubmitRegister}
            className="btn btn--blue"
            type="submit"
          >
            Register
          </button>
        </div>
        <div className="mt-s">
          <p>Do you have an account already?</p>
          <p onClick={() => onRouteChange('signin')} className="btn btn--text">
            Sign In
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
