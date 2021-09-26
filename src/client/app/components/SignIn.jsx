import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const SignIn = ({ loadUser, onRouteChange }) => {
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm()

  const onSubmitSignIn = (data) => {
    const { email, password } = data
    const optionsSignIn = {
      url: '/api/signin',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        email: email,
        password: password,
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
    <div className="login__form">
      <div className="login__form__container">
        <form className="form" onSubmit={handleSubmit(onSubmitSignIn)}>
          <h2 className="mb-s">Sign In</h2>
          <div className="form__group">
            <label className="form__label">
              Email
              <input
                type="email"
                id="email"
                className="form__input"
                {...register('email', {
                  required: true,
                  pattern: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
                })}
              />
            </label>

            <label className="form__label">
              Password
              <input
                type="password"
                id="password"
                className="form__input"
                {...register('password', { required: true })}
              />
            </label>
          </div>
          <div className="form__submit">
            <input type="submit" className="btn btn--blue" value="Sign In" />
          </div>
        </form>

        <div className="mt-s">
          <p>Do you haven't an account yet?</p>
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
