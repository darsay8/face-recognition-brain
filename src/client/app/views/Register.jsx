import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

const Register = ({ loadUser, onRouteChange }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmitRegister = (data) => {
    const { name, email, password } = data

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
    <div className="register__form">
      <div className="register__form__container">
        <form className="form" onSubmit={handleSubmit(onSubmitRegister)}>
          <h2 className="mb-s">Register</h2>
          <div className="form__group">
            <label className="form__label">
              Name
              <input
                type="text"
                id="name"
                className="form__input"
                {...register('name', { required: true })}
              />
            </label>

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
            <input type="submit" className="btn btn--blue" value="Register" />
          </div>
        </form>

        <div className="mt-s">
          <p>Do you have an account already?</p>
          <Link to="/" className="btn btn--text">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
